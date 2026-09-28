export default function Testimonials({ testimonials: dynamicTestimonials }) {
  const defaultTestimonials = [
    {
      id: 1,
      member_name: 'Bambang Irawan',
      member_role: 'Member sejak Februari 2024',
      avatar_url: '',
      rating: 5,
      content:
        'Suasana latihannya enak banget, nggak berisik musik yang bikin pusing. Alat bebannya lengkap terutama dumbbell dan rak squat-nya kokoh. Ruangannya juga ber-AC dan bersih.',
    },
    {
      id: 2,
      member_name: 'Siti Nurhaliza',
      member_role: 'Member 6 Bulan, Cabang Mempawah',
      avatar_url: '',
      rating: 5,
      content:
        'Awalnya canggung karena baru pertama kali masuk gym, tapi coach di BUILDY GYM ramah dan mau ngajarin cara pakai mesin isolasi yang benar. Bebas biaya admin tersembunyi juga.',
    },
    {
      id: 3,
      member_name: 'Feri Gunawan',
      member_role: 'Member Tahunan',
      avatar_url: '',
      rating: 5,
      content:
        'Pilihan membership tahunannya sangat worth it. Fleksibel bisa latihan di cabang mana saja pas lagi dinas kerja. Lokernya aman dan showernya selalu bersih.',
    },
  ];

  const testimonials =
    dynamicTestimonials && dynamicTestimonials.length > 0 ? dynamicTestimonials : defaultTestimonials;

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <section
      id="testimonials"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '640px', marginBottom: 'var(--space-2xl)' }}>
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
            PENGALAMAN MEMBER
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              lineHeight: 1.15,
              marginBottom: 'var(--space-md)',
            }}
          >
            APA KATA MEREKA TENTANG BUILDY GYM
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Cerita nyata dari para member yang konsisten berlatih dan merasakan manfaat fasilitas serta atmosfer
            latihan di BUILDY GYM.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Stars Rating */}
                <div
                  style={{
                    color: '#fbbf24',
                    fontSize: '1.2rem',
                    letterSpacing: '2px',
                    marginBottom: 'var(--space-md)',
                  }}
                  aria-label={`Rating ${t.rating} dari 5 bintang`}
                >
                  {renderStars(t.rating)}
                </div>

                {/* Quote Content */}
                <p
                  style={{
                    color: 'var(--color-text-secondary)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    fontStyle: 'normal',
                    marginBottom: 'var(--space-xl)',
                  }}
                >
                  "{t.content}"
                </p>
              </div>

              {/* Member Profile */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid var(--color-border)',
                  paddingTop: 'var(--space-md)',
                }}
              >
                {t.avatar_url ? (
                  <img
                    src={t.avatar_url}
                    alt={t.member_name}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-surface-high)',
                      color: 'var(--color-accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                    }}
                  >
                    {t.member_name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>
                    {t.member_name}
                  </div>
                  {t.member_role && (
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                      {t.member_role}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
