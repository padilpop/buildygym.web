import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo_url: '',
    specialization: '',
    bio: '',
    experience_years: 1,
    certificationsText: '',
    contact_whatsapp: '',
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

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      let query = `?`;
      if (search) query += `search=${encodeURIComponent(search)}&`;
      const res = await adminApi.getTrainers(query);
      setTrainers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      photo_url: '',
      specialization: '',
      bio: '',
      experience_years: 1,
      certificationsText: '',
      contact_whatsapp: '',
      is_active: true,
      display_order: trainers.length + 1,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      photo_url: item.photo_url || '',
      specialization: item.specialization,
      bio: item.bio || '',
      experience_years: item.experience_years || 0,
      certificationsText: Array.isArray(item.certifications) ? item.certifications.join('\n') : '',
      contact_whatsapp: item.contact_whatsapp || '',
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
      experience_years: parseInt(formData.experience_years) || 0,
      display_order: parseInt(formData.display_order) || 0,
      certifications: formData.certificationsText.split('\n').map((s) => s.trim()).filter(Boolean),
    };

    try {
      if (editingItem) {
        await adminApi.updateTrainer(editingItem.id, payload);
      } else {
        await adminApi.createTrainer(payload);
      }
      setModalOpen(false);
      fetchTrainers();
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan data pelatih.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await adminApi.toggleTrainerStatus(id);
      setTrainers((prev) =>
        prev.map((item) => (item.id === id ? { ...item, is_active: !item.is_active } : item))
      );
    } catch (err) {
      alert('Gagal mengubah status: ' + err.message);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminApi.deleteTrainer(deleteId);
      setDeleteId(null);
      fetchTrainers();
    } catch (err) {
      alert('Gagal menghapus: ' + err.message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            MANAJEMEN TIM
          </span>
          <h1 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
            PERSONAL TRAINER
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', margin: 0 }}>
            Kelola profil pelatih resmi, spesialisasi, dan nomor kontak pemesanan sesi latihan.
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
          TAMBAH TRAINER
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nama Pelatih</th>
              <th>Spesialisasi</th>
              <th>Pengalaman</th>
              <th>Kontak WA</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Memuat data trainer...
                </td>
              </tr>
            ) : trainers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: 'var(--space-2xl)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  Belum ada data trainer. Klik "+ Tambah Trainer" untuk menambahkan pelatih.
                </td>
              </tr>
            ) : (
              trainers.map((item) => (
                <tr key={item.id}>
                  <td>
                    {item.photo_url ? (
                      <img
                        src={item.photo_url}
                        alt={item.name}
                        style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                        PT
                      </div>
                    )}
                  </td>
                  <td style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td>{item.specialization}</td>
                  <td>{item.experience_years} Tahun</td>
                  <td>{item.contact_whatsapp || '-'}</td>
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

      {/* Modal Form */}
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
                {editingItem ? 'EDIT DATA PELATIH' : 'TAMBAH PELATIH BARU'}
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
                  Nama Lengkap Pelatih <span style={{ color: 'var(--color-accent)' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Gunawan"
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
                  URL Foto Profil
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
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
                    Spesialisasi <span style={{ color: 'var(--color-accent)' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Hypertrophy & Fat Loss"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
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
                    Pengalaman (Tahun)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="5"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
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
                  Nomor WhatsApp Pemesanan (contoh: 6281234567890)
                </label>
                <input
                  type="text"
                  placeholder="6281234567890"
                  value={formData.contact_whatsapp}
                  onChange={(e) => setFormData({ ...formData, contact_whatsapp: e.target.value })}
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
                  Sertifikasi (1 baris per sertifikat)
                </label>
                <textarea
                  rows="3"
                  value={formData.certificationsText}
                  onChange={(e) => setFormData({ ...formData, certificationsText: e.target.value })}
                  placeholder="APKI Certified Personal Trainer&#10;First Aid & CPR Certified"
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

              <div style={{ display: 'flex', gap: 'var(--space-md)' }}>
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
                  {submitting ? 'MENYIMPAN...' : 'SIMPAN TRAINER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Data Pelatih"
        message="Apakah Anda yakin ingin menghapus data pelatih ini? Tindakan ini tidak dapat dibatalkan."
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
