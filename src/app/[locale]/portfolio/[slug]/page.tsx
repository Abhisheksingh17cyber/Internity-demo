import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Eye, TrendingUp, Award, Calendar } from "lucide-react";

const METRIC_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Views: Eye,
  Engagement: TrendingUp,
  Awards: Award,
  "Shoot Days": Calendar,
  Films: Eye,
  Shares: TrendingUp,
  Impressions: Eye,
  Bookings: TrendingUp,
  ROI: TrendingUp,
  Months: Calendar,
  Screenings: Eye,
  Rating: Award,
  Completion: TrendingUp,
  Signups: TrendingUp,
  Clips: Eye,
  Features: Award,
};

// Placeholder project data
const PROJECTS: Record<string, {
  slug: string; title: string; titleAr: string; brief: string;
  category: string; client: string; year: number;
  thumbnailUrl: string; challenge: string; strategy?: string; approach: string; result: string;
  videoUrl?: string;
  metrics: { label: string; value: number; suffix: string }[];
  gallery: string[];
}> = {
  "luxury-automotive-brand-film": {
    slug: "luxury-automotive-brand-film",
    title: "Luxury Automotive Brand Film – Driven by Precision",
    titleAr: "فيلم علامة السيارات الفاخرة – مدفوع بالدقة",
    brief: "A cinematic brand film capturing the fusion of engineering excellence and emotional storytelling for a premium automotive launch in the UAE.",
    category: "COMMERCIAL",
    client: "Prestige Motors UAE",
    year: 2025,
    thumbnailUrl: "/images/placeholder-thumb-1.jpg",
    challenge: "Prestige Motors UAE was launching a new flagship model and needed a brand film that went beyond typical car commercials. The goal was to evoke emotion, portray craftsmanship, and position the brand as a symbol of modern luxury in the Middle East market. The film needed to appeal to both Emirati and international audiences while maintaining a cinematic, non-salesy tone.",
    strategy: "We developed a concept rooted in the idea of \"Precision in Motion\" — drawing parallels between the engineering of the vehicle and the artistry of filmmaking itself. The visual narrative follows a single day from dawn to night across iconic UAE landscapes, with the car as the silent protagonist.",
    approach: "Shot over 12 days across Dubai, Abu Dhabi, and the Liwa Desert using RED V-Raptor cameras, FPV drone rigs, and a custom car-mount stabilizer system. The team included a director, 2 cinematographers, a Steadicam operator, a drone pilot, a sound designer, and a 15-person production crew. Post-production included color grading with a Hollywood colorist, original score composition, and cinematic sound design.",
    result: "The film premiered at a private launch event for 400 VIP guests and was distributed across YouTube, Instagram, LinkedIn, and in-showroom displays. It generated 4.2 million views across platforms in the first month, increased test-drive bookings by 38%, and was awarded \"Best Branded Film\" at the Gulf Media Awards.",
    videoUrl: "/videos/showreel.mp4",
    metrics: [
      { label: "Views", value: 4200000, suffix: "M" },
      { label: "Engagement", value: 38, suffix: "%" },
      { label: "Awards", value: 3, suffix: "" },
      { label: "Shoot Days", value: 12, suffix: "" },
    ],
    gallery: ["/images/placeholder-thumb-1.jpg", "/images/placeholder-thumb-2.jpg", "/images/placeholder-thumb-3.jpg", "/images/placeholder-thumb-1.jpg"],
  },
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

const PROJECT_ORDER = [
  "luxury-automotive-brand-film",
  "emirates-brand-film",
  "dubai-expo-highlights",
  "luxury-auto-commercial",
  "heritage-documentary",
  "fintech-product-launch",
  "fashion-week-coverage",
];

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
    openGraph: {
      images: [project.thumbnailUrl],
    },
  };
}

