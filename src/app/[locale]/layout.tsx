import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} lang={locale} className={isRTL ? "font-arabic" : "font-sans"}>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}
