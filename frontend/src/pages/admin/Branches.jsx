import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
    whatsapp: '',
    opening_hours: 'Senin - Minggu: 06.00 - 22.00',
    google_maps_url: '',
    image_url: '',
    description: '',
    is_active: true,
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen && !submitting) {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, submitting]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      const res = await adminApi.getBranches(query);
      setBranches(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      city: '',
      address: '',
      phone: '',
      whatsapp: '',
      opening_hours: 'Senin - Minggu: 06.00 - 22.00',
      google_maps_url: '',
      image_url: '',
      description: '',
      is_active: true,
      display_order: branches.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      city: item.city,
      address: item.address,
      phone: item.phone || '',
      whatsapp: item.whatsapp,
      opening_hours: item.opening_hours,
      google_maps_url: item.google_maps_url || '',
      image_url: item.image_url || '',
      description: item.description || '',
      is_active: Boolean(item.is_active),
      display_order: item.display_order || 0,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    try {
      if (editingItem) {
        await adminApi.updateBranch(editingItem.id, formData);
      } else {
        await adminApi.createBranch(formData);
      }
      setModalOpen(false);
      fetchBranches();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data cabang.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await adminApi.toggleBranchStatus(id);
      setBranches((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_active: !item.is_active } : item))
      );
    } catch (err) {
      alert('Gagal mengubah status cabang: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteBranch(deleteId);
      setDeleteId(null);
      fetchBranches();
    } catch (err) {
      alert('Gagal menghapus cabang: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            JARINGAN CABANG
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            CABANG BUILDY GYM
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Kelola lokasi cabang gym, jam operasional, tautan Google Maps, dan nomor WhatsApp cabang.
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            minHeight: '44px',
            padding: '12px 20px',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.5px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          TAMBAH CABANG
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Nama Cabang</th>
              <th>Kota / Wilayah</th>
              <th>Jam Operasional</th>
              <th>WhatsApp</th>
              <th>Google Maps</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Memuat data cabang...
                </td>
              </tr>
            ) : branches.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Belum ada cabang terdaftar. Klik "+ Tambah Cabang" untuk menambahkan cabang baru.
                </td>
              </tr>
            ) : (
              branches.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td>{item.city}</td>
                  <td>{item.opening_hours}</td>
                  <td>{item.whatsapp}</td>
                  <td>
                    {item.google_maps_url ? (
                      <a
                        href={item.google_maps_url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--color-accent)', fontWeight: 600 }}
                      >
                        Buka Peta ↗
                      </a>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`status-pill ${item.is_active ? 'active' : 'inactive'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Klik untuk ubah status cabang"
                    >
                      <span>{item.is_active ? '● Buka' : '○ Tutup'}</span>
                    </button>
                  </td>
                  <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => openEditModal(item)}
                      style={{
                        minHeight: '36px',
                        padding: '6px 14px',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--color-text-secondary)',
                        marginRight: '6px',
                        backgroundColor: 'var(--color-surface)',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      style={{
                        minHeight: '36px',
                        padding: '6px 14px',
                        backgroundColor: 'rgba(255, 84, 73, 0.12)',
                        border: '1px solid rgba(255, 84, 73, 0.35)',
                        borderRadius: 'var(--radius-sm)',
                        color: '#ff897d',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: 'var(--space-md)',
          }}
          onClick={() => !submitting && setModalOpen(false)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '600px',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-xl)',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.6)',
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text-primary)', margin: 0 }}>
                {editingItem ? 'EDIT DATA CABANG' : 'TAMBAH CABANG BARU'}
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ width: '36px', height: '36px', color: 'var(--color-text-muted)', fontSize: '1.4rem' }}
                aria-label="Tutup Form"
              >
                &times;
              </button>
            </div>

            {formError && (
              <div
                style={{
                  padding: 'var(--space-sm) var(--space-md)',
                  backgroundColor: 'rgba(255, 84, 73, 0.15)',
                  border: '1px solid var(--color-danger)',
                  color: '#ff897d',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: 'var(--space-md)',
                  fontSize: '0.875rem',
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                    Nama Cabang <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: BUILDY GYM — Cabang Mempawah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                    Kota / Wilayah <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mempawah / Kubu Raya"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                  Alamat Lengkap <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <textarea
                  rows="2"
                  required
                  placeholder="Jl. Raden Kusno No. 45, Terusan, Mempawah Hilir"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                    WhatsApp Cabang <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="6281234567891"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                    Telepon Tetap / Alternatif
                  </label>
                  <input
                    type="text"
                    placeholder="0561-xxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      minHeight: '44px',
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-text-primary)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                  Jam Operasional
                </label>
                <input
                  type="text"
                  placeholder="Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00"
                  value={formData.opening_hours}
                  onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                  Link Google Maps
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={formData.google_maps_url}
                  onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                  URL Foto Cabang
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '10px 14px',
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    color: 'var(--color-text-primary)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)' }}
                  />
                  Status Cabang Aktif (Buka)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    minHeight: '44px',
                    padding: '0 20px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-secondary)',
                    fontWeight: 600,
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    minHeight: '44px',
                    padding: '0 24px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-display)',
                    borderRadius: 'var(--radius-sm)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {submitting ? 'MENYIMPAN...' : 'SIMPAN CABANG'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Cabang Gym"
        message="Apakah Anda yakin ingin menghapus data cabang gym ini? Tindakan ini tidak dapat dibatalkan."
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
