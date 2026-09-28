import { useState, useEffect } from 'react';
import { publicApi } from '../../services/api';

// Public Components
import Navbar from '../../components/public/Navbar';
import Hero from '../../components/public/Hero';
import About from '../../components/public/About';
import Facilities from '../../components/public/Facilities';
import Membership from '../../components/public/Membership';
import Trainers from '../../components/public/Trainers';
import Branches from '../../components/public/Branches';
import Testimonials from '../../components/public/Testimonials';
import Gallery from '../../components/public/Gallery';
import Faq from '../../components/public/Faq';
import Cta from '../../components/public/Cta';
import Footer from '../../components/public/Footer';

export default function LandingPage() {
  const [gymData, setGymData] = useState({
    settings: null,
    memberships: [],
    trainers: [],
    branches: [],
    facilities: [],
    testimonials: [],
    gallery: [],
    faqs: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLandingData() {
      try {
        setLoading(true);
        const res = await publicApi.getLandingData();
        if (res?.data) {
          setGymData(res.data);
        }
      } catch (err) {
        // Fallback safely to default datasets inside each component if API is unreachable
        console.warn('Backend API offline or unreachable, using verified default gym dataset:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadLandingData();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text-primary)' }}>
      {/* 1. Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero settings={gymData.settings} />

        {/* 3. About Section */}
        <About />

        {/* 4. Facilities Section */}
        <Facilities facilities={gymData.facilities} />

        {/* 5. Membership Section */}
        <Membership memberships={gymData.memberships} settings={gymData.settings} />

        {/* 6. Personal Trainer Section */}
        <Trainers trainers={gymData.trainers} settings={gymData.settings} />

        {/* 7. Branches Section */}
        <Branches branches={gymData.branches} settings={gymData.settings} />

        {/* 8. Testimonials Section */}
        <Testimonials testimonials={gymData.testimonials} />

        {/* 9. Gallery Section */}
        <Gallery gallery={gymData.gallery} />

        {/* 10. FAQ Section */}
        <Faq faqs={gymData.faqs} />

        {/* 11. CTA Banner */}
        <Cta settings={gymData.settings} />
      </main>

      {/* 12. Footer */}
      <Footer settings={gymData.settings} />
    </div>
  );
}
