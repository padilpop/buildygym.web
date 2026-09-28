import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Facilities() {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('');
  const [filterFeatured, setFilterFeatured] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon_name: '',
    image_url: '',
    is_featured: false,
    is_active: true,
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback Toast
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchFacilities = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (filterActive !== '') query += `is_active=${filterActive}&`;
      if (filterFeatured !== '') query += `is_featured=${filterFeatured}&`;
      const res = await adminApi.getFacilities(query);
      setFacilities(res.data || []);
    } catch (err) {
      console.error(err);
      showFeedback('Gagal memuat data fasilitas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, [filterActive, filterFeatured]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFacilities();
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      icon_name: 'dumbbell',
      image_url: '',
      is_featured: false,
      is_active: true,
      display_order: facilities.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description || '',
      icon_name: item.icon_name || '',
      image_url: item.image_url || '',
      is_featured: Boolean(item.is_featured),
      is_active: Boolean(item.is_active),
      display_order: item.display_order || 0,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const res = await adminApi.uploadMedia(file, 'facilities');
      setFormData((prev) => ({ ...prev, image_url: res.url }));
      showFeedback('Foto berhasil diunggah.');
    } catch (err) {
      setFormError(err.message || 'Gagal mengunggah gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const payload = {
      ...formData,
      display_order: parseInt(formData.display_order) || 0,
    };

    try {
      if (editingItem) {
        await adminApi.updateFacility(editingItem.id, payload);
        showFeedback('Fasilitas berhasil diperbarui.');
      } else {
        await adminApi.createFacility(payload);
        showFeedback('Fasilitas baru berhasil ditambahkan.');
      }
      setModalOpen(false);
      fetchFacilities();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan fasilitas.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await adminApi.toggleFacilityStatus(item.id);
      showFeedback(`Status ${item.name} berhasil diubah.`);
      fetchFacilities();
    } catch (err) {
      showFeedback(err.message || 'Gagal mengubah status', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await adminApi.deleteFacility(deleteId);
      showFeedback('Fasilitas berhasil dihapus.');
      setDeleteId(null);
      fetchFacilities();
    } catch (err) {
      showFeedback(err.message || 'Gagal menghapus fasilitas', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const iconOptions = [
    { value: 'dumbbell', label: '🏋️ Alat Beban / Gym' },
    { value: 'heart-pulse', label: '❤️ Kardio / Treadmill' },
    { value: 'shower', label: '🚿 Kamar Mandi & Shower' },
    { value: 'lockers', label: '🔒 Locker Pribadi' },
    { value: 'snowflake', label: '❄️ Ruangan Ber-AC' },
    { value: 'wifi', label: '📶 Free Wi-Fi' },
    { value: 'car', label: '🚗 Parkir Luas & Aman' },
    { value: 'users', label: '👥 Studio Kelas / Aerobik' },
    { value: 'coffee', label: '☕ Healthy Bar / Cafe' },
  ];

  return (
    <div>
      {/* Toast Alert */}
      {feedback && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 99,
            backgroundColor: feedback.type === 'error' ? 'rgba(255, 84, 73, 0.95)' : 'var(--color-surface-high)',
            color: feedback.type === 'error' ? '#fff' : 'var(--color-accent)',
            border: `1px solid ${feedback.type === 'error' ? 'var(--color-danger)' : 'var(--color-border-high)'}`,
            padding: '12px 20px',
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-elevation-2)',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          {feedback.msg}
        </div>
      )}

      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Fasilitas Gym</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola daftar sarana dan fasilitas kebugaran yang ditampilkan di landing page.
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--color-accent)',
            color: 'var(--color-accent-text)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>+</span> Tambah Fasilitas
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-md)',
          marginBottom: 'var(--space-lg)',
          display: 'flex',
          gap: 'var(--space-md)',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            placeholder="Cari nama fasilitas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '8px 12px',
              backgroundColor: 'var(--color-surface-mid)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '0.9rem',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: 'var(--color-surface-high)',
              border: '1px solid var(--color-border-high)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '0.85rem',
            }}
          >
            Cari
          </button>
        </form>

        <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
          <select
            value={filterFeatured}
            onChange={(e) => setFilterFeatured(e.target.value)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--color-surface-mid)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '0.85rem',
            }}
          >
            <option value="">Semua Fasilitas</option>
            <option value="1">Hanya Unggulan</option>
            <option value="0">Bukan Unggulan</option>
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--color-surface-mid)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '0.85rem',
            }}
          >
            <option value="">Semua Status</option>
            <option value="1">Aktif</option>
            <option value="0">Nonaktif</option>
          </select>
        </div>
      </div>

      {/* Facilities Table */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Memuat data fasilitas...
          </div>
        ) : facilities.length === 0 ? (
          <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Tidak ada fasilitas ditemukan.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-mid)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Urutan</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Fasilitas</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Deskripsi</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Tipe</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map((f) => (
                  <tr key={f.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', width: '60px' }}>
                      #{f.display_order}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {f.image_url ? (
                          <img
                            src={f.image_url}
                            alt={f.name}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: 'var(--radius-sm)',
                              objectFit: 'cover',
                              backgroundColor: 'var(--color-surface-mid)',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: 'var(--radius-sm)',
                              backgroundColor: 'var(--color-surface-mid)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.2rem',
                            }}
                          >
                            🏋️
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{f.name}</div>
                          {f.icon_name && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                              Ikon: {f.icon_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)', maxWidth: '280px' }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {f.description || '-'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      {f.is_featured ? (
                        <span
                          style={{
                            padding: '3px 8px',
                            backgroundColor: 'rgba(195, 244, 0, 0.15)',
                            color: 'var(--color-accent)',
                            border: '1px solid rgba(195, 244, 0, 0.3)',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          ⭐ Unggulan
                        </span>
                      ) : (
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Standar</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleToggleStatus(f)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          border: 'none',
                          backgroundColor: f.is_active ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 84, 73, 0.15)',
                          color: f.is_active ? '#4ade80' : '#ff897d',
                          cursor: 'pointer',
                        }}
                        title="Klik untuk beralih status"
                      >
                        {f.is_active ? '● Aktif' : '○ Nonaktif'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEditModal(f)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'var(--color-surface-mid)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-text-primary)',
                            fontSize: '0.8rem',
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(f.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: 'rgba(255, 84, 73, 0.1)',
                            border: '1px solid var(--color-danger)',
                            borderRadius: 'var(--radius-sm)',
                            color: '#ff897d',
                            fontSize: '0.8rem',
                          }}
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 60,
            padding: 'var(--space-md)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--color-surface-mid)',
              border: '1px solid var(--color-border-high)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: 'var(--space-xl)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)' }}>
              <h2 style={{ fontSize: '1.3rem' }}>
                {editingItem ? 'Edit Fasilitas' : 'Tambah Fasilitas Baru'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', border: 'none', background: 'none' }}
              >
                &times;
              </button>
            </div>

            {formError && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: 'rgba(255, 84, 73, 0.15)',
                  border: '1px solid var(--color-danger)',
                  color: '#ff897d',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  marginBottom: 'var(--space-md)',
                }}
              >
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Nama Fasilitas *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Olympic Barbell & Free Weights"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-low)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Pilih Ikon (Opsional)
                </label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-low)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                >
                  <option value="">-- Tanpa Ikon Khusus --</option>
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Deskripsi Fasilitas
                </label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan perlengkapan, spesifikasi, atau benefit fasilitas ini..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-low)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>

              {/* Image Upload / URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Foto Fasilitas
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    disabled={uploadingImage}
                    style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}
                  />
                  {uploadingImage && <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Mengunggah...</span>}
                </div>
                <input
                  type="url"
                  placeholder="Atau masukkan URL foto langsung (https://...)"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-surface-low)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.85rem',
                  }}
                />
                {formData.image_url && (
                  <div style={{ marginTop: '8px' }}>
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      style={{ height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                    Urutan Tampil
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: 'var(--color-surface-low)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
                      fontSize: '0.9rem',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    />
                    Fasilitas Unggulan (Hero/Highlight)
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    />
                    Tampilkan di Website
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: 'var(--space-lg)' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    padding: '10px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 700,
                  }}
                >
                  {submitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Fasilitas'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Fasilitas?"
        message="Fasilitas ini akan dihapus dari database dan tidak lagi muncul di landing page Buildy Gym."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={deleting}
      />
    </div>
  );
}
