import { useTranslations } from "next-intl";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("contact.info");

  const items = [
    { icon: MapPin, label: t("address_label"), value: t("address") },
    { icon: Mail, label: t("email_label"), value: t("email") },
    { icon: Phone, label: t("phone_label"), value: t("phone"), dir: "ltr" as const },
    { icon: Clock, label: t("hours_label"), value: t("hours") },
  ];

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold">{t("title")}</h3>
      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.label} className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
              <item.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="mb-0.5 text-sm font-medium text-foreground-muted">{item.label}</p>
              <p className="text-sm whitespace-pre-line" dir={item.dir}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
