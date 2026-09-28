import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      if (err.data?.errors?.email) {
        setError(err.data.errors.email[0]);
      } else {
        setError(err.message || 'Login gagal. Periksa kembali koneksi atau kredensial Anda.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const isSessionExpired = searchParams.get('expired') === '1';

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-md)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          backgroundColor: 'var(--color-surface-low)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2xl) var(--space-xl)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              color: 'var(--color-accent)',
              letterSpacing: '1px',
              display: 'block',
              marginBottom: 'var(--space-2xs)',
            }}
          >
            PORTAL ADMINISTRASI
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              color: 'var(--color-text-primary)',
              letterSpacing: '0.5px',
            }}
          >
            BUILDY GYM CMS
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginTop: 'var(--space-xs)' }}>
            Masuk untuk mengelola membership, trainer, fasilitas, dan cabang gym.
          </p>
        </div>

        {isSessionExpired && !error && (
          <div
            style={{
              backgroundColor: 'rgba(255, 184, 0, 0.12)',
              border: '1px solid #ffb800',
              color: '#ffd15c',
              padding: 'var(--space-sm) var(--space-md)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              marginBottom: 'var(--space-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            role="status"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>Sesi login Anda telah berakhir. Silakan masuk kembali.</span>
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: 'rgba(255, 84, 73, 0.15)',
              border: '1px solid var(--color-danger)',
              color: '#ff897d',
              padding: 'var(--space-sm) var(--space-md)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.875rem',
              marginBottom: 'var(--space-lg)',
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-2xs)',
              }}
            >
              Email Administrator
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@buildygym.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-2xs)',
              }}
            >
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: 'var(--space-xs)',
              padding: '14px',
              backgroundColor: isSubmitting ? 'var(--color-surface-high)' : 'var(--color-accent)',
              color: isSubmitting ? 'var(--color-text-muted)' : 'var(--color-accent-text)',
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              fontWeight: 700,
              letterSpacing: '0.5px',
              borderRadius: 'var(--radius-sm)',
              textTransform: 'uppercase',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            {isSubmitting ? 'MEMVERIFIKASI...' : 'MASUK KE DASHBOARD'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link
            to="/"
            style={{
              color: 'var(--color-text-muted)',
              fontSize: '0.875rem',
              textDecoration: 'none',
            }}
          >
            &larr; Kembali ke Website Publik
          </Link>
        </div>
      </div>
    </div>
  );
}
