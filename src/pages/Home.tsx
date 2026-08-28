import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import ServicesSection from "../components/ServicesSection";
import WhyChooseUs from "../components/WhyChooseUs";
import PortfolioSection from "../components/PortfolioSection";
import ProcessSection from "../components/ProcessSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import { usePageMeta } from "../hooks/usePageMeta";
import { seo } from "../config/agencyConfig";

export default function Home() {
  usePageMeta(seo.defaultTitle, seo.defaultDescription);
  return (
    <main>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <WhyChooseUs />
      <PortfolioSection featured />
      <ProcessSection />
      <TestimonialsSection />
      <PricingSection />
    </main>
  );
}
