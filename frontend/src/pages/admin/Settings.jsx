import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [formError, setFormError] = useState(null);

  const [formData, setFormData] = useState({
    brand_name: 'BUILDY GYM',
    tag_line: 'Station & Equipment',
    logo_url: '',
    favicon_url: '',
    hero_headline: 'BANGUN TUBUH & CAPAI PERFORMA MAKSIMAL',
    hero_subheadline: 'Pusat kebugaran modern dengan alat berstandar tinggi, instruktur bersertifikasi, dan lingkungan latihan yang solid.',
    contact_whatsapp: '6281234567890',
    contact_email: 'info@buildygym.com',
    social_instagram: 'https://instagram.com/buildygym',
    social_tiktok: 'https://tiktok.com/@buildygym',
    footer_text: '© 2026 BUILDY GYM. Hak cipta dilindungi undang-undang.',
  });

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const showFeedback = (msg, type = 'success') => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback(null), 4000);
  };

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await adminApi.getSettings();
      if (res.data) {
        setFormData({
          brand_name: res.data.brand_name || 'BUILDY GYM',
          tag_line: res.data.tag_line || '',
          logo_url: res.data.logo_url || '',
          favicon_url: res.data.favicon_url || '',
          hero_headline: res.data.hero_headline || '',
          hero_subheadline: res.data.hero_subheadline || '',
          contact_whatsapp: res.data.contact_whatsapp || '',
          contact_email: res.data.contact_email || '',
          social_instagram: res.data.social_instagram || '',
          social_tiktok: res.data.social_tiktok || '',
          footer_text: res.data.footer_text || '',
        });
      }
    } catch (err) {
      console.error(err);
      showFeedback('Gagal memuat pengaturan website', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleUploadLogo = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      const res = await adminApi.uploadMedia(file, 'branding');
      setFormData((prev) => ({ ...prev, logo_url: res.url }));
      showFeedback('Logo berhasil diunggah.');
    } catch (err) {
      setFormError(err.message || 'Gagal mengunggah logo');
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleUploadFavicon = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingFavicon(true);
      const res = await adminApi.uploadMedia(file, 'branding');
      setFormData((prev) => ({ ...prev, favicon_url: res.url }));
      showFeedback('Favicon berhasil diunggah.');
    } catch (err) {
      setFormError(err.message || 'Gagal mengunggah favicon');
    } finally {
      setUploadingFavicon(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);

    try {
      const res = await adminApi.updateSettings(formData);
      showFeedback(res.message || 'Pengaturan website berhasil disimpan!');
    } catch (err) {
      setFormError(err.message || 'Gagal menyimpan pengaturan');
      showFeedback('Gagal menyimpan pengaturan', 'error');
    } finally {
      setSaving(false);
    }
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
          <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Pengaturan Website</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Kelola identitas brand, teks hero, kontak WhatsApp utama, dan media sosial.
          </p>
        </div>
      </div>

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
          Memuat data pengaturan...
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
          {formError && (
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 84, 73, 0.15)',
                border: '1px solid var(--color-danger)',
                color: '#ff897d',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
              }}
            >
              {formError}
            </div>
          )}

          {/* Section 1: Identitas Brand */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-xl)',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              1. Identitas Brand & Logo
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Nama Brand *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand_name}
                  onChange={(e) => setFormData({ ...formData, brand_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Tagline Brand
                </label>
                <input
                  type="text"
                  value={formData.tag_line}
                  onChange={(e) => setFormData({ ...formData, tag_line: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Logo Utama
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadLogo}
                    disabled={uploadingLogo}
                    style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}
                  />
                  {uploadingLogo && <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Mengunggah...</span>}
                </div>
                <input
                  type="url"
                  placeholder="URL Logo (https://...)"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.85rem',
                  }}
                />
                {formData.logo_url && (
                  <div style={{ marginTop: '8px', padding: '8px', backgroundColor: 'var(--color-surface-mid)', display: 'inline-block' }}>
                    <img src={formData.logo_url} alt="Logo Preview" style={{ maxHeight: '40px' }} />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Favicon Browser
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFavicon}
                    disabled={uploadingFavicon}
                    style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}
                  />
                  {uploadingFavicon && <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)' }}>Mengunggah...</span>}
                </div>
                <input
                  type="url"
                  placeholder="URL Favicon (https://...)"
                  value={formData.favicon_url}
                  onChange={(e) => setFormData({ ...formData, favicon_url: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.85rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Hero Section */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-xl)',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              2. Teks Utama (Hero Section)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Headline Utama
                </label>
                <input
                  type="text"
                  value={formData.hero_headline}
                  onChange={(e) => setFormData({ ...formData, hero_headline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Sub-headline / Kalimat Pendukung
                </label>
                <textarea
                  rows={3}
                  value={formData.hero_subheadline}
                  onChange={(e) => setFormData({ ...formData, hero_subheadline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Kontak WhatsApp & Email */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-xl)',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              3. Kontak Utama & Layanan Pelanggan
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Nomor WhatsApp Pusat (Gunakan format 62...) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: 6281234567890"
                  value={formData.contact_whatsapp}
                  onChange={(e) => setFormData({ ...formData, contact_whatsapp: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                  Nomor ini akan digunakan otomatis pada semua tombol CTA "Konsultasi WhatsApp".
                </span>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Email Resmi
                </label>
                <input
                  type="email"
                  placeholder="info@buildygym.com"
                  value={formData.contact_email}
                  onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Sosial Media & Footer */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-xl)',
            }}
          >
            <h2 style={{ fontSize: '1.2rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
              4. Media Sosial & Teks Footer
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Instagram URL
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/buildygym"
                  value={formData.social_instagram}
                  onChange={(e) => setFormData({ ...formData, social_instagram: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  TikTok URL
                </label>
                <input
                  type="url"
                  placeholder="https://tiktok.com/@buildygym"
                  value={formData.social_tiktok}
                  onChange={(e) => setFormData({ ...formData, social_tiktok: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', color: 'var(--color-text-secondary)' }}>
                  Teks Hak Cipta / Footer
                </label>
                <input
                  type="text"
                  value={formData.footer_text}
                  onChange={(e) => setFormData({ ...formData, footer_text: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--color-text-primary)',
                    fontSize: '0.9rem',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Submit Button Bar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-md)' }}>
            <button
              type="button"
              onClick={fetchSettings}
              style={{
                padding: '12px 20px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'transparent',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              Reset / Muat Ulang
            </button>

            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '12px 28px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: 'pointer',
              }}
            >
              {saving ? 'Menyimpan Pengaturan...' : 'Simpan Semua Pengaturan'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
