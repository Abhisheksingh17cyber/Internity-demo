"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground-muted transition-colors hover:border-gold hover:text-gold"
      aria-label="Switch language"
    >
      <span className={locale === "en" ? "text-gold" : ""}>EN</span>
      <span className="text-border">|</span>
      <span className={locale === "ar" ? "text-gold" : ""}>عربي</span>
    </button>
  );
}
