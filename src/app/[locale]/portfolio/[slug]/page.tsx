import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

// Placeholder project data
const PROJECTS: Record<string, {
  slug: string; title: string; titleAr: string; brief: string;
  category: string; client: string; year: number;
  thumbnailUrl: string; challenge: string; approach: string; result: string;
  metrics: { label: string; value: number; suffix: string }[];
  gallery: string[];
}> = {
  "emirates-brand-film": {
    slug: "emirates-brand-film", title: "Emirates Brand Film", titleAr: "فيلم علامة الإمارات التجارية",
    brief: "A cinematic brand film showcasing the essence of luxury travel.",
    category: "CORPORATE", client: "Emirates Airlines", year: 2025,
    thumbnailUrl: "/images/placeholder-thumb-1.jpg",
    challenge: "Create a film that captures the essence of luxury travel while maintaining authenticity and emotional resonance with a global audience spanning multiple cultures and demographics.",
    approach: "We employed a team of 30 across 5 international locations, utilizing aerial cinematography, intimate storytelling, and a carefully curated soundtrack to weave together a narrative that transcends language barriers.",
    result: "The film garnered over 2.5 million views in its first week, increased brand engagement by 45%, and received recognition at three international film festivals.",
    metrics: [{ label: "Views", value: 2500000, suffix: "M" }, { label: "Engagement", value: 45, suffix: "%" }, { label: "Awards", value: 3, suffix: "+" }],
    gallery: ["/images/placeholder-thumb-1.jpg", "/images/placeholder-thumb-2.jpg", "/images/placeholder-thumb-3.jpg"],
  },
  "dubai-expo-highlights": {
    slug: "dubai-expo-highlights", title: "Dubai Expo Highlights", titleAr: "أبرز فعاليات إكسبو دبي",
    brief: "Capturing the innovation and cultural diversity of Dubai Expo.",
    category: "EVENT", client: "Dubai Expo", year: 2025,
    thumbnailUrl: "/images/placeholder-thumb-2.jpg",
    challenge: "Document the scale and diversity of Expo while maintaining a cohesive narrative thread across multiple short films.",
    approach: "Deployed multiple camera crews simultaneously across pavilions, using real-time coordination to capture spontaneous moments alongside planned sequences.",
    result: "Produced 12 short films viewed over 5 million times collectively, becoming the most-shared content series from the event.",
    metrics: [{ label: "Films", value: 12, suffix: "+" }, { label: "Views", value: 5000000, suffix: "M" }, { label: "Shares", value: 50000, suffix: "K" }],
    gallery: ["/images/placeholder-thumb-2.jpg", "/images/placeholder-thumb-3.jpg", "/images/placeholder-thumb-1.jpg"],
  },
  "luxury-auto-commercial": {
    slug: "luxury-auto-commercial", title: "Luxury Auto Campaign", titleAr: "حملة السيارات الفاخرة",
    brief: "A high-octane commercial campaign for a premium automotive brand.",
    category: "COMMERCIAL", client: "Premium Motors", year: 2024,
    thumbnailUrl: "/images/placeholder-thumb-3.jpg",
    challenge: "Convey the power and elegance of the vehicle while adhering to strict brand guidelines and regional advertising standards.",
    approach: "Shot across the UAE desert and Dubai cityscape using specialized camera rigs, drone cinematography, and precision driving coordinators.",
    result: "Campaign achieved 180% of target impressions, contributed to a 35% increase in regional test-drive bookings.",
    metrics: [{ label: "Impressions", value: 180, suffix: "%" }, { label: "Bookings", value: 35, suffix: "%" }, { label: "ROI", value: 4, suffix: "x" }],
    gallery: ["/images/placeholder-thumb-3.jpg", "/images/placeholder-thumb-1.jpg", "/images/placeholder-thumb-2.jpg"],
  },
  "heritage-documentary": {
    slug: "heritage-documentary", title: "Voices of Heritage", titleAr: "أصوات التراث",
    brief: "An intimate documentary exploring the preservation of traditional craftsmanship.",
    category: "DOCUMENTARY", client: "UAE Cultural Foundation", year: 2024,
    thumbnailUrl: "/images/placeholder-thumb-1.jpg",
    challenge: "Respectfully document cultural traditions while making the content engaging for younger audiences.",
    approach: "Spent 6 months embedded with artisan communities, building trust and capturing authentic stories through observational filmmaking.",
    result: "Selected for screening at Abu Dhabi Film Festival, streamed by a major platform, and used in educational curricula.",
    metrics: [{ label: "Months", value: 6, suffix: "" }, { label: "Screenings", value: 15, suffix: "+" }, { label: "Rating", value: 9, suffix: "/10" }],
    gallery: ["/images/placeholder-thumb-1.jpg", "/images/placeholder-thumb-2.jpg", "/images/placeholder-thumb-3.jpg"],
  },
  "fintech-product-launch": {
    slug: "fintech-product-launch", title: "FinTech Product Launch", titleAr: "إطلاق منتج التكنولوجيا المالية",
    brief: "A dynamic product launch film combining motion graphics with live-action.",
    category: "ANIMATION", client: "PayFlow Technologies", year: 2024,
    thumbnailUrl: "/images/placeholder-thumb-2.jpg",
    challenge: "Explain complex financial technology in an accessible and visually compelling way within a 90-second runtime.",
    approach: "Combined 3D product visualization with real user testimonials, using kinetic typography and fluid transitions to maintain pace.",
    result: "Video achieved a 72% completion rate on social platforms, well above the industry average of 40%.",
    metrics: [{ label: "Completion", value: 72, suffix: "%" }, { label: "Signups", value: 12000, suffix: "K" }, { label: "Shares", value: 8500, suffix: "K" }],
    gallery: ["/images/placeholder-thumb-2.jpg", "/images/placeholder-thumb-3.jpg", "/images/placeholder-thumb-1.jpg"],
  },
  "fashion-week-coverage": {
    slug: "fashion-week-coverage", title: "Fashion Week Coverage", titleAr: "تغطية أسبوع الموضة",
    brief: "Behind-the-scenes and runway coverage for Dubai Fashion Week.",
    category: "SOCIAL", client: "Dubai Fashion Council", year: 2025,
    thumbnailUrl: "/images/placeholder-thumb-3.jpg",
    challenge: "Deliver real-time social content while simultaneously producing a polished recap film.",
    approach: "Operated dual teams: a fast-turnaround social squad and a cinema-grade production crew, sharing footage via cloud-based workflows.",
    result: "Generated 50+ social clips with 8M total impressions, and a 4-minute recap film featured by fashion publications.",
    metrics: [{ label: "Clips", value: 50, suffix: "+" }, { label: "Impressions", value: 8000000, suffix: "M" }, { label: "Features", value: 12, suffix: "" }],
    gallery: ["/images/placeholder-thumb-3.jpg", "/images/placeholder-thumb-1.jpg", "/images/placeholder-thumb-2.jpg"],
  },
};

