import { useState } from 'react';

export default function Facilities({ facilities: dynamicFacilities }) {
  const [filter, setFilter] = useState('all');

  // Realistic fallback facilities if dynamic database list is empty
  const defaultFacilities = [
    {
      id: 1,
      name: 'Free Weight & Power Rack Station',
      description: 'Lantai rubber shock-absorbing dengan set barbel Olimpiade, plat beban calibrated, dan power cage aman untuk squat, bench press, serta deadlift.',
      image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
      is_featured: true,
      icon_name: 'dumbbell',
    },
    {
      id: 2,
      name: 'Dumbbell Zone (2kg - 50kg)',
      description: 'Rak dumbbell berpasangan lengkap dengan kenaikan berat teratur, dilengkapi beberapa bangku adjustable (flat, incline, decline).',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
      is_featured: true,
      icon_name: 'dumbbell',
    },
    {
      id: 3,
      name: 'Pin-Selected & Cable Machines',
      description: 'Mesin isolasi otot multifungsi: Dual Adjustable Pulley, Lat Pulldown, Leg Press, Leg Extension, dan Seated Cable Row.',
      image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
      is_featured: true,
      icon_name: 'dumbbell',
    },
    {
      id: 4,
      name: 'Cardio Deck & Treadmills',
      description: 'Treadmill komersial, stationary bikes, dan elliptical machine dengan monitor detak jantung untuk latihan kardiovaskular dan fat burning.',
      image_url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
      is_featured: false,
      icon_name: 'heart-pulse',
    },
    {
      id: 5,
      name: 'Ruangan Berpendingin Udara (AC)',
      description: 'Sistem penyejuk udara dan sirkulasi ventilasi yang dioptimalkan untuk menjaga suhu ruangan tetap sejuk selama sesi latihan intensif.',
      image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
      is_featured: false,
      icon_name: 'snowflake',
    },
    {
      id: 6,
      name: 'Locker Pribadi & Ruang Ganti Bersih',
      description: 'Loker penyimpanan barang berharga, ruang ganti privat, dan toilet higienis yang dibersihkan secara terjadwal setiap hari.',
      image_url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800',
      is_featured: false,
      icon_name: 'lockers',
    },
  ];

  const items = dynamicFacilities && dynamicFacilities.length > 0 ? dynamicFacilities : defaultFacilities;

  const filteredItems = items.filter((item) => {
    if (filter === 'featured') return item.is_featured;
    return true;
  });

  return (
    <section
      id="facilities"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)',
          }}
        >
          <div style={{ maxWidth: '600px' }}>
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
              SARANA & PERLENGKAPAN
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                textTransform: 'uppercase',
                color: 'var(--color-text-primary)',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              FASILITAS LATIHAN TERBAIK UNTUK PROGRES ANDA
            </h2>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: filter === 'all' ? 'var(--color-accent)' : 'var(--color-border)',
                backgroundColor: filter === 'all' ? 'var(--color-accent)' : 'var(--color-surface-low)',
                color: filter === 'all' ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Semua Fasilitas
            </button>
            <button
              onClick={() => setFilter('featured')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: filter === 'featured' ? 'var(--color-accent)' : 'var(--color-border)',
                backgroundColor: filter === 'featured' ? 'var(--color-accent)' : 'var(--color-surface-low)',
                color: filter === 'featured' ? 'var(--color-accent-text)' : 'var(--color-text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              ⭐ Unggulan
            </button>
          </div>
        </div>

        {/* Facilities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'border-color var(--transition-fast)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
            >
              {/* Image Preview */}
              <div style={{ height: '200px', position: 'relative', backgroundColor: 'var(--color-surface-mid)' }}>
                <img
                  src={item.image_url || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800'}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800';
                  }}
                />
                {item.is_featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-text)',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    Unggulan
                  </span>
                )}
              </div>

              {/* Text Body */}
              <div style={{ padding: 'var(--space-lg)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  {item.name}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
