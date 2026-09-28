import { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', end: true },
    { label: 'Membership', path: '/admin/memberships' },
    { label: 'Personal Trainer', path: '/admin/trainers' },
    { label: 'Cabang Gym', path: '/admin/branches' },
    { label: 'Fasilitas', path: '/admin/facilities' },
    { label: 'Testimoni', path: '/admin/testimonials' },
    { label: 'Galeri Foto', path: '/admin/gallery' },
    { label: 'FAQ', path: '/admin/faqs' },
    { label: 'Website Settings', path: '/admin/settings' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 40,
            display: 'block',
          }}
        />
      )}

      {/* Left Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: 'var(--color-surface-low)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: sidebarOpen ? 0 : '-260px',
          zIndex: 50,
          transition: 'left var(--transition-normal)',
          overflowY: 'auto',
        }}
        className="admin-sidebar"
      >
        <div
          style={{
            padding: 'var(--space-lg) var(--space-md)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--color-text-primary)', letterSpacing: '1px' }}>
            BUILDY<span style={{ color: 'var(--color-accent)' }}>GYM</span>
            <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '2px', marginTop: '2px' }}>
              ADMIN CMS
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              padding: '6px',
              color: 'var(--color-text-muted)',
              fontSize: '1.2rem',
              display: 'none',
            }}
            className="mobile-close-btn"
            aria-label="Tutup Menu"
          >
            &times;
          </button>
        </div>

        <nav style={{ padding: 'var(--space-md) var(--space-sm)', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                transition: 'background-color var(--transition-fast)',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
          <div style={{ marginBottom: 'var(--space-sm)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            Login sebagai: <strong style={{ color: 'var(--color-text-primary)' }}>{user?.name}</strong>
          </div>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: 'rgba(255, 84, 73, 0.15)',
              border: '1px solid var(--color-danger)',
              borderRadius: 'var(--radius-sm)',
              color: '#ff897d',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Layout */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }} className="admin-main">
        {/* Top Navbar */}
        <header
          style={{
            height: '64px',
            backgroundColor: 'var(--color-surface-low)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 var(--space-xl)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                display: 'none',
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
              }}
              className="mobile-hamburger"
              aria-label="Buka Menu"
            >
              ☰
            </button>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}>
              Portal Manajemen Konten Gym
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                padding: '6px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              Buka Website &rarr;
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: 'var(--space-xl)' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            left: -260px !important;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .mobile-hamburger {
            display: block !important;
          }
          .mobile-close-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
