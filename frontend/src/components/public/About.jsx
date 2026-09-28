export default function About() {
  const pillars = [
    {
      number: '01',
      title: 'Peralatan Terstandar & Terawat',
      desc: 'Area angkat beban dengan barbell berspesifikasi kompetisi, rak squat kokoh, dumbbell set hingga 50kg, serta mesin isolasi otot yang terawat secara berkala untuk keamanan latihan Anda.',
    },
    {
      number: '02',
      title: 'Lingkungan Higienis & Nyaman',
      desc: 'Kami menerapkan standar kebersihan tinggi dengan pembersihan rutin, sirkulasi udara berpendingin (AC), kamar mandi bersih, serta loker penyimpanan aman untuk ketenangan sesi latihan Anda.',
    },
    {
      number: '03',
      title: 'Instruktur & Bimbingan Terarah',
      desc: 'Pelatih berpengalaman siap mendampingi perbaikan teknik gerakan (form correction), penyusunan program progresif, dan konsultasi nutrisi tanpa intimidasi — ramah untuk semua tingkat kebugaran.',
    },
  ];

  return (
    <section
      id="about"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-surface-lowest)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Section Header */}
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
            TENTANG BUILDY GYM
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
            TEMPAT LATIHAN SOLID UNTUK SETIAP TARGET KEBUGARAN
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            BUILDY GYM dirancang sebagai ruang latihan yang mengedepankan efektivitas, disiplin, dan keselamatan.
            Kami memadukan peralatan beban berkualitas tinggi dengan atmosfer latihan yang positif, menjadikannya
            pilihan tepat bagi siapa pun yang ingin membangun kekuatan fisik secara konsisten.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.number}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'border-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                    display: 'block',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  {p.number}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
