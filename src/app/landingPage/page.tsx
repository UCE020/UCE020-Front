import { HeroSection } from '@/components/landing/HeroSection';
import { Navbar } from '@/components/landing/Navbar';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <AboutSection />
      <Footer />
    </>
  );
}
