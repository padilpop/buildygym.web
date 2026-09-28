import { useState, useEffect } from 'react';
import { adminApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await adminApi.getStats();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Gagal memuat statistik dashboard.');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Paket Membership',
      count: stats?.memberships?.total || 0,
      sub: `${stats?.memberships?.active || 0} Paket Aktif Tampil`,
      link: '/admin/memberships',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
      ),
    },
    {
      title: 'Personal Trainer',
      count: stats?.trainers?.total || 0,
      sub: `${stats?.trainers?.active || 0} Coach Bersertifikasi`,
      link: '/admin/trainers',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
    {
      title: 'Cabang Gym',
      count: stats?.branches?.total || 0,
      sub: `${stats?.branches?.active || 0} Lokasi Strategis Buka`,
      link: '/admin/branches',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      title: 'Fasilitas Gym',
      count: stats?.facilities?.total || 0,
      sub: `${stats?.facilities?.featured || 0} Fasilitas Unggulan`,
      link: '/admin/facilities',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="6" y1="7" x2="6" y2="17" />
          <line x1="18" y1="7" x2="18" y2="17" />
        </svg>
      ),
    },
    {
      title: 'Testimoni Member',
      count: stats?.testimonials?.total || 0,
      sub: `${stats?.testimonials?.published || 0} Cerita Transformasi Tampil`,
      link: '/admin/testimonials',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      title: 'Galeri Foto',
      count: stats?.gallery?.total || 0,
      sub: `${stats?.gallery?.active || 0} Dokumentasi Latihan`,
      link: '/admin/gallery',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      title: 'Tanya Jawab (FAQ)',
      count: stats?.faqs?.total || 0,
      sub: `${stats?.faqs?.active || 0} Jawaban Informatif`,
      link: '/admin/faqs',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        </svg>
      ),
    },
    {
      title: 'Konfigurasi Brand',
      count: 'ONLINE',
      sub: stats?.settings?.brand_name || 'BUILDY GYM',
      link: '/admin/settings',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  const quickActions = [
    { label: '+ Paket Membership', path: '/admin/memberships' },
    { label: '+ Personal Trainer', path: '/admin/trainers' },
    { label: '+ Cabang Baru', path: '/admin/branches' },
    { label: '+ Upload Foto Galeri', path: '/admin/gallery' },
    { label: '+ Tambah Testimoni', path: '/admin/testimonials' },
    { label: '⚙ Pengaturan Kontak', path: '/admin/settings' },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          marginBottom: 'var(--space-2xl)',
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-xl)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-md)',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-accent)',
              letterSpacing: '1.5px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            RINGKASAN SISTEM CMS
          </span>
          <h1
            style={{
              fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
              color: 'var(--color-text-primary)',
              marginTop: '4px',
              marginBottom: '6px',
            }}
          >
            DASHBOARD UTAMA
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', margin: 0 }}>
            Selamat datang kembali, <strong style={{ color: 'var(--color-text-primary)' }}>{user?.name}</strong>. Kelola seluruh konten publik BUILDY GYM secara real-time.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="status-pill active">
            ● Sistem Aktif
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Database Terkoneksi
          </span>
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: 'var(--space-md)',
            backgroundColor: 'rgba(255, 84, 73, 0.15)',
            border: '1px solid var(--color-danger)',
            color: '#ff897d',
            borderRadius: 'var(--radius-sm)',
            marginBottom: 'var(--space-xl)',
          }}
        >
          {error}
        </div>
      )}

      {/* Quick Actions Bar */}
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 'var(--space-sm)' }}>
          Aksi Cepat
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {quickActions.map((action, i) => (
            <Link
              key={i}
              to={action.path}
              style={{
                minHeight: '44px',
                padding: '0 16px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div>
        <h3 style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 'var(--space-md)' }}>
          Statistik Konten Aktif
        </h3>

        {loading ? (
          <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
            Memuat ringkasan data gym...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 'var(--space-lg)',
            }}
          >
            {statCards.map((c, idx) => (
              <Link
                key={idx}
                to={c.link}
                style={{
                  backgroundColor: 'var(--color-surface-low)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  textDecoration: 'none',
                  minHeight: '160px',
                  transition: 'border-color var(--transition-fast), background-color var(--transition-fast)',
                }}
                className="dashboard-card"
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                      {c.title}
                    </span>
                    <div style={{ color: 'var(--color-accent)' }}>
                      {c.icon}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: typeof c.count === 'number' ? '2.8rem' : '1.8rem',
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      margin: 'var(--space-xs) 0',
                    }}
                  >
                    {c.count}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: 'var(--space-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{c.sub}</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dashboard-card:hover {
          border-color: var(--color-accent) !important;
          background-color: var(--color-surface) !important;
        }
      `}</style>
    </div>
  );
}
