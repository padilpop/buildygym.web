import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Faqs() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterActive, setFilterActive] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'Membership',
    is_active: true,
    display_order: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  // Delete State
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Feedback Toast
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      if (filterCategory) query += `category=${encodeURIComponent(filterCategory)}&`;
      if (filterActive !== '') query += `is_active=${filterActive}&`;
      const res = await adminApi.getFaqs(query);
      setFaqs(res.data || []);
    } catch (err) {
      console.error(err);
      showFeedback('Gagal memuat data Tanya Jawab (FAQ)', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [filterCategory, filterActive]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen && !submitting) {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, submitting]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFaqs();
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      question: '',
      answer: '',
      category: 'Membership',
      is_active: true,
      display_order: faqs.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category,
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
      display_order: parseInt(formData.display_order) || 0,
    };

    try {
      if (editingItem) {
        await adminApi.updateFaq(editingItem.id, payload);
        showFeedback('FAQ berhasil diperbarui.');
      } else {
        await adminApi.createFaq(payload);
        showFeedback('FAQ baru berhasil ditambahkan.');
      }
      setModalOpen(false);
      fetchFaqs();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan pertanyaan FAQ.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (item) => {
    try {
      await adminApi.toggleFaqStatus(item.id);
      showFeedback('Status FAQ berhasil diperbarui.');
      fetchFaqs();
    } catch (err) {
      showFeedback(err.message || 'Gagal memperbarui status FAQ', 'error');
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      setDeleting(true);
      await adminApi.deleteFaq(deleteId);
      showFeedback('FAQ berhasil dihapus.');
      setDeleteId(null);
      fetchFaqs();
    } catch (err) {
      showFeedback(err.message || 'Gagal menghapus FAQ', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const faqCategories = ['Membership', 'Fasilitas & Jam Operasional', 'Personal Trainer', 'Umum'];

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
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Tanya Jawab (FAQ)</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola daftar pertanyaan yang sering diajukan calon member seputar Buildy Gym.
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
          <span>+</span> Tambah Pertanyaan FAQ
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
            placeholder="Cari pertanyaan atau jawaban..."
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
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--color-surface-mid)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-primary)',
              fontSize: '0.85rem',
            }}
          >
            <option value="">Semua Kategori</option>
            {faqCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
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
            <option value="1">Aktif Tampil</option>
            <option value="0">Disembunyikan</option>
          </select>
        </div>
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
            Memuat daftar pertanyaan FAQ...
          </div>
        ) : faqs.length === 0 ? (
          <div style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Belum ada pertanyaan FAQ ditemukan.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-mid)' }}>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Urutan</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Kategori</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Pertanyaan</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Jawaban</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '12px 16px', color: 'var(--color-text-secondary)', fontWeight: 600, textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((f) => (
                  <tr key={f.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-muted)', width: '60px' }}>
                      #{f.display_order}
                    </td>
                    <td style={{ padding: '14px 16px', width: '140px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          backgroundColor: 'var(--color-surface-mid)',
                          border: '1px solid var(--color-border)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-primary)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {f.category}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-text-primary)', maxWidth: '240px' }}>
                      {f.question}
                    </td>
                    <td style={{ padding: '14px 16px', color: 'var(--color-text-secondary)', maxWidth: '320px' }}>
                      <span style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {f.answer}
                      </span>
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
                        title="Klik untuk ubah status tampil"
                      >
                        {f.is_active ? '● Aktif' : '○ Sembunyi'}
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
                {editingItem ? 'Edit Pertanyaan FAQ' : 'Tambah Pertanyaan FAQ'}
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
                  Kategori FAQ *
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
                  {faqCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Pertanyaan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Apakah ada biaya pendaftaran (admin fee)?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
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
                  Jawaban Lengkap *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Tuliskan jawaban yang ramah, jelas, dan informatif bagi calon member..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
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
                  {submitting ? 'Menyimpan...' : editingItem ? 'Simpan Perubahan' : 'Tambah FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Pertanyaan FAQ?"
        message="Pertanyaan ini akan dihapus permanen dari landing page Buildy Gym."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        isLoading={deleting}
      />
    </div>
  );
}
