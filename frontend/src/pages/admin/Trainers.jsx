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
      fetchTrainers();
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
          <h1 style={{ fontSize: '2rem', color: 'var(--color-text-primary)' }}>PERSONAL TRAINERS</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola data pelatih kebugaran resmi Buildy Gym, spesialisasi, dan kontak pemesanan sesi latihan.
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
          + TAMBAH TRAINER
        </button>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-surface-low)', borderBottom: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}>
              <th style={{ padding: '14px 16px' }}>Foto</th>
              <th style={{ padding: '14px 16px' }}>Nama Pelatih</th>
              <th style={{ padding: '14px 16px' }}>Spesialisasi</th>
              <th style={{ padding: '14px 16px' }}>Pengalaman</th>
              <th style={{ padding: '14px 16px' }}>Kontak WA</th>
              <th style={{ padding: '14px 16px' }}>Status</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Aksi</th>
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
                <tr key={item.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '14px 16px' }}>
                    {item.photo_url ? (
                      <img src={item.photo_url} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--color-surface-high)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                        PT
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</td>
                  <td style={{ padding: '14px 16px' }}>{item.specialization}</td>
                  <td style={{ padding: '14px 16px' }}>{item.experience_years} Tahun</td>
                  <td style={{ padding: '14px 16px' }}>{item.contact_whatsapp || '-'}</td>
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

      {/* Modal Form */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: 'var(--space-md)' }}>
          <div style={{ width: '100%', maxWidth: '560px', backgroundColor: 'var(--color-surface-low)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: 'var(--space-lg)', color: 'var(--color-text-primary)' }}>
              {editingItem ? 'EDIT DATA PELATIH' : 'TAMBAH PELATIH BARU'}
            </h2>

            {formError && (
              <div style={{ padding: 'var(--space-sm) var(--space-md)', backgroundColor: 'rgba(255, 84, 73, 0.15)', border: '1px solid var(--color-danger)', color: '#ff897d', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-md)', fontSize: '0.875rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Nama Lengkap Trainer</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Coach Budi Prakoso"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>URL Foto Profil</label>
                <input
                  type="url"
                  placeholder="https://... atau upload via media"
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Spesialisasi</label>
                  <input
                    type="text"
                    required
                    placeholder="Hypertrophy & Strength"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Tahun Pengalaman</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.experience_years}
                    onChange={(e) => setFormData({ ...formData, experience_years: e.target.value })}
                    style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>No. WhatsApp Konsultasi</label>
                <input
                  type="text"
                  placeholder="6281234567890"
                  value={formData.contact_whatsapp}
                  onChange={(e) => setFormData({ ...formData, contact_whatsapp: e.target.value })}
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Bio / Pendekatan Latihan</label>
                <textarea
                  rows="3"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Deskripsi singkat pengalaman membimbing pemula hingga atlet..."
                  style={{ width: '100%', padding: '10px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>Sertifikasi Resmi (1 baris per sertifikasi)</label>
                <textarea
                  rows="2"
                  value={formData.certificationsText}
                  onChange={(e) => setFormData({ ...formData, certificationsText: e.target.value })}
                  placeholder="Certified Personal Trainer (APKI)&#10;Sports Nutritionist Level 1"
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
                  {submitting ? 'MENYIMPAN...' : 'SIMPAN TRAINER'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteId)}
        title="Hapus Data Pelatih"
        message="Apakah Anda yakin ingin menghapus data pelatih ini dari sistem?"
        isDeleting={deleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
