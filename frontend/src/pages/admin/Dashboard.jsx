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
    { title: 'Paket Membership', count: stats?.memberships?.total || 0, sub: `${stats?.memberships?.active || 0} Aktif`, link: '/admin/memberships' },
    { title: 'Personal Trainer', count: stats?.trainers?.total || 0, sub: `${stats?.trainers?.active || 0} Aktif`, link: '/admin/trainers' },
    { title: 'Cabang Gym', count: stats?.branches?.total || 0, sub: `${stats?.branches?.active || 0} Buka`, link: '/admin/branches' },
    { title: 'Fasilitas Gym', count: stats?.facilities?.total || 0, sub: `${stats?.facilities?.featured || 0} Unggulan`, link: '/admin/facilities' },
    { title: 'Testimoni Member', count: stats?.testimonials?.total || 0, sub: `${stats?.testimonials?.published || 0} Tampil`, link: '/admin/testimonials' },
    { title: 'Galeri Foto', count: stats?.gallery?.total || 0, sub: `${stats?.gallery?.active || 0} Tampil`, link: '/admin/gallery' },
    { title: 'FAQ', count: stats?.faqs?.total || 0, sub: `${stats?.faqs?.active || 0} Aktif`, link: '/admin/faqs' },
    { title: 'Website Settings', count: 'Terkonfigurasi', sub: stats?.settings?.brand_name || 'BUILDY GYM', link: '/admin/settings' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-2xl)' }}>
        <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-accent)', letterSpacing: '1px' }}>
          RINGKASAN SISTEM
        </span>
        <h1 style={{ fontSize: '2.25rem', color: 'var(--color-text-primary)', marginTop: 'var(--space-2xs)' }}>
          DASHBOARD UTAMA
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Selamat datang, <strong style={{ color: 'var(--color-text-primary)' }}>{user?.name}</strong>. Kelola seluruh konten Buildy Gym secara terpusat.
        </p>
      </div>

      {error && (
        <div style={{ padding: 'var(--space-md)', backgroundColor: 'rgba(255, 84, 73, 0.15)', border: '1px solid var(--color-danger)', color: '#ff897d', borderRadius: 'var(--radius-sm)', marginBottom: 'var(--space-xl)' }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ color: 'var(--color-text-muted)', padding: 'var(--space-xl) 0' }}>Memuat statistik...</div>
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
                transition: 'border-color var(--transition-fast)',
              }}
            >
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                  {c.title}
                </span>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-accent)', margin: 'var(--space-xs) 0' }}>
                  {c.count}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-sm)' }}>
                {c.sub} &rarr;
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
