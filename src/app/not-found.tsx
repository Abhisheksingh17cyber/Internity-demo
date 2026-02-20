import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-gold">
          404
        </p>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Lost in the Edit
        </h1>
        <p className="mb-8 text-foreground-muted">
          The scene you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-gold-light"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