export async function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  const project = PROJECTS[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.brief,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  const t = await getTranslations("case_study");
  const pt = await getTranslations("portfolio");

  return (
    <article>
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="video-overlay absolute inset-0" />
        </div>
        <Container className="relative z-10 pb-16 pt-40">
          <Button variant="ghost" href="/portfolio" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Button>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold">
            {pt(`categories.${project.category}`)}
          </p>
          <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            {locale === "ar" ? project.titleAr : project.title}
          </h1>
        </Container>
      </section>

      {/* Overview */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 border-b border-border pb-12 md:grid-cols-3">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">{t("client")}</p>
                <p className="font-semibold">{project.client}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">{t("category")}</p>
                <p className="font-semibold">{pt(`categories.${project.category}`)}</p>
              </div>
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">{t("year")}</p>
                <p className="font-semibold">{project.year}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Challenge */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("challenge")}</p>
                <p className="text-lg leading-relaxed text-foreground-muted">{project.challenge}</p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image src={project.gallery[0]} alt="Challenge" fill className="object-cover" sizes="50vw" />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Approach */}
      <section className="bg-background-secondary py-16">
        <Container>
          <ScrollReveal>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl md:order-1">
                <Image src={project.gallery[1]} alt="Approach" fill className="object-cover" sizes="50vw" />
              </div>
              <div className="md:order-2">
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("approach")}</p>
                <p className="text-lg leading-relaxed text-foreground-muted">{project.approach}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.25em] text-gold">
              {t("gallery")}
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div key={i} className="relative aspect-video overflow-hidden rounded-xl">
                  <Image src={img} alt={`Gallery ${i + 1}`} fill className="object-cover" sizes="33vw" />
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Result */}
      <section className="bg-background-secondary py-16">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("result")}</p>
              <p className="text-lg leading-relaxed text-foreground-muted">{project.result}</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Impact Metrics */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-[0.25em] text-gold">
              {t("impact")}
            </p>
            <div className="grid grid-cols-3 gap-8">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="mb-2 text-3xl font-bold text-gold md:text-5xl">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <p className="text-sm text-foreground-muted">{metric.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16">
        <Container>
          <div className="text-center">
            <Button variant="outline" href="/portfolio">
              {t("back")}
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
