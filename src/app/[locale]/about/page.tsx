import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("meta_title") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

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
          <ScrollReveal>
            <div className="mx-auto max-w-3xl space-y-8 text-center">
              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { number: "8+", label: "Years of Experience" },
                  { number: "200+", label: "Projects Delivered" },
                  { number: "50+", label: "Happy Clients" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-border bg-background-secondary p-8">
                    <p className="mb-2 text-3xl font-bold text-gold">{stat.number}</p>
                    <p className="text-sm text-foreground-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="text-lg leading-relaxed text-foreground-muted">
                Based in Dubai Media City, Internity is a team of passionate filmmakers, directors,
                cinematographers, and post-production specialists who share a common vision: to create
                video content that moves audiences and delivers measurable results for brands.
              </p>

              <p className="text-lg leading-relaxed text-foreground-muted">
                From corporate films and commercial campaigns to documentaries and social content,
                we bring a cinematic approach to every project, regardless of scale. Our work has been
                recognized at international film festivals and has helped our clients achieve
                significant brand growth across the UAE and beyond.
              </p>

              <Button variant="gold" href="/contact" size="lg">
                Start a Project
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
