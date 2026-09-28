export default function Hero({ settings }) {
  const headline = settings?.hero_headline || 'BANGUN TUBUH & CAPAI PERFORMA MAKSIMAL';
  const subheadline =
    settings?.hero_subheadline ||
    'Pusat kebugaran berstandar tinggi dengan peralatan beban lengkap, higienitas terjaga, dan bimbingan pelatih profesional tanpa biaya tersembunyi.';

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const highlights = [
    { value: '3+', label: 'Cabang Gym Aktif' },
    { value: '100%', label: 'Alat Beban Standar' },
    { value: 'Sertifikasi', label: 'Pelatih Profesional' },
    { value: 'Rp 0', label: 'Tanpa Biaya Admin' },
  ];

  return (
    <section
      style={{
        position: 'relative',
        paddingTop: 'var(--space-3xl)',
        paddingBottom: 'var(--space-3xl)',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}
      id="hero"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--space-2xl)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Text Content */}
          <div style={{ maxWidth: '640px' }}>
            {/* Tag badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                backgroundColor: 'rgba(195, 244, 0, 0.1)',
                border: '1px solid rgba(195, 244, 0, 0.3)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--space-md)',
              }}
            >
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-accent)' }} />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  letterSpacing: '1px',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                }}
              >
                BUILDY GYM • STATION & EQUIPMENT
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.05,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-lg)',
              }}
            >
              {headline}
            </h1>

            {/* Subheadline */}
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: 'var(--space-xl)',
              }}
            >
              {subheadline}
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-md)',
                flexWrap: 'wrap',
                marginBottom: 'var(--space-2xl)',
              }}
            >
              <a
                href="#membership"
                onClick={(e) => handleScrollTo(e, '#membership')}
                style={{
                  padding: '16px 32px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-text)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color var(--transition-fast)',
                }}
              >
                Lihat Paket Membership →
              </a>

              <a
                href="#branches"
                onClick={(e) => handleScrollTo(e, '#branches')}
                style={{
                  padding: '16px 28px',
                  backgroundColor: 'transparent',
                  border: '1px solid var(--color-border-high)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  borderRadius: 'var(--radius-sm)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                Cari Cabang Terdekat
              </a>
            </div>

            {/* Highlights Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: 'var(--space-md)',
                paddingTop: 'var(--space-lg)',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              {highlights.map((h, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {h.value}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Card */}
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                height: '380px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
              }}
            >
              {/* Overlay tint */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 20, 19, 0.95) 10%, rgba(16, 20, 19, 0.2) 100%)',
                }}
              />

              {/* Bottom text inside card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 'var(--space-lg)',
                  left: 'var(--space-lg)',
                  right: 'var(--space-lg)',
                }}
              >
                <span
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  Fasilitas Beban & Kardio
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: '#ffffff',
                    marginTop: '6px',
                    marginBottom: '2px',
                  }}
                >
                  Area Latihan Lengkap & Nyaman
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                  Olympic barbell, dumbbell hingga 50kg, power rack, plate loaded & resistance machines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </section>
  );
}
