import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration_months: 1,
    duration_label: '1 Bulan',
    description: '',
    benefitsText: '',
    is_popular: false,
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

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (filterActive !== '') query += `is_active=${filterActive}&`;
      const res = await adminApi.getMemberships(query);
      setMemberships(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, [filterActive]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMemberships();
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      price: '',
      duration_months: 1,
      duration_label: '1 Bulan',
      description: '',
      benefitsText: 'Akses seluruh peralatan gym\nLoker harian gratis\nKonsultasi awal pelatih',
      is_popular: false,
      is_active: true,
      display_order: memberships.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price,
      duration_months: item.duration_months,
      duration_label: item.duration_label,
      description: item.description || '',
      benefitsText: Array.isArray(item.benefits) ? item.benefits.join('\n') : '',
      is_popular: Boolean(item.is_popular),
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

    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      duration_months: parseInt(formData.duration_months),
      display_order: parseInt(formData.display_order),
      benefits: formData.benefitsText.split('\n').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingItem) {
        await adminApi.updateMembership(editingItem.id, payload);
      } else {
        await adminApi.createMembership(payload);
      }
      setModalOpen(false);
      fetchMemberships();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan paket membership.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await adminApi.toggleMembershipStatus(id);
      setMemberships((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_active: !item.is_active } : item))
      );
    } catch (err) {
      alert(err.message || 'Gagal mengubah status');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await adminApi.deleteMembership(deleteId);
      setDeleteId(null);
      fetchMemberships();
    } catch (err) {
      alert(err.message || 'Gagal menghapus data');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header Action */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xl)', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            MANAJEMEN PAKET
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            PAKET MEMBERSHIP GYM
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Kelola harga, durasi, dan daftar fasilitas yang didapatkan member.
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
          TAMBAH PAKET
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', marginBottom: 'var(--space-lg)' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 'var(--space-xs)', flex: 1, minWidth: '260px' }}>
          <input
            type="text"
            placeholder="Cari nama paket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minHeight: '44px',
              padding: '10px 14px',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
            }}
          />
          <button
            type="submit"
            style={{
              minHeight: '44px',
              padding: '0 20px',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border-high)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontWeight: 600,
            }}
          >
            Cari
          </button>
        </form>

        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          style={{
            minHeight: '44px',
            padding: '10px 16px',
            backgroundColor: 'var(--color-surface-low)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
          }}
        >
          <option value="">Semua Status</option>
          <option value="true">Aktif Saja</option>
          <option value="false">Nonaktif Saja</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Urutan</th>
              <th>Nama Paket</th>
              <th>Durasi</th>
              <th>Harga</th>
              <th>Benefit</th>
              <th>Highlight</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Memuat data membership...
                </td>
              </tr>
            ) : memberships.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Belum ada paket membership. Klik "+ Tambah Paket" untuk membuat paket baru.
                </td>
              </tr>
            ) : (
              memberships.map((item) => (
                <tr key={item.id}>
                  <td style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>#{item.display_order}</td>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td>{item.duration_label}</td>
                  <td style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </td>
                  <td>{Array.isArray(item.benefits) ? `${item.benefits.length} Benefit` : '-'}</td>
                  <td>
                    {item.is_popular ? (
                      <span className="status-pill featured">
                        ★ POPULER
                      </span>
                    ) : (
                      <span style={{ color: 'var(--color-text-muted)' }}>-</span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`status-pill ${item.is_active ? 'active' : 'inactive'}`}
                      style={{ cursor: 'pointer', border: 'none' }}
                      title="Klik untuk ubah status tampil"
                    >
                      <span>{item.is_active ? '● Aktif' : '○ Nonaktif'}</span>
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
              maxWidth: '560px',
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
                {editingItem ? 'EDIT PAKET MEMBERSHIP' : 'TAMBAH PAKET MEMBERSHIP'}
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
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                  Nama Paket <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1 Month All Access"
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>
                    Harga (Rp) <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    placeholder="150000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                    Label Durasi <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1 Bulan / 3 Bulan"
                    value={formData.duration_label}
                    onChange={(e) => setFormData({ ...formData, duration_label: e.target.value })}
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
                  Daftar Benefit (1 baris per benefit)
                </label>
                <textarea
                  rows="4"
                  value={formData.benefitsText}
                  onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                  placeholder="Akses seluruh alat gym&#10;Loker harian gratis&#10;Shower air hangat"
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

              <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)' }}
                  />
                  Tandai Sebagai "Paling Populer"
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--color-accent)' }}
                  />
                  Status Tampil (Aktif)
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
                  {submitting ? 'MENYIMPAN...' : 'SIMPAN PAKET'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Paket Membership"
        message="Apakah Anda yakin ingin menghapus paket membership ini? Paket yang terhapus tidak akan lagi muncul pada landing page publik."
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
