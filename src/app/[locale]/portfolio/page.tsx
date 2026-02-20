import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ArrowRight } from "lucide-react";

// Placeholder data (will be replaced by DB queries when database is connected)
const PLACEHOLDER_PROJECTS = [
  { slug: "luxury-automotive-brand-film", title: "Luxury Automotive Brand Film", brief: "A cinematic brand film capturing the fusion of engineering excellence and emotional storytelling for a premium automotive launch in the UAE.", category: "COMMERCIAL", thumbnailUrl: "/images/placeholder-thumb-1.jpg", year: 2025, client: "Prestige Motors UAE" },
  { slug: "emirates-brand-film", title: "Emirates Brand Film", brief: "A cinematic brand film showcasing the essence of luxury travel and world-class hospitality.", category: "CORPORATE", thumbnailUrl: "/images/placeholder-thumb-1.jpg", year: 2025, client: "Emirates Airlines" },
  { slug: "dubai-expo-highlights", title: "Dubai Expo Highlights", brief: "Capturing the innovation and cultural diversity of Dubai Expo through a series of short films.", category: "EVENT", thumbnailUrl: "/images/placeholder-thumb-2.jpg", year: 2025, client: "Dubai Expo" },
  { slug: "luxury-auto-commercial", title: "Luxury Auto Campaign", brief: "A high-octane commercial campaign for a premium automotive brand launching in the Middle East.", category: "COMMERCIAL", thumbnailUrl: "/images/placeholder-thumb-3.jpg", year: 2024, client: "Premium Motors" },
  { slug: "heritage-documentary", title: "Voices of Heritage", brief: "An intimate documentary exploring the preservation of traditional craftsmanship in the UAE.", category: "DOCUMENTARY", thumbnailUrl: "/images/placeholder-thumb-1.jpg", year: 2024, client: "UAE Cultural Foundation" },
  { slug: "fintech-product-launch", title: "FinTech Product Launch", brief: "A dynamic product launch film combining motion graphics with live-action storytelling.", category: "ANIMATION", thumbnailUrl: "/images/placeholder-thumb-2.jpg", year: 2024, client: "PayFlow Technologies" },
  { slug: "fashion-week-coverage", title: "Fashion Week Coverage", brief: "Behind-the-scenes and runway coverage for Dubai Fashion Week's premium showcase.", category: "SOCIAL", thumbnailUrl: "/images/placeholder-thumb-3.jpg", year: 2025, client: "Dubai Fashion Council" },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio");

  return (
    <>
      <section className="pb-8 pt-32 md:pt-40">
        <Container>
          <SectionHeading
            tagline={t("tagline")}
            title={t("title")}
            description={t("description")}
          />
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <ProjectGrid projects={PLACEHOLDER_PROJECTS} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border py-24 md:py-32">
        <Container>
          <ScrollReveal variant="scale">
            <div className="relative overflow-hidden rounded-3xl bg-background-tertiary px-8 py-20 text-center md:px-16">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />
              <div className="relative z-10">
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">
                  {t("cta_tagline")}
                </p>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  {t("cta_title")}
                </h2>
                <p className="mx-auto mb-10 max-w-xl text-base text-foreground-muted md:text-lg">
                  {t("cta_description")}
                </p>
                <Button variant="gold" size="lg" href="/contact" className="gap-2">
                  {t("cta_button")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
