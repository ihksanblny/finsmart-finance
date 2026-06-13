import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import InflationSection from '../components/landing/InflationSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0e2917] text-white overflow-hidden relative font-sans selection:bg-[#b5f164]/30">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <Navbar />

        <HeroSection />
      </div>

      <FeaturesSection />

      <InflationSection />

      <Footer />
    </div>
  );
}