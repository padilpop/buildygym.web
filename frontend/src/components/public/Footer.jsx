import { Link } from 'react-router-dom';

export default function Footer({ settings }) {
  const brandName = settings?.brand_name || 'BUILDY GYM';
  const tagline = settings?.tag_line || 'Station & Equipment';
  const whatsapp = settings?.contact_whatsapp || '6281234567890';
  const email = settings?.contact_email || 'info@buildygym.com';
  const instagram = settings?.social_instagram || 'https://instagram.com/buildygym';
  const tiktok = settings?.social_tiktok || 'https://tiktok.com/@buildygym';
  const copyright = settings?.footer_text || `© ${new Date().getFullYear()} ${brandName}. Hak cipta dilindungi undang-undang.`;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        padding: 'var(--space-3xl) 0 var(--space-xl)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'var(--space-2xl)',
            marginBottom: 'var(--space-3xl)',
          }}
        >
          {/* Brand Info */}
          <div style={{ maxWidth: '300px' }}>
            <div style={{ marginBottom: 'var(--space-md)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: 'var(--color-text-primary)',
                  display: 'block',
                }}
              >
                BUILDY<span style={{ color: 'var(--color-accent)' }}>GYM</span>
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  display: 'block',
                  marginTop: '-2px',
                }}
              >
                {tagline}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
              Pusat kebugaran berstandar tinggi yang berfokus pada hasil latihan terukur, higienitas terjaga, dan
              kemudahan akses di setiap cabang.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                >
                  Instagram ↗
                </a>
              )}
              {tiktok && (
                <a
                  href={tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent)')}
                  onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                >
                  TikTok ↗
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-md)',
              }}
            >
              Navigasi Cepat
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Tentang Buildy Gym', href: '#about' },
                { label: 'Fasilitas & Alat', href: '#facilities' },
                { label: 'Paket Membership', href: '#membership' },
                { label: 'Personal Trainer', href: '#trainers' },
                { label: 'Lokasi Cabang', href: '#branches' },
                { label: 'Galeri Foto', href: '#gallery' },
                { label: 'Pertanyaan Umum (FAQ)', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    style={{
                      fontSize: '0.9rem',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--color-accent)')}
                    onMouseLeave={(e) => (e.target.style.color = 'var(--color-text-secondary)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cabang & Jam Operasional */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-md)',
              }}
            >
              Jaringan Cabang
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', marginBottom: 'var(--space-lg)' }}>
              <div>📍 Cabang Mempawah</div>
              <div>📍 Cabang Desa Kapur (Kubu Raya)</div>
              <div>📍 Cabang Kuala Dua</div>
            </div>

            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-sm)',
              }}
            >
              Jam Buka
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Senin - Sabtu: 06:00 - 22:00<br />
              Minggu: 07:00 - 20:00
            </p>
          </div>

          {/* Kontak & Bantuan */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                color: 'var(--color-text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--space-md)',
              }}
            >
              Layanan Pelanggan
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>WhatsApp Pusat:</span>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600 }}
                >
                  +{whatsapp}
                </a>
              </div>
              {email && (
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block' }}>Email CS:</span>
                  <a href={`mailto:${email}`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
                    {email}
                  </a>
                </div>
              )}
              <div style={{ paddingTop: 'var(--space-sm)' }}>
                <Link
                  to="/admin/login"
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    borderBottom: '1px dotted var(--color-border)',
                  }}
                >
                  🔒 Login Portal Administrator
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-lg)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            fontSize: '0.85rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <div>{copyright}</div>
          <div>BUILDY GYM — Station & Equipment</div>
        </div>
      </div>
    </footer>
  );
}
