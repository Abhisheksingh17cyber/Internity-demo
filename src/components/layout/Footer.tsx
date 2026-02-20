import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { Instagram, Youtube, Linkedin, Play } from "lucide-react";

export function Footer() {
  const t = useTranslations();

  const socialLinks = [
    { icon: Instagram, href: "#", label: t("footer.social.instagram") },
    { icon: Youtube, href: "#", label: t("footer.social.youtube") },
    { icon: Linkedin, href: "#", label: t("footer.social.linkedin") },
    { icon: Play, href: "#", label: t("footer.social.vimeo") },
  ];

  return (
    <footer className="border-t border-border bg-background-secondary">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo className="mb-4" />
            <p className="text-sm leading-relaxed text-foreground-muted">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.quick_links")}
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-gold"
                  >
                    {t(`common.nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.services")}
            </h3>
            <ul className="space-y-3">
              {["corporate", "commercial", "documentary", "event", "animation", "social"].map(
                (service) => (
                  <li key={service}>
                    <span className="text-sm text-foreground-muted">
                      {t(`home.services.${service}.title`)}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.contact_info")}
            </h3>
            <div className="mb-6 space-y-3 text-sm text-foreground-muted">
              <p>{t("contact.info.email")}</p>
              <p dir="ltr" className="text-start">{t("contact.info.phone")}</p>
              <p>{t("contact.info.address").split("\n")[0]}</p>
            </div>

            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("footer.follow_us")}
            </h3>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-gold hover:text-gold"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-foreground-muted">
          {t("footer.copyright")}
        </div>
      </Container>
    </footer>
  );
}
