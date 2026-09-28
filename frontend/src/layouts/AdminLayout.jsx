import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarOpen]);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      label: 'Dashboard',
      path: '/admin',
      end: true,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },
    {
      label: 'Membership',
      path: '/admin/memberships',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
          <line x1="7" y1="15" x2="7.01" y2="15" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: 'Personal Trainer',
      path: '/admin/trainers',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <polyline points="16 11 18 13 22 9" />
        </svg>
      ),
    },
    {
      label: 'Cabang Gym',
      path: '/admin/branches',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Fasilitas',
      path: '/admin/facilities',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="12" x2="22" y2="12" />
          <line x1="6" y1="7" x2="6" y2="17" />
          <line x1="18" y1="7" x2="18" y2="17" />
          <line x1="4" y1="9" x2="4" y2="15" />
          <line x1="20" y1="9" x2="20" y2="15" />
        </svg>
      ),
    },
    {
      label: 'Testimoni',
      path: '/admin/testimonials',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <line x1="8" y1="9" x2="16" y2="9" />
          <line x1="8" y1="13" x2="14" y2="13" />
        </svg>
      ),
    },
    {
      label: 'Galeri Foto',
      path: '/admin/gallery',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      ),
    },
    {
      label: 'FAQ',
      path: '/admin/faqs',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: 'Website Settings',
      path: '/admin/settings',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
  ];

  // Get current active title for breadcrumb
  const currentNav = navItems.find((item) => (item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)));
  const pageTitle = currentNav ? currentNav.label : 'Admin Portal';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)', position: 'relative' }}>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(3px)',
            zIndex: 40,
            display: 'block',
          }}
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar */}
      <aside
        style={{
          width: '270px',
          backgroundColor: 'var(--color-surface-low)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          zIndex: 50,
          transition: 'left var(--transition-normal)',
          overflowY: 'auto',
        }}
        className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}
        aria-label="Sidebar Menu"
      >
        {/* Brand Header */}
        <div
          style={{
            padding: 'var(--space-lg) var(--space-md)',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            to="/admin"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.4rem',
              color: 'var(--color-text-primary)',
              letterSpacing: '1px',
              textDecoration: 'none',
            }}
          >
            BUILDY<span style={{ color: 'var(--color-accent)' }}>GYM</span>
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '2px',
                marginTop: '2px',
                fontWeight: 600,
              }}
            >
              PORTAL ADMIN CMS
            </span>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              width: '44px',
              height: '44px',
              color: 'var(--color-text-muted)',
              fontSize: '1.4rem',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-close-btn"
            aria-label="Tutup Menu"
          >
            &times;
          </button>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: 'var(--space-md) var(--space-sm)', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                textDecoration: 'none',
                minHeight: '44px',
                transition: 'background-color var(--transition-fast), color var(--transition-fast)',
              })}
            >
              <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Badge & Logout */}
        <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-lowest)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'var(--space-md)' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface-high)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.name || 'Administrator'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {user?.email || 'admin@buildygym.com'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              minHeight: '44px',
              padding: '10px 14px',
              backgroundColor: 'rgba(255, 84, 73, 0.12)',
              border: '1px solid rgba(255, 84, 73, 0.35)',
              borderRadius: 'var(--radius-sm)',
              color: '#ff897d',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Keluar (Logout)
          </button>
        </div>
      </aside>

      {/* Main Content Layout */}
      <div style={{ flex: 1, marginLeft: '270px', display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main">
        {/* Top Navbar */}
        <header
          style={{
            height: '68px',
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
                minWidth: '44px',
                minHeight: '44px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                backgroundColor: 'var(--color-surface)',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
              }}
              className="mobile-hamburger"
              aria-label="Buka Menu Navigasi"
            >
              ☰
            </button>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', display: 'block' }}>
                Admin CMS
              </span>
              <h2 style={{ fontSize: '1.15rem', color: 'var(--color-text-primary)', margin: 0, fontWeight: 700 }}>
                {pageTitle}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              style={{
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                padding: '0 16px',
                border: '1px solid var(--color-border-high)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-surface)',
                textDecoration: 'none',
              }}
            >
              <span>Lihat Website</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, padding: 'var(--space-xl)', overflowX: 'hidden' }} className="admin-page-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-sidebar {
          left: 0;
        }
        @media (max-width: 900px) {
          .admin-sidebar {
            left: -270px !important;
          }
          .admin-sidebar.open {
            left: 0 !important;
          }
          .admin-main {
            margin-left: 0 !important;
          }
          .mobile-hamburger {
            display: inline-flex !important;
          }
          .mobile-close-btn {
            display: inline-flex !important;
          }
          .admin-page-content {
            padding: var(--space-md) !important;
          }
        }
      `}</style>
    </div>
  );
}
