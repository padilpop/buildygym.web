import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterPublished, setFilterPublished] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    member_name: '',
    member_role: '',
    avatar_url: '',
    content: '',
    rating: 5,
    is_published: true,
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback Toast
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (filterPublished !== '') query += `is_published=${filterPublished}&`;
      const res = await adminApi.getTestimonials(query);
      setTestimonials(res.data || []);
    } catch (err) {
      console.error(err);
      showFeedback('Gagal memuat testimoni member', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, [filterPublished]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchTestimonials();
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      member_name: '',
      member_role: '',
      avatar_url: '',
      content: '',
      rating: 5,
      is_published: true,
      display_order: testimonials.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      member_name: item.member_name,
      member_role: item.member_role || '',
      avatar_url: item.avatar_url || '',
      content: item.content,
      rating: item.rating || 5,
      is_published: Boolean(item.is_published),
      display_order: item.display_order || 0,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleAvatarFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const res = await adminApi.uploadMedia(file, 'testimonials');
      setFormData((prev) => ({ ...prev, avatar_url: res.url }));
      showFeedback('Foto avatar berhasil diunggah.');
    } catch (err) {
      setFormError(err.message || 'Gagal mengunggah foto');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const payload = {
      ...formData,
      rating: parseInt(formData.rating) || 5,
      display_order: parseInt(formData.display_order) || 0,
    };

    try {
      if (editingItem) {
        await adminApi.updateTestimonial(editingItem.id, payload);
        showFeedback('Testimoni berhasil diperbarui.');
      } else {
        await adminApi.createTestimonial(payload);
        showFeedback('Testimoni baru berhasil ditambahkan.');
      }
      setModalOpen(false);
      fetchTestimonials();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data testimoni.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (item) => {
    try {
      await adminApi.toggleTestimonialPublish(item.id);
      showFeedback(`Status publikasi testimoni ${item.member_name} berhasil diubah.`);
      fetchTestimonials();
    } catch (err) {
      showFeedback(err.message || 'Gagal memperbarui status publikasi', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await adminApi.deleteTestimonial(deleteId);
      showFeedback('Testimoni berhasil dihapus.');
      setDeleteId(null);
      fetchTestimonials();
    } catch (err) {
      showFeedback(err.message || 'Gagal menghapus testimoni', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

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
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Testimoni Member</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola ulasan dan pengalaman nyata para member di Buildy Gym.
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
          <span>+</span> Tambah Testimoni
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
            placeholder="Cari nama member atau teks review..."
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

        <select
          value={filterPublished}
          onChange={(e) => setFilterPublished(e.target.value)}
          style={{
            padding: '8px 12px',
            backgroundColor: 'var(--color-surface-mid)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-text-primary)',
            fontSize: '0.85rem',
          }}
        >
          <option value="">Semua Status Publikasi</option>
          <option value="1">Dipublikasikan</option>
          <option value="0">Draft (Disembunyikan)</option>
        </select>
      </div>

      {/* Table */}
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
            Memuat ulasan testimoni...
          </div>
        ) : testimonials.length === 0 ? (
          <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Belum ada ulasan testimoni.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-mid)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Urutan</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Member</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Rating</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Ulasan</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Publikasi</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {testimonials.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', width: '60px' }}>
                      #{t.display_order}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {t.avatar_url ? (
                          <img
                            src={t.avatar_url}
                            alt={t.member_name}
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--color-surface-high)',
                              color: 'var(--color-accent)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.9rem',
                            }}
                          >
                            {t.member_name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{t.member_name}</div>
                          {t.member_role && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                              {t.member_role}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#fbbf24', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                      {renderStars(t.rating)}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)', maxWidth: '300px' }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        "{t.content}"
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <button
                        onClick={() => handleTogglePublish(t)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          border: 'none',
                          backgroundColor: t.is_published ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 171, 0, 0.15)',
                          color: t.is_published ? '#4ade80' : '#ffab00',
                          cursor: 'pointer',
                        }}
                        title="Klik untuk beralih publikasi"
                      >
                        {t.is_published ? '● Publik' : '○ Draft'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => openEditModal(t)}
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
                          onClick={() => setDeleteId(t.id)}
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

      {/* Modal Add / Edit */}
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
                {editingItem ? 'Edit Testimoni' : 'Tambah Testimoni Member'}
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
                  Nama Member *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama lengkap member"
                  value={formData.member_name}
                  onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
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
                  Status / Keterangan Member (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Member 6 Bulan, Cabang Utama"
                  value={formData.member_role}
                  onChange={(e) => setFormData({ ...formData, member_role: e.target.value })}
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
                  Rating Kepuasan (1 - 5 Bintang)
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      style={{
                        padding: '8px 14px',
                        border: '1px solid',
                        borderColor: formData.rating >= star ? '#fbbf24' : 'var(--color-border)',
                        backgroundColor: formData.rating >= star ? 'rgba(251, 191, 36, 0.15)' : 'var(--color-surface-low)',
                        color: formData.rating >= star ? '#fbbf24' : 'var(--color-text-muted)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {star} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Isi Ulasan Testimoni *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Ceritakan pengalaman latihan, suasana gym, atau progres yang diraih..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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

              {/* Avatar Upload / URL */}
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Foto Profil Member (Opsional)
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarFileChange}
                    disabled={uploadingAvatar}
                    style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}
                  />
                  {uploadingAvatar && <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Mengunggah...</span>}
                </div>
                <input
                  type="url"
                  placeholder="Atau tautan URL foto (https://...)"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
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
                      checked={formData.is_published}
                      onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    />
                    Publikasikan di Landing Page
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
                  {submitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah Testimoni'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Testimoni?"
        message="Testimoni ini akan dihapus permanen dari sistem."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={deleting}
      />
    </div>
  );
}
