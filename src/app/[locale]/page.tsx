import dynamic from "next/dynamic";
import AdvancedCinematicHero from "@/components/AdvancedCinematicHero";
import { ClientLogos } from "@/components/home/ClientLogos";
import { ServicesSection } from "@/components/home/ServicesSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { InlineCTA } from "@/components/shared/InlineCTA";

const StatsSection = dynamic(
  () => import("@/components/home/StatsSection").then((m) => m.StatsSection),
  { ssr: true }
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection").then((m) => m.TestimonialsSection),
  { ssr: true }
);
const AwardsSection = dynamic(
  () => import("@/components/home/AwardsSection").then((m) => m.AwardsSection),
  { ssr: true }
);
const CTASection = dynamic(
  () => import("@/components/home/CTASection").then((m) => m.CTASection),
  { ssr: true }
);

export default function HomePage() {
  return (
    <>
      <AdvancedCinematicHero />
      <ClientLogos />
      <ServicesSection />
      <InlineCTA />
      <FeaturedWork />
      <StatsSection />
      <TestimonialsSection />
      <AwardsSection />
      <CTASection />
    </>
  );
}
