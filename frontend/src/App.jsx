import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Memberships from './pages/admin/Memberships';
import Trainers from './pages/admin/Trainers';
import Branches from './pages/admin/Branches';
import Facilities from './pages/admin/Facilities';
import Testimonials from './pages/admin/Testimonials';
import Gallery from './pages/admin/Gallery';
import Faqs from './pages/admin/Faqs';
import Settings from './pages/admin/Settings';

function Home() {
  const { user } = useAuth();

  return (
    <div style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
      <div className="container">
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--color-accent)',
            letterSpacing: '1px',
            display: 'block',
            marginBottom: 'var(--space-xs)',
          }}
        >
          PUSAT KEBUGARAN & ALAT GYM
        </span>
        <h1 style={{ fontSize: '3rem', marginBottom: 'var(--space-md)', color: 'var(--color-text-primary)' }}>
          BUILDY GYM
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '640px', margin: '0 auto var(--space-xl)', fontSize: '1.1rem' }}>
          Bangun tubuh dan capai target fitness Anda. Fasilitas lengkap, bersih, dan berstandar tinggi dengan pendampingan pelatih profesional.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#membership"
            style={{
              padding: '14px 28px',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-text)',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Lihat Paket Membership
          </a>
          <Link
            to={user ? '/admin' : '/admin/login'}
            style={{
              padding: '14px 28px',
              border: '1px solid var(--color-border-high)',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {user ? 'Panel Admin CMS' : 'Login Admin CMS'}
          </Link>
        </div>
      </div>
    </div>
  );
}

function NavigationHeader() {
  const [theme, setTheme] = useState('dark');
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Hide public navigation header when accessing admin portal
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        padding: 'var(--space-md) 0',
        backgroundColor: 'var(--color-surface-low)',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '1px',
          }}
        >
          BUILDY<span style={{ color: 'var(--color-accent)' }}>GYM</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀ Light' : '🌙 Dark'}
          </button>
          <Link
            to={user ? '/admin' : '/admin/login'}
            style={{
              fontSize: '0.875rem',
              color: user ? 'var(--color-accent)' : 'var(--color-text-muted)',
              fontWeight: 600,
            }}
          >
            {user ? 'Dashboard CMS' : 'Admin Login'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavigationHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="memberships" element={<Memberships />} />
              <Route path="trainers" element={<Trainers />} />
              <Route path="branches" element={<Branches />} />
              <Route path="facilities" element={<Facilities />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="faqs" element={<Faqs />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
