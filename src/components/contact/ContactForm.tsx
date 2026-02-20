"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations, useLocale } from "next-intl";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { locale: locale as "en" | "ar" },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-border bg-background-secondary px-4 py-3 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";
  const errorClasses = "mt-1 text-xs text-red-400";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gold/20 bg-background-secondary p-12 text-center">
        <CheckCircle className="mb-4 h-12 w-12 text-gold" />
        <p className="text-lg font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {t("error")}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
          <input {...register("name")} placeholder={t("name_placeholder")} className={inputClasses} />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
          <input {...register("email")} type="email" placeholder={t("email_placeholder")} className={inputClasses} />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
          <input {...register("phone")} type="tel" placeholder={t("phone_placeholder")} dir="ltr" className={inputClasses} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("company")}</label>
          <input {...register("company")} placeholder={t("company_placeholder")} className={inputClasses} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("service")}</label>
          <select {...register("service")} className={inputClasses}>
            <option value="">{t("service_placeholder")}</option>
            {["corporate", "commercial", "documentary", "event", "animation", "social"].map((s) => (
              <option key={s} value={s}>{t(`service_options.${s}`)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">{t("budget")}</label>
          <select {...register("budget")} className={inputClasses}>
            <option value="">{t("budget_placeholder")}</option>
            {["small", "medium", "large", "enterprise"].map((b) => (
              <option key={b} value={b}>{t(`budget_options.${b}`)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t("message_placeholder")}
          className={inputClasses}
        />
        {errors.message && <p className={errorClasses}>{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="gold" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
