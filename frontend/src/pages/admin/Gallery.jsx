import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterActive, setFilterActive] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    category: 'Suasana Gym',
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

  const fetchGallery = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (filterCategory) query += `category=${encodeURIComponent(filterCategory)}&`;
      if (filterActive !== '') query += `is_active=${filterActive}&`;
      const res = await adminApi.getGallery(query);
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      showFeedback('Gagal memuat galeri foto', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [filterCategory, filterActive]);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      image_url: '',
      category: 'Suasana Gym',
      is_active: true,
      display_order: items.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      image_url: item.image_url,
      category: item.category || 'Suasana Gym',
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
      const res = await adminApi.uploadMedia(file, 'gallery');
      setFormData((prev) => ({ ...prev, image_url: res.url }));
      showFeedback('Foto galeri berhasil diunggah.');
    } catch (err) {
      setFormError(err.message || 'Gagal mengunggah foto');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image_url) {
      setFormError('Foto galeri wajib diisi atau diunggah.');
      return;
    }
    setFormError(null);
    setSubmitting(true);

    const payload = {
      ...formData,
      display_order: parseInt(formData.display_order) || 0,
    };

    try {
      if (editingItem) {
        await adminApi.updateGallery(editingItem.id, payload);
        showFeedback('Foto galeri berhasil diperbarui.');
      } else {
        await adminApi.createGallery(payload);
        showFeedback('Foto baru berhasil ditambahkan ke galeri.');
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan foto.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await adminApi.toggleGalleryStatus(item.id);
      showFeedback('Status foto berhasil diperbarui.');
      fetchGallery();
    } catch (err) {
      showFeedback(err.message || 'Gagal memperbarui status', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await adminApi.deleteGallery(deleteId);
      showFeedback('Foto berhasil dihapus dari galeri.');
      setDeleteId(null);
      fetchGallery();
    } catch (err) {
      showFeedback(err.message || 'Gagal menghapus foto', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const categories = ['Semua Kategori', 'Suasana Gym', 'Peralatan & Beban', 'Studio & Kelas', 'Komunitas'];

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
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Galeri Foto</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola dokumentasi foto gym, fasilitas, dan atmosfer latihan untuk landing page.
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
          <span>+</span> Tambah Foto Galeri
        </button>
      </div>

      {/* Category Tabs & Filter */}
      <div
        style={{
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          padding: 'var(--space-md)',
          marginBottom: 'var(--space-lg)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => {
            const val = cat === 'Semua Kategori' ? '' : cat;
            const isActive = filterCategory === val;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(val)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.85rem',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'rgba(195, 244, 0, 0.15)' : 'var(--color-surface-mid)',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

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
          <option value="1">Aktif Tampil</option>
          <option value="0">Disembunyikan</option>
        </select>
      </div>

      {/* Grid Display */}
      {loading ? (
        <div
          style={{
            backgroundColor: 'var(--color-surface-low)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          Memuat data galeri foto...
        </div>
      ) : items.length === 0 ? (
        <div
          style={{
            backgroundColor: 'var(--color-surface-low)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--space-2xl)',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          Belum ada foto dalam galeri. Klik tombol "Tambah Foto Galeri" untuk mengunggah.
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '180px', backgroundColor: 'var(--color-surface-mid)' }}>
                <img
                  src={item.image_url}
                  alt={item.title || 'Foto Gym'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                  }}
                >
                  #{item.display_order} • {item.category || 'Umum'}
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleStatus(item)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    backgroundColor: item.is_active ? 'rgba(74, 222, 128, 0.9)' : 'rgba(255, 84, 73, 0.9)',
                    color: '#000',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    cursor: 'pointer',
                  }}
                  title="Klik untuk ubah status tampil"
                >
                  {item.is_active ? 'AKTIF' : 'SEMBUNYI'}
                </button>
              </div>

              <div style={{ padding: 'var(--space-md)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {item.title || '(Tanpa Judul)'}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-md)', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => openEditModal(item)}
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
                    onClick={() => setDeleteId(item.id)}
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
              </div>
            </div>
          ))}
        </div>
      )}

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
                {editingItem ? 'Edit Foto Galeri' : 'Tambah Foto Galeri'}
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
                  Judul / Keterangan Foto (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Suasana Area Dumbbell Buildy Gym"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                  Kategori Foto
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                  <option value="Suasana Gym">Suasana Gym</option>
                  <option value="Peralatan & Beban">Peralatan & Beban</option>
                  <option value="Studio & Kelas">Studio & Kelas</option>
                  <option value="Komunitas">Komunitas</option>
                </select>
              </div>

              {/* Upload Foto */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Pilih Berkas Foto *
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
                  placeholder="Atau masukkan tautan URL gambar langsung (https://...)"
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
                      style={{ maxHeight: '140px', width: '100%', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    />
                    Tampilkan di Galeri Website
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
                  {submitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah ke Galeri'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Foto Galeri?"
        message="Foto ini akan dihapus dari galeri website Buildy Gym."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={deleting}
      />
    </div>
  );
}
