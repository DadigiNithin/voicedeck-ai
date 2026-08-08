import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import InteractiveDemo from "@/components/InteractiveDemo";
import Timeline from "@/components/Timeline";
import PricingSection from "@/components/PricingSection";
import X402Section from "@/components/X402Section";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* Sticky Navigation */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Grid */}
      <FeaturesSection />

      {/* How It Works */}
      <HowItWorks />

      {/* Interactive Demo */}
      <InteractiveDemo />

      {/* AI Workflow Timeline */}
      <Timeline />

      {/* Security & Payment Protocol */}
      <X402Section />

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <CTABanner />

      {/* Footer */}
      <Footer />
    </main>
  );
}
