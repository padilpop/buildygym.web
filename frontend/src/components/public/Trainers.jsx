export default function Trainers({ trainers: dynamicTrainers, settings }) {
  const defaultTrainers = [
    {
      id: 1,
      name: 'Rian Pratama',
      photo_url: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800',
      specialization: 'Hypertrophy & Strength Training',
      experience_years: 6,
      certifications: ['Certified Fitness Coach (APKI)', 'Biomechanics & Form Correction'],
      bio: 'Fokus pada teknik pengangkatan yang aman, pemrograman hipertrofi progresif, dan pembentukan massa otot berbasis data.',
      contact_whatsapp: '6281234567890',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      photo_url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800',
      specialization: 'Fat Loss & Functional Conditioning',
      experience_years: 5,
      certifications: ['Certified Personal Trainer', 'Sports Nutrition Specialist'],
      bio: 'Membantu member pemula dan intermediate menurunkan kadar lemak tubuh melalui kombinasi weight training dan panduan nutrisi harian.',
      contact_whatsapp: '6281234567890',
    },
    {
      id: 3,
      name: 'Dimas Aditya',
      photo_url: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800',
      specialization: 'Powerlifting & Core Stability',
      experience_years: 7,
      certifications: ['Powerlifting Coach Level 1', 'Injury Prevention & Mobility'],
      bio: 'Menguasai tiga angkatan utama (Squat, Bench, Deadlift) dengan perhatian mendalam pada mobilitas sendi dan pencegahan cedera.',
      contact_whatsapp: '6281234567890',
    },
  ];

  const trainers = dynamicTrainers && dynamicTrainers.length > 0 ? dynamicTrainers : defaultTrainers;
  const defaultWa = settings?.contact_whatsapp || '6281234567890';

  const getWaLink = (trainer) => {
    const wa = trainer.contact_whatsapp || defaultWa;
    const text = encodeURIComponent(
      `Halo Coach ${trainer.name} (BUILDY GYM), saya ingin berkonsultasi mengenai program pendampingan Personal Training. Mohon info ketersediaan jadwalnya.`
    );
    return `https://wa.me/${wa}?text=${text}`;
  };

  return (
    <section
      id="trainers"
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
            INSTRUKTUR & PELATIH RESMI
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
            BIMBINGAN PROFESIONAL DENGAN METODE TERUKUR
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Setiap sesi personal trainer di BUILDY GYM dipandu oleh instruktur bersertifikasi yang berdedikasi menjaga
            teknik eksekusi gerakan Anda tetap aman dan efisien menuju target fisik ideal.
          </p>
        </div>

        {/* Trainers Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {trainers.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <div>
                {/* Photo */}
                <div style={{ height: '260px', backgroundColor: 'var(--color-surface-mid)', position: 'relative' }}>
                  <img
                    src={t.photo_url || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800'}
                    alt={t.name}
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800';
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(16, 20, 19, 0.9)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {t.experience_years} Tahun Pengalaman
                  </div>
                </div>

                {/* Profile info */}
                <div style={{ padding: 'var(--space-lg)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.8rem',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    {t.specialization}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.4rem',
                      color: 'var(--color-text-primary)',
                      textTransform: 'uppercase',
                      marginBottom: 'var(--space-sm)',
                    }}
                  >
                    {t.name}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: 'var(--space-md)' }}>
                    {t.bio}
                  </p>

                  {/* Certifications tags */}
                  {Array.isArray(t.certifications) && t.certifications.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: 'var(--space-md)' }}>
                      {t.certifications.map((cert, idx) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            backgroundColor: 'var(--color-surface-mid)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'var(--color-text-secondary)',
                          }}
                        >
                          🎖 {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Consultation WhatsApp CTA */}
              <div style={{ padding: '0 var(--space-lg) var(--space-lg)' }}>
                <a
                  href={getWaLink(t)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '100%',
                    minHeight: '44px',
                    padding: '0 16px',
                    backgroundColor: 'var(--color-surface-mid)',
                    border: '1px solid var(--color-border-high)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-primary)',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--color-accent-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-mid)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                >
                  Konsultasi Sesi Coach {t.name.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
