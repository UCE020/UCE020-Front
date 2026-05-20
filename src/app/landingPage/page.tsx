"use client";

import { HeroSection, Navbar, BenefitsSection, AboutSection, Footer} from "@/features/landingPage";


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
