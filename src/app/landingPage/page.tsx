import { HeroSection } from '@/components/landing/HeroSection';
import { Navbar } from '@/components/landing/Navbar';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { AboutSection } from '@/components/landing/AboutSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <AboutSection />
      <HowItWorksSection />
    </>
  );
}
