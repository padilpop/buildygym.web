import { useState } from 'react';

export default function Membership({ memberships: dynamicMemberships, settings }) {
  const [selectedDuration, setSelectedDuration] = useState('all');

  const defaultMemberships = [
    {
      id: 1,
      name: 'Paket Bulanan (1 Bulan)',
      duration_months: 1,
      price: 200000,
      description: 'Pilihan fleksibel tanpa komitmen jangka panjang, cocok bagi yang baru memulai rutin gym.',
      benefits: [
        'Akses penuh seluruh area beban & kardio',
        'Fasilitas loker pribadi & kamar mandi shower',
        '1x Sesi pengenalan alat & form dasar',
        'Bebas biaya pendaftaran (Admin Rp 0)',
      ],
      is_popular: false,
    },
    {
      id: 2,
      name: 'Paket Kuartal (3 Bulan)',
      duration_months: 3,
      price: 525000,
      description: 'Paket favorit untuk membangun konsistensi latihan dan melihat transformasi fisik nyata.',
      benefits: [
        'Akses penuh seluruh area beban & kardio',
        'Akses ke seluruh cabang BUILDY GYM',
        'Fasilitas loker & shower setiap sesi',
        '1x Evaluasi komposisi tubuh berkala',
        'Lebih hemat dibanding bayar per bulan',
      ],
      is_popular: true,
    },
    {
      id: 3,
      name: 'Paket Semester (6 Bulan)',
      duration_months: 6,
      price: 950000,
      description: 'Komitmen terstruktur untuk target kebugaran jangka panjang dengan harga lebih ekonomis.',
      benefits: [
        'Akses penuh seluruh area & seluruh cabang',
        'Fasilitas loker, shower, & free parking',
        '2x Konsultasi program latihan personal',
        'Hak cuti membership (Freeze) hingga 14 hari',
        'Diskon merchandise & suplemen resmi',
      ],
      is_popular: false,
    },
    {
      id: 4,
      name: 'Paket Tahunan (12 Bulan)',
      duration_months: 12,
      price: 1650000,
      description: 'Paket paling hemat untuk gaya hidup bugar berkelanjutan sepanjang tahun.',
      benefits: [
        'Akses tak terbatas ke seluruh cabang 365 hari',
        'Prioritas loker & fasilitas eksklusif',
        'Hak cuti membership (Freeze) hingga 30 hari',
        'Free 1 sesi Personal Trainer intensif',
        'Nilai investasi bulanan paling terjangkau',
      ],
      is_popular: false,
    },
  ];

  const plans = dynamicMemberships && dynamicMemberships.length > 0 ? dynamicMemberships : defaultMemberships;

  const durations = [
    { value: 'all', label: 'Semua Durasi' },
    { value: '1', label: '1 Bulan' },
    { value: '3', label: '3 Bulan' },
    { value: '6', label: '6 Bulan' },
    { value: '12', label: '12 Bulan' },
  ];

  const filteredPlans = plans.filter((plan) => {
    if (selectedDuration === 'all') return true;
    return String(plan.duration_months) === selectedDuration;
  });

  const whatsappNumber = settings?.contact_whatsapp || '6281234567890';

  const formatRupiah = (num) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const getWaLink = (plan) => {
    const text = encodeURIComponent(
      `Halo BUILDY GYM, saya tertarik untuk mendaftar ${plan.name} seharga ${formatRupiah(plan.price)}. Mohon info prosedur pendaftarannya. Terima kasih!`
    );
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <section
      id="membership"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-surface-lowest)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto var(--space-2xl)' }}>
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
            PAKET MEMBERSHIP & HARGA
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
            BIAYA JELAS & TRANSPARAN, TANPA BIAYA TERSEMBUNYI
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Pilih paket keanggotaan yang sesuai dengan target latihan Anda. Seluruh paket mencakup akses alat lengkap,
            fasilitas higienis, dan tanpa biaya admin tambahan.
          </p>

          {/* Duration Toggle Buttons */}
          <div
            style={{
              display: 'inline-flex',
              gap: '6px',
              backgroundColor: 'var(--color-surface-low)',
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-border)',
              marginTop: 'var(--space-lg)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {durations.map((d) => {
              const active = selectedDuration === d.value;
              return (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setSelectedDuration(d.value)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    border: 'none',
                    backgroundColor: active ? 'var(--color-accent)' : 'transparent',
                    color: active ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-lg)',
            alignItems: 'stretch',
          }}
        >
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: `1px solid ${plan.is_popular ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: 'var(--radius-sm)',
                padding: 'var(--space-xl)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: plan.is_popular ? '0 8px 30px rgba(195, 244, 0, 0.1)' : 'none',
              }}
            >
              {plan.is_popular && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    right: '24px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  ⭐ Paling Populer
                </span>
              )}

              <div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: 'var(--color-text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  Durasi {plan.duration_months} Bulan
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.4rem',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    marginTop: '4px',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  {plan.name}
                </h3>

                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2.4rem',
                      fontWeight: 700,
                      color: plan.is_popular ? 'var(--color-accent)' : 'var(--color-text-primary)',
                      lineHeight: 1,
                    }}
                  >
                    {formatRupiah(plan.price)}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'block', marginTop: '4px' }}>
                    Total pembayaran penuh
                  </span>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 'var(--space-lg)' }}>
                  {plan.description}
                </p>

                {/* Benefits List */}
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '10px' }}>
                    Fasilitas yang didapat:
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(Array.isArray(plan.benefits) ? plan.benefits : []).map((b, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <a
                href={getWaLink(plan)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: plan.is_popular ? 'var(--color-accent)' : 'transparent',
                  color: plan.is_popular ? 'var(--color-accent-text)' : 'var(--color-text-primary)',
                  border: `1px solid ${plan.is_popular ? 'var(--color-accent)' : 'var(--color-border-high)'}`,
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'all var(--transition-fast)',
                }}
              >
                Pilih Paket Ini (WhatsApp)
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
