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
      fetchMemberships();
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteMembership(deleteId);
      setDeleteId(null);
      fetchMemberships();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-text-primary)' }}>MANAJEMEN MEMBERSHIP</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola paket keanggotaan gym, durasi, harga, benefit, dan status tampil di landing page.
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
          + TAMBAH PAKET
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
              padding: '10px 16px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
            }}
          >
            Cari
          </button>
        </form>

        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          style={{
            padding: '10px 14px',
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
      <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-low)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '14px 16px' }}>Urutan</th>
              <th style={{ padding: '14px 16px' }}>Nama Paket</th>
              <th style={{ padding: '14px 16px' }}>Durasi</th>
              <th style={{ padding: '14px 16px' }}>Harga</th>
              <th style={{ padding: '14px 16px' }}>Benefit</th>
              <th style={{ padding: '14px 16px' }}>Highlight</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Aksi</th>
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
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)' }}>{item.display_order}</td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px' }}>{item.duration_label}</td>
                  <td style={{ padding: '14px 16px', color: 'var(--color-accent)', fontWeight: 600 }}>
                    Rp {Number(item.price).toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '14px 16px' }}>{Array.isArray(item.benefits) ? `${item.benefits.length} Benefit` : '-'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {item.is_popular ? (
                      <span style={{ fontSize: '0.75rem', padding: '2px 8px', backgroundColor: 'rgba(195, 244, 0, 0.2)', color: 'var(--color-accent)', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                        POPULER
                      </span>
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
                      {item.is_active ? 'Aktif' : 'Nonaktif'}
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
          <div style={{ width: '100%', maxWidth: '560px', backgroundColor: 'var(--color-surface-low)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
              {editingItem ? 'EDIT PAKET MEMBERSHIP' : 'TAMBAH PAKET MEMBERSHIP'}
            </h2>

            {formError && (
              <div style={{ padding: 'var(--space-sm) var(--space-md)', backgroundColor: 'rgba(255, 84, 73, 0.15)', border: '1px solid var(--color-danger)', color: '#ff897d', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', fontSize: '0.875rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Nama Paket</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 1 Month All Access"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Harga (Rp)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    required
                    placeholder="150000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Label Durasi</label>
                  <input
                    type="text"
                    required
                    placeholder="1 Bulan / 3 Bulan"
                    value={formData.duration_label}
                    onChange={(e) => setFormData({ ...formData, duration_label: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Daftar Benefit (1 baris per benefit)</label>
                <textarea
                  rows="4"
                  value={formData.benefitsText}
                  onChange={(e) => setFormData({ ...formData, benefitsText: e.target.value })}
                  placeholder="Akses seluruh alat gym&#10;Loker harian gratis&#10;Shower air hangat"
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-lg)' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_popular}
                    onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                  />
                  Tandai Sebagai "Paling Populer"
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  />
                  Status Tampil (Aktif)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
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
        message="Apakah Anda yakin ingin menghapus paket membership ini? Paket yang terhapus tidak akan lagi muncul pada landing page."
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
