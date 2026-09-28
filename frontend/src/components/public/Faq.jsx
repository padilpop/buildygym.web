import { useState } from 'react';

export default function Faq({ faqs: dynamicFaqs }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const defaultFaqs = [
    {
      id: 1,
      category: 'Membership',
      question: 'Apakah ada biaya pendaftaran (admin fee) tambahan saat pertama kali join?',
      answer:
        'Tidak ada. Di BUILDY GYM tidak ada biaya pendaftaran atau biaya administrasi tersembunyi. Biaya yang Anda bayarkan murni sesuai harga paket membership yang dipilih.',
    },
    {
      id: 2,
      category: 'Membership',
      question: 'Apakah satu kartu membership bisa digunakan di seluruh cabang BUILDY GYM?',
      answer:
        'Ya, paket membership reguler (3, 6, dan 12 bulan) otomatis memberikan hak akses penuh (All-Club Access) ke seluruh jaringan cabang BUILDY GYM tanpa biaya tambahan.',
    },
    {
      id: 3,
      category: 'Fasilitas & Jam Operasional',
      question: 'Kapan jam operasional gym dibuka?',
      answer:
        'Seluruh cabang BUILDY GYM beroperasi dari hari Senin hingga Sabtu pukul 06:00 - 22:00, dan hari Minggu pukul 07:00 - 20:00.',
    },
    {
      id: 4,
      category: 'Personal Trainer',
      question: 'Apakah pemula wajib menyewa Personal Trainer?',
      answer:
        'Tidak wajib. Bagi pemula yang baru pertama kali bergabung, staf instruktur kami akan memberikan sesi orientasi dasar mengenai cara pemakaian alat dengan aman. Namun jika Anda membutuhkan bimbingan intensif dan program latihan terukur, Anda dapat mengambil sesi Personal Trainer resmi kami.',
    },
    {
      id: 5,
      category: 'Umum',
      question: 'Apa saja perlengkapan yang wajib dibawa saat berlatih?',
      answer:
        'Anda wajib mengenakan pakaian olahraga yang nyaman, sepatu olahraga/sneakers bertali yang bersih (dilarang menggunakan sandal/telanjang kaki di area beban), dan disarankan membawa handuk kecil pribadi.',
    },
  ];

  const faqs = dynamicFaqs && dynamicFaqs.length > 0 ? dynamicFaqs : defaultFaqs;

  const categories = ['all', 'Membership', 'Fasilitas & Jam Operasional', 'Personal Trainer', 'Umum'];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory === 'all') return true;
    return faq.category === selectedCategory;
  });

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      style={{
        padding: 'var(--space-3xl) 0',
        backgroundColor: 'var(--color-bg)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
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
            PERTANYAAN UMUM
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
            SEMUA YANG PERLU ANDA KETAHUI
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Pertanyaan yang paling sering diajukan seputar keanggotaan, fasilitas, pelatih, dan tata tertib latihan.
          </p>

          {/* Categories */}
          <div
            style={{
              display: 'flex',
              gap: '6px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: 'var(--space-lg)',
            }}
          >
            {categories.map((c) => {
              const active = selectedCategory === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(c);
                    setOpenIndex(null);
                  }}
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
                  {c === 'all' ? 'Semua Pertanyaan' : c}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                style={{
                  backgroundColor: 'var(--color-surface-low)',
                  border: `1px solid ${isOpen ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  transition: 'border-color var(--transition-fast)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-primary)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 600,
                    gap: '12px',
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '1.2rem',
                      color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                      transition: 'transform var(--transition-fast)',
                    }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 20px 20px 20px',
                      color: 'var(--color-text-secondary)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      borderTop: '1px solid var(--color-border)',
                      marginTop: '0',
                      paddingTop: '14px',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
