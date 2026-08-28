import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import PortfolioSection from "../components/PortfolioSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta(
    "P.K Creative Agency | Websites, Branding & Digital Experiences",
    "P.K Creative Agency helps businesses build powerful websites, memorable brands, and modern digital experiences."
  );

  return (
    <main>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioSection />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection />
    </main>
  );
}
