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
      fetchBranches();
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
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
          <h1 style={{ fontSize: '2rem', color: 'var(--color-text-primary)' }}>CABANG BUILDY GYM</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola lokasi cabang gym, jam operasional, link Google Maps, dan kontak WhatsApp cabang.
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            padding: '12px 20px',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: 'var(--radius-sm)',
            letterSpacing: '0.5px',
          }}
        >
          + TAMBAH CABANG
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-low)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '14px 16px' }}>Nama Cabang</th>
              <th style={{ padding: '14px 16px' }}>Kota/Wilayah</th>
              <th style={{ padding: '14px 16px' }}>Jam Operasional</th>
              <th style={{ padding: '14px 16px' }}>WhatsApp</th>
              <th style={{ padding: '14px 16px' }}>Google Maps</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Aksi</th>
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
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px' }}>{item.city}</td>
                  <td style={{ padding: '14px 16px' }}>{item.opening_hours}</td>
                  <td style={{ padding: '14px 16px' }}>{item.whatsapp}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {item.google_maps_url ? (
                      <a href={item.google_maps_url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-accent)', textDecoration: 'underline' }}>
                        Buka Peta &rarr;
                      </a>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: item.is_active ? 'rgba(61, 220, 132, 0.15)' : 'rgba(255, 84, 73, 0.15)',
                        color: item.is_active ? 'var(--color-success)' : 'var(--color-danger)',
                      }}
                    >
                      {item.is_active ? 'Buka' : 'Tutup/Nonaktif'}
                    </button>
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => openEditModal(item)}
                      style={{ padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-secondary)', marginRight: '6px' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      style={{ padding: '6px 12px', backgroundColor: 'rgba(255, 84, 73, 0.15)', border: '1px solid var(--color-danger)', borderRadius: 'var(--radius-sm)', color: '#ff897d' }}
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
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 'var(--space-md)' }}>
          <div style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--color-surface-low)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
              {editingItem ? 'EDIT DATA CABANG' : 'TAMBAH CABANG BARU'}
            </h2>

            {formError && (
              <div style={{ padding: 'var(--space-sm) var(--space-md)', backgroundColor: 'rgba(255, 84, 73, 0.15)', border: '1px solid var(--color-danger)', color: '#ff897d', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', fontSize: '0.875rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Nama Cabang</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Buildy Gym Mempawah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Kota / Wilayah</label>
                  <input
                    type="text"
                    required
                    placeholder="Mempawah"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Alamat Lengkap</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Jl. Raya Mempawah No. ..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>WhatsApp Cabang</label>
                  <input
                    type="text"
                    required
                    placeholder="6281234567890"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Jam Operasional</label>
                  <input
                    type="text"
                    required
                    placeholder="Senin - Minggu: 06.00 - 22.00"
                    value={formData.opening_hours}
                    onChange={(e) => setFormData({ ...formData, opening_hours: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Link Google Maps</label>
                <input
                  type="url"
                  placeholder="https://maps.app.goo.gl/..."
                  value={formData.google_maps_url}
                  onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>URL Foto Gedung / Ruangan Cabang</label>
                <input
                  type="url"
                  placeholder="https://... foto gedung cabang"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)', marginTop: 'var(--space-md)' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '10px 18px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text-secondary)' }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '10px 22px', backgroundColor: 'var(--color-accent)', color: 'var(--color-accent-text)', fontWeight: 700, fontFamily: 'var(--font-display)', borderRadius: 'var(--radius-sm)', textTransform: 'uppercase' }}
                >
                  {submitting ? 'MENYIMPAN...' : 'SIMPAN CABANG'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Cabang Gym"
        message="Apakah Anda yakin ingin menghapus data cabang ini? Cabang yang dihapus tidak akan lagi muncul di peta atau daftar cabang landing page."
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
