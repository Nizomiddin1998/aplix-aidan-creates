import { Header } from "@/widgets/header/Header";
import { Hero } from "@/widgets/hero/Hero";
import { LogoCloud } from "@/widgets/logo-cloud/LogoCloud";
import { BentoGrid } from "@/widgets/bento-grid/BentoGrid";
import { FeaturesTab } from "@/widgets/features-tab/FeaturesTab";
import { Testimonials } from "@/widgets/testimonials/Testimonials";
import { Pricing } from "@/widgets/pricing/Pricing";
import { FAQ } from "@/widgets/faq/FAQ";
import { CTASection } from "@/widgets/cta/CTASection";
import { Footer } from "@/widgets/footer/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <Header />
      <Hero />
      <LogoCloud />
      <BentoGrid />
      <FeaturesTab />
      <Pricing />
      <FAQ />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
