import { useState, useEffect } from 'react';
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
  const [settings, setSettings] = useState(null);

  // Optional background fetch for live website settings if available
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('http://localhost:8000/api/v1/health');
        if (res.ok) {
          // backend is reachable
        }
      } catch (e) {
        // Fallback to default styling and copy without error
      }
    }
    loadSettings();
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', color: 'var(--color-text-primary)' }}>
      {/* 1. Navbar */}
      <Navbar />

      <main>
        {/* 2. Hero Section */}
        <Hero settings={settings} />

        {/* 3. About Section */}
        <About />

        {/* 4. Facilities Section */}
        <Facilities />

        {/* 5. Membership Section */}
        <Membership settings={settings} />

        {/* 6. Personal Trainer Section */}
        <Trainers settings={settings} />

        {/* 7. Branches Section */}
        <Branches settings={settings} />

        {/* 8. Testimonials Section */}
        <Testimonials />

        {/* 9. Gallery Section */}
        <Gallery />

        {/* 10. FAQ Section */}
        <Faq />

        {/* 11. CTA Banner */}
        <Cta settings={settings} />
      </main>

      {/* 12. Footer */}
      <Footer settings={settings} />
    </div>
  );
}
