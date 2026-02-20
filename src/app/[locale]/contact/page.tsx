import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

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
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="rounded-2xl border border-border bg-background-secondary p-8">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
