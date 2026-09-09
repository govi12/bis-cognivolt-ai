import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CheckCircle2, FlaskConical } from "lucide-react";
import { CATALOG } from "@/lib/catalog";
import { SCHEME_BADGE_CLASS } from "@/components/CatalogBrowser";
import { SCHEME_LABELS, type CatalogItem } from "@/lib/catalog";

export default function CatalogItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = CATALOG.find((c) => c.slug === slug);

  if (!item) {
    return (
      <div className="glass-bg flex min-h-screen items-center justify-center px-6">
        <div className="glass-card max-w-md rounded-2xl p-8 text-center">
          <h1 className="text-lg font-semibold text-foreground">
            Standard not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn’t find a catalog entry for “{slug}”.
          </p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse the catalog
          </Link>
        </div>
      </div>
    );
  }

  const related = CATALOG.filter(
    (c) => c.slug !== item.slug && c.category === item.category,
  ).slice(0, 3);

  return (
    <ItemPage item={item} related={related} />
  );
}

function ItemPage({
  item,
  related,
}: {
  item: CatalogItem;
  related: CatalogItem[];
}) {
  return (
    <div className="glass-bg min-h-screen relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-16 right-[15%] h-56 w-56 rounded-full bg-[oklch(0.7_0.17_65)] opacity-25 blur-[90px] animate-float-slow" />
        <div className="absolute bottom-24 left-[10%] h-64 w-64 rounded-full bg-[oklch(0.6_0.17_300)] opacity-20 blur-[90px] animate-float-medium" />
      </div>

      {/* Top bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-12">
        <Link
          to="/catalog"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All standards
        </Link>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${SCHEME_BADGE_CLASS[item.scheme]}`}
        >
          {SCHEME_LABELS[item.scheme]}
        </span>
      </nav>

      <main className="relative z-10 mx-auto max-w-4xl px-4 pb-24 lg:px-8">
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* Header */}
          <header className="glass-card rounded-3xl p-7 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              {item.category}
            </p>
            <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-foreground lg:text-3xl">
              {item.name}
            </h1>
            <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5 font-mono text-sm font-medium text-accent">
              <BookOpen className="h-4 w-4" />
              {item.standard}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
              {item.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.mandatory
                    ? "bg-destructive/15 text-red-300"
                    : "bg-muted/60 text-muted-foreground"
                }`}
              >
                {item.mandatory
                  ? "Mandatory certification"
                  : "Voluntary certification"}
              </span>
              <span className="rounded-full bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                Scheme: {SCHEME_LABELS[item.scheme]}
              </span>
            </div>
          </header>

          {/* Tests */}
          <section className="glass-card mt-6 rounded-3xl p-7 lg:p-8">
            <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <FlaskConical className="h-5 w-5 text-primary" />
              Key tests & checks
            </h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {item.tests.map((test) => (
                <li
                  key={test}
                  className="flex items-start gap-2.5 rounded-xl bg-muted/30 px-4 py-3 text-sm text-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  {test}
                </li>
              ))}
            </ul>
          </section>

          {/* How to get certified */}
          <section className="glass-card mt-6 rounded-3xl p-7 lg:p-8">
            <h2 className="text-base font-semibold text-foreground">
              How to get certified
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.entry}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/dashboard?q=${encodeURIComponent(`What is the certification process for ${item.name} (${item.standard})?`)}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-[oklch(0.72_0.19_340)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
              >
                Ask the assistant about this
              </Link>
              <a
                href="https://bis.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-input inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                Official source ↗
              </a>
            </div>
          </section>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                More in {item.category}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/catalog/${r.slug}`}
                    className="glass-card group rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <p className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      {r.name}
                    </p>
                    <p className="mt-1.5 font-mono text-xs text-accent">
                      {r.standard}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </motion.div>
      </main>
    </div>
  );
}
