import { useState } from 'react';

export default function Gallery({ gallery: dynamicGallery }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activePhoto, setActivePhoto] = useState(null);

  const defaultGallery = [
    {
      id: 1,
      title: 'Area Barbel & Dumbbell Set',
      category: 'Peralatan & Beban',
      image_url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800',
    },
    {
      id: 2,
      title: 'Suasana Sesi Latihan Malam',
      category: 'Suasana Gym',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800',
    },
    {
      id: 3,
      title: 'Mesin Isolasi & Cable Cross',
      category: 'Peralatan & Beban',
      image_url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800',
    },
    {
      id: 4,
      title: 'Treadmill & Cardio Deck Ber-AC',
      category: 'Suasana Gym',
      image_url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800',
    },
    {
      id: 5,
      title: 'Area Peregangan & Matras',
      category: 'Studio & Kelas',
      image_url: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800',
    },
    {
      id: 6,
      title: 'Locker Room & Ruang Ganti',
      category: 'Suasana Gym',
      image_url: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800',
    },
  ];

  const galleryItems =
    dynamicGallery && dynamicGallery.length > 0 ? dynamicGallery : defaultGallery;

  const categories = ['all', 'Suasana Gym', 'Peralatan & Beban', 'Studio & Kelas'];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <section
      id="gallery"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-surface-lowest)',
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
              DOKUMENTASI VISUAL
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
              GALERI SUASANA & PERALATAN
            </h2>
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((c) => {
              const active = selectedCategory === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid',
                    borderColor: active ? 'var(--color-accent)' : 'var(--color-border)',
                    backgroundColor: active ? 'rgba(195, 244, 0, 0.15)' : 'var(--color-surface-low)',
                    color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  {c === 'all' ? 'Semua Foto' : c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 'var(--space-md)',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              style={{
                position: 'relative',
                height: '240px',
                backgroundColor: 'var(--color-surface-low)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={item.image_url}
                alt={item.title || 'Foto Gym'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform var(--transition-normal)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16, 20, 19, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: 'var(--space-md)',
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.75rem',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.category}
                  </span>
                  <h4
                    style={{
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      margin: '2px 0 0',
                    }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: 'var(--space-md)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '800px',
              width: '100%',
              backgroundColor: 'var(--color-surface-low)',
              border: '1px solid var(--color-border-high)',
              borderRadius: 'var(--radius-sm)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setActivePhoto(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#fff',
                border: '1px solid var(--color-border)',
                fontSize: '1.2rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
              aria-label="Tutup preview gambar"
            >
              &times;
            </button>
            <img
              src={activePhoto.image_url}
              alt={activePhoto.title}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ padding: 'var(--space-md) var(--space-lg)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, textTransform: 'uppercase' }}>
                {activePhoto.category}
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-primary)', margin: '4px 0 0' }}>
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