function getNextProject(currentSlug: string) {
  const idx = PROJECT_ORDER.indexOf(currentSlug);
  const nextIdx = (idx + 1) % PROJECT_ORDER.length;
  return PROJECTS[PROJECT_ORDER[nextIdx]];
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const project = PROJECTS[slug];
  if (!project) notFound();

  const t = await getTranslations("case_study");
  const pt = await getTranslations("portfolio");
  const nextProject = getNextProject(slug);

  return (
    <article>
      {/* Hero */}
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="video-overlay-deep absolute inset-0" />
        </div>
        <Container className="relative z-10 pb-20 pt-40">
          <ScrollReveal>
            <Button variant="ghost" href="/portfolio" className="mb-8 gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Button>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold">
                {pt(`categories.${project.category}`)}
              </p>
              <span className="h-1 w-1 rounded-full bg-gold/50" />
              <p className="text-sm text-foreground-muted">{project.year}</p>
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl xl:text-7xl">
              {locale === "ar" ? project.titleAr : project.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-foreground-muted">{project.brief}</p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Overview bar */}
      <section className="border-b border-border bg-background-secondary py-8">
        <Container>
          <ScrollReveal>
            <div className="grid gap-8 md:grid-cols-4">
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
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-foreground-muted">{t("overview")}</p>
                <p className="font-semibold text-gold">{project.metrics.length} {t("key_metrics")}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Video Preview */}
      {project.videoUrl && (
        <section className="py-20">
          <Container>
            <ScrollReveal variant="scale">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-background-tertiary">
                <video
                  controls
                  playsInline
                  poster={project.thumbnailUrl}
                  preload="metadata"
                  className="h-full w-full object-cover"
                >
                  <source src={project.videoUrl} type="video/mp4" />
                </video>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Challenge */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="grid items-center gap-16 md:grid-cols-2">
              <div>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("challenge")}</p>
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">The Brief</h2>
                <p className="text-lg leading-relaxed text-foreground-muted">{project.challenge}</p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={project.gallery[0]}
                  alt="Challenge"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Strategy (if present) */}
      {project.strategy && (
        <section className="bg-background-secondary py-20">
          <Container>
            <ScrollReveal>
              <div className="grid items-center gap-16 md:grid-cols-2">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
                  <Image
                    src={project.gallery[1] || project.gallery[0]}
                    alt="Strategy"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="50vw"
                  />
                </div>
                <div className="md:order-2">
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("strategy")}</p>
                  <h2 className="mb-6 text-2xl font-bold md:text-3xl">Creative Direction</h2>
                  <p className="text-lg leading-relaxed text-foreground-muted">{project.strategy}</p>
                </div>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      )}

      {/* Approach / Execution */}
      <section className={project.strategy ? "py-20" : "bg-background-secondary py-20"}>
        <Container>
          <ScrollReveal>
            <div className="grid items-center gap-16 md:grid-cols-2">
              {!project.strategy && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:order-1">
                  <Image
                    src={project.gallery[1] || project.gallery[0]}
                    alt="Approach"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="50vw"
                  />
                </div>
              )}
              <div className={project.strategy ? "" : "md:order-2"}>
                <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("approach")}</p>
                <h2 className="mb-6 text-2xl font-bold md:text-3xl">Execution</h2>
                <p className="text-lg leading-relaxed text-foreground-muted">{project.approach}</p>
              </div>
              {project.strategy && (
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={project.gallery[2] || project.gallery[0]}
                    alt="Execution"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="50vw"
                  />
                </div>
              )}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-10 text-center text-sm font-medium uppercase tracking-[0.25em] text-gold">
              {t("gallery")}
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((img, i) => (
                <div
                  key={i}
                  className={`group relative overflow-hidden rounded-xl ${i === 0 && project.gallery.length > 3 ? "sm:col-span-2 sm:row-span-2" : ""}`}
                >
                  <div className={`relative ${i === 0 && project.gallery.length > 3 ? "aspect-square" : "aspect-video"} w-full`}>
                    <Image
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes={i === 0 && project.gallery.length > 3 ? "66vw" : "33vw"}
                    />
                    <div className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/20" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Result */}
      <section className="bg-background-secondary py-20">
        <Container>
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-gold">{t("result")}</p>
              <h2 className="mb-6 text-2xl font-bold md:text-3xl">The Outcome</h2>
              <p className="text-lg leading-relaxed text-foreground-muted">{project.result}</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Impact Metrics */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <p className="mb-12 text-center text-sm font-medium uppercase tracking-[0.25em] text-gold">
              {t("impact")}
            </p>
            <div className={`grid gap-8 ${project.metrics.length === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"}`}>
              {project.metrics.map((metric, index) => {
                const Icon = METRIC_ICONS[metric.label];
                return (
                  <ScrollReveal key={metric.label} delay={index * 0.1}>
                    <div className="text-center">
                      {Icon && (
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                          <Icon className="h-5 w-5" />
                        </div>
                      )}
                      <div className="mb-2 text-3xl font-bold text-gold md:text-5xl">
                        <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                      </div>
                      <p className="text-sm text-foreground-muted">{metric.label}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Gold divider */}
      <div className="gold-divider mx-auto max-w-7xl" />

      {/* CTA + Next Project */}
      <section className="py-20">
        <Container>
          <div className="grid gap-16 md:grid-cols-2">
            {/* Start a project CTA */}
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-background-secondary p-10">
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-gold">
                  {t("start_project")}
                </p>
                <h3 className="mb-4 text-2xl font-bold">{t("cta_title")}</h3>
                <p className="mb-6 text-foreground-muted">{t("cta_description")}</p>
                <Button variant="gold" href="/contact">
                  {t("cta_button")}
                </Button>
              </div>
            </ScrollReveal>

            {/* Next Project */}
            <ScrollReveal delay={0.1}>
              <a
                href={`/portfolio/${nextProject.slug}`}
                className="group block rounded-2xl border border-border bg-background-secondary p-10 transition-all hover:border-gold/30"
              >
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-foreground-muted">
                  {t("next_project")}
                </p>
                <h3 className="mb-4 text-2xl font-bold transition-colors group-hover:text-gold">
                  {locale === "ar" ? nextProject.titleAr : nextProject.title}
                </h3>
                <p className="mb-6 text-foreground-muted">{nextProject.brief}</p>
                <span className="inline-flex items-center gap-2 text-gold">
                  {t("view_project")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </article>
  );
}
