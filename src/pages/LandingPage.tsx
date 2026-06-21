import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import InflationSection from '../components/landing/InflationSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFC] text-zinc-900 overflow-hidden relative font-sans selection:bg-zinc-200">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <Navbar />
        <HeroSection />
      </div>

      <InflationSection />
      <FeaturesSection />

      <Footer />
    </div>
  );
}