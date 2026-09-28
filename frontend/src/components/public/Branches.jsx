import { useState } from 'react';

export default function Branches({ branches: dynamicBranches, settings }) {
  const defaultBranches = [
    {
      id: 1,
      name: 'BUILDY GYM — Cabang Mempawah',
      city: 'Mempawah',
      address: 'Jl. Raden Kusno No. 45, Terusan, Mempawah Hilir',
      opening_hours: 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
      contact_phone: '6281234567891',
      google_maps_url: 'https://maps.google.com/?q=Mempawah',
      facilities_available: ['Free Weights Area', 'Cardio Deck', 'Locker Room', 'Shower', 'Ruang AC'],
      image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
    },
    {
      id: 2,
      name: 'BUILDY GYM — Cabang Desa Kapur',
      city: 'Kubu Raya',
      address: 'Jl. Raya Desa Kapur, Kompleks Niaga Blok B, Kubu Raya',
      opening_hours: 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
      contact_phone: '6281234567892',
      google_maps_url: 'https://maps.google.com/?q=Desa+Kapur+Kubu+Raya',
      facilities_available: ['Plate-Loaded Machines', 'Power Rack Cage', 'Dumbbell Zone', 'Area Parkir Luas'],
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    },
    {
      id: 3,
      name: 'BUILDY GYM — Cabang Kuala Dua',
      city: 'Kuala Dua',
      address: 'Jl. Raya Kuala Dua No. 18, Depan Lapangan Bola',
      opening_hours: 'Senin - Sabtu: 06:00 - 22:00 | Minggu: 07:00 - 20:00',
      contact_phone: '6281234567893',
      google_maps_url: 'https://maps.google.com/?q=Kuala+Dua',
      facilities_available: ['Barbell Station', 'Mesin Isolasi Otot', 'Loker Pribadi', 'Ruang Tunggu Santai'],
      image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    },
  ];

  const branches = dynamicBranches && dynamicBranches.length > 0 ? dynamicBranches : defaultBranches;
  const [activeBranchId, setActiveBranchId] = useState(branches[0]?.id || 1);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];
  const defaultWa = settings?.contact_whatsapp || '6281234567890';

  const getWaBranchLink = (branch) => {
    const wa = branch.contact_phone || defaultWa;
    const text = encodeURIComponent(
      `Halo BUILDY GYM ${branch.name}, saya ingin menanyakan informasi pendaftaran member dan fasilitas di cabang ini.`
    );
    return `https://wa.me/${wa}?text=${text}`;
  };

  return (
    <section
      id="branches"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-surface-lowest)',
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
            JARINGAN CABANG BUILDY GYM
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
            LOKASI STRATEGIS & MUDAH DIAKSES
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Member BUILDY GYM memiliki fleksibilitas untuk berlatih di cabang yang paling dekat dengan aktivitas Anda.
            Setiap cabang dilengkapi standar peralatan dan kebersihan yang sama.
          </p>
        </div>

        {/* Branch Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: 'var(--space-xl)',
            overflowX: 'auto',
            paddingBottom: '8px',
          }}
        >
          {branches.map((b) => {
            const isActive = b.id === activeBranchId;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setActiveBranchId(b.id)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                  backgroundColor: isActive ? 'rgba(195, 244, 0, 0.15)' : 'var(--color-surface-low)',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all var(--transition-fast)',
                }}
              >
                📍 {b.city} — {b.name.replace('BUILDY GYM — ', '')}
              </button>
            );
          })}
        </div>

        {/* Active Branch Detailed Card */}
        {activeBranch && (
          <div
            style={{
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0',
            }}
            className="branch-detail-grid"
          >
            {/* Visual Thumbnail / Map Representation */}
            <div style={{ minHeight: '280px', position: 'relative', backgroundColor: 'var(--color-surface-mid)' }}>
              <img
                src={activeBranch.image_url || 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800'}
                alt={activeBranch.name}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 20, 19, 0.8) 0%, transparent 60%)',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-border)',
                }}
              >
                Wilayah: {activeBranch.city}
              </div>
            </div>

            {/* Info and Actions */}
            <div style={{ padding: 'var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.6rem',
                    color: 'var(--color-text-primary)',
                    textTransform: 'uppercase',
                    marginBottom: 'var(--space-md)',
                  }}
                >
                  {activeBranch.name}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '1px' }}>
                      Alamat Lengkap:
                    </span>
                    <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', margin: '4px 0 0' }}>
                      {activeBranch.address}
                    </p>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '1px' }}>
                      Jam Operasional:
                    </span>
                    <p style={{ color: 'var(--color-accent)', fontSize: '0.95rem', fontWeight: 600, margin: '4px 0 0' }}>
                      🕒 {activeBranch.opening_hours}
                    </p>
                  </div>

                  {Array.isArray(activeBranch.facilities_available) && activeBranch.facilities_available.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '1px' }}>
                        Fasilitas di Cabang Ini:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                        {activeBranch.facilities_available.map((f, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.75rem',
                              padding: '3px 8px',
                              backgroundColor: 'var(--color-surface-mid)',
                              border: '1px solid var(--color-border)',
                              borderRadius: 'var(--radius-sm)',
                              color: 'var(--color-text-secondary)',
                            }}
                          >
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)' }}>
                {activeBranch.google_maps_url && (
                  <a
                    href={activeBranch.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      flex: 1,
                      minHeight: '44px',
                      padding: '0 18px',
                      backgroundColor: 'transparent',
                      border: '1px solid var(--color-border-high)',
                      borderRadius: 'var(--radius-sm)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Buka di Google Maps ↗
                  </a>
                )}
                <a
                  href={getWaBranchLink(activeBranch)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    minHeight: '44px',
                    padding: '0 18px',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-text)',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Hubungi Cabang (WA)
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 900px) {
          .branch-detail-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
