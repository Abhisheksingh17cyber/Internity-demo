import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tagline?: string;
  title: string;
  description?: string;
  align?: "center" | "start";
  className?: string;
}

export function SectionHeading({
  tagline,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {tagline && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-gold">
          {tagline}
        </p>
      )}
      <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-base text-foreground-muted md:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
