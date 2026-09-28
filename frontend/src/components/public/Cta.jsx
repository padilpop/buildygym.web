export default function Cta({ settings }) {
  const whatsappNumber = settings?.contact_whatsapp || '6281234567890';

  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Halo BUILDY GYM, saya ingin bergabung dan memulai latihan. Boleh dibantu info pendaftarannya?'
  )}`;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cta"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-surface-lowest)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        <div
          style={{
            backgroundColor: 'var(--color-surface-low)',
            border: '1px solid var(--color-accent)',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(2rem, 5vw, 4rem)',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              backgroundColor: 'rgba(195, 244, 0, 0.08)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 1 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.85rem',
                color: 'var(--color-accent)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 'var(--space-xs)',
              }}
            >
              MULAI SEKARANG
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                lineHeight: 1.1,
                marginBottom: 'var(--space-md)',
              }}
            >
              SIAP MEMULAI SESI LATIHAN PERTAMA ANDA?
            </h2>

            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: 'var(--space-xl)',
              }}
            >
              Kunjungi cabang terdekat atau hubungi staf kami via WhatsApp untuk mendapatkan informasi paket
              membership yang sesuai dengan target kebugaran Anda. Tanpa biaya pendaftaran tersembunyi.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
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
                }}
              >
                Konsultasi WhatsApp Sekarang →
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
                Lihat Seluruh Cabang
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
