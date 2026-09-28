import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { label: 'Tentang', href: '#about' },
    { label: 'Fasilitas', href: '#facilities' },
    { label: 'Membership', href: '#membership' },
    { label: 'Pelatih', href: '#trainers' },
    { label: 'Cabang', href: '#branches' },
    { label: 'Galeri', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(16, 20, 19, 0.95)' : 'var(--color-bg)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
        transition: 'background-color var(--transition-normal), border-color var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 700,
            letterSpacing: '1px',
            color: 'var(--color-text-primary)',
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>
            BUILDY<span style={{ color: 'var(--color-accent)' }}>GYM</span>
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginTop: '-4px',
            }}
          >
            Station & Equipment
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--space-lg)',
          }}
          className="desktop-nav"
          aria-label="Navigasi Utama"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            style={{
              minWidth: '44px',
              minHeight: '44px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface-low)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.1rem',
            }}
            aria-label="Ubah tema tampilan"
            title="Ubah tema Dark / Light"
          >
            {theme === 'dark' ? '☀' : '🌙'}
          </button>

          {/* Admin link */}
          <Link
            to={user ? '/admin' : '/admin/login'}
            style={{
              minHeight: '44px',
              padding: '0 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'none',
              alignItems: 'center',
            }}
            className="desktop-admin-btn"
            title={user ? 'Buka Dashboard Admin' : 'Login Admin CMS'}
          >
            {user ? 'Panel Admin' : 'Admin'}
          </Link>

          {/* CTA Join Membership */}
          <a
            href="#membership"
            onClick={(e) => handleNavClick(e, '#membership')}
            style={{
              minHeight: '44px',
              padding: '0 20px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-text)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              display: 'none',
              alignItems: 'center',
            }}
            className="desktop-cta-btn"
          >
            Pilih Paket
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '44px',
              height: '44px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-surface-low)',
              color: 'var(--color-text-primary)',
              fontSize: '1.3rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-hamburger-btn"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-surface-low)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-lg) var(--space-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
          className="mobile-menu-drawer"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '8px', paddingTop: 'var(--space-sm)' }}>
            <a
              href="#membership"
              onClick={(e) => handleNavClick(e, '#membership')}
              style={{
                flex: 1,
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 16px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-text)',
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.95rem',
                textTransform: 'uppercase',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
              }}
            >
              Pilih Paket Membership
            </a>
            <Link
              to={user ? '/admin' : '/admin/login'}
              style={{
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 16px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {user ? 'Admin CMS' : 'Login'}
            </Link>
          </div>
        </div>
      )}

      {/* Responsive media style injection for desktop navigation visibility */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta-btn {
            display: inline-block !important;
          }
          .desktop-admin-btn {
            display: inline-block !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
          .mobile-menu-drawer {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
