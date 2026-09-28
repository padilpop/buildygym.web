import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg, #101413)',
            color: 'var(--color-text-primary, #ffffff)',
            padding: 'var(--space-xl, 2rem)',
            fontFamily: 'var(--font-body, system-ui, -apple-system, sans-serif)',
          }}
        >
          <div
            style={{
              maxWidth: '520px',
              width: '100%',
              backgroundColor: 'var(--color-surface-low, #151a18)',
              border: '1px solid var(--color-border, #242c28)',
              borderRadius: 'var(--radius-md, 8px)',
              padding: 'var(--space-2xl, 2.5rem)',
              textAlign: 'center',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                margin: '0 auto var(--space-lg, 1.5rem)',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 84, 73, 0.12)',
                border: '1px solid var(--color-danger, #ff5449)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-danger, #ff5449)',
              }}
              aria-hidden="true"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-display, sans-serif)',
                fontSize: '0.875rem',
                color: 'var(--color-accent, #c3f400)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 'var(--space-xs, 0.5rem)',
              }}
            >
              PEMBERITAHUAN SISTEM
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display, sans-serif)',
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-sm, 0.75rem)',
                color: 'var(--color-text-primary, #ffffff)',
              }}
            >
              TERJADI KENDALA PADA TAMPILAN
            </h1>

            <p
              style={{
                color: 'var(--color-text-secondary, #9aa0a6)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: 'var(--space-xl, 2rem)',
              }}
            >
              Sistem mendeteksi kendala saat memuat antarmuka ini. Data Anda tetap aman. Silakan muat ulang halaman untuk melanjutkan.
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-sm, 0.75rem)',
              }}
            >
              <button
                type="button"
                onClick={this.handleReload}
                style={{
                  padding: '14px 24px',
                  backgroundColor: 'var(--color-accent, #c3f400)',
                  color: 'var(--color-accent-text, #111a00)',
                  fontFamily: 'var(--font-display, sans-serif)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  border: 'none',
                  borderRadius: 'var(--radius-sm, 4px)',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background-color var(--transition-fast, 150ms ease)',
                }}
              >
                MUAT ULANG HALAMAN
              </button>

              <a
                href="/"
                style={{
                  padding: '12px 20px',
                  color: 'var(--color-text-muted, #707973)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'color var(--transition-fast, 150ms ease)',
                }}
              >
                &larr; Kembali ke Beranda Utama
              </a>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
