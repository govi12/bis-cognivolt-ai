import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  X,
  FolderOpen,
  LayoutGrid,
  ArrowUpRight,
} from "lucide-react";
import {
  CATALOG,
  CATALOG_CATEGORIES,
  SCHEME_LABELS,
  type CatalogItem,
} from "@/lib/catalog";

export const SCHEME_BADGE_CLASS: Record<CatalogItem["scheme"], string> = {
  ISI: "badge-isi",
  CRS: "badge-crs",
  FMCS: "badge-fmcs",
  Hallmarking: "badge-hallmarking",
  "ISI/CRS": "badge-neutral-scheme",
  "Voluntary/ISI": "badge-neutral-scheme",
  "CDSCO + CRS": "badge-neutral-scheme",
};

function SchemeBadge({ scheme }: { scheme: CatalogItem["scheme"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${SCHEME_BADGE_CLASS[scheme]}`}
    >
      {SCHEME_LABELS[scheme]}
    </span>
  );
}

export function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      to={`/catalog/${item.slug}`}
      className="glass-card group relative flex flex-col rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-start justify-between gap-3">
        <SchemeBadge scheme={item.scheme} />
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
            item.mandatory
              ? "bg-destructive/15 text-red-300"
              : "bg-muted/60 text-muted-foreground"
          }`}
        >
          {item.mandatory ? "Mandatory" : "Voluntary"}
        </span>
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
        {item.name}
      </h3>
      <p className="mt-1 font-mono text-xs text-accent">{item.standard}</p>
      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
        {item.summary}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="text-[11px] text-muted-foreground">
          {item.category}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Details
          <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}

export default function CatalogBrowser({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [scheme, setScheme] = useState<string>("All");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const schemes = useMemo(
    () => ["All", ...Array.from(new Set(CATALOG.map((c) => c.scheme)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATALOG.filter((item) => {
      if (scheme !== "All" && item.scheme !== scheme) return false;
      if (activeCategory && item.category !== activeCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.standard.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tests.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, scheme, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of filtered) {
      counts.set(item.category, (counts.get(item.category) ?? 0) + 1);
    }
    return counts;
  }, [filtered]);

  const hasFilters = query.trim() !== "" || scheme !== "All";

  return (
    <div>
      {/* Search + scheme filter */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search standards, products, or tests — try “helmet” or “IS 4151”"
            className="glass-input w-full rounded-xl py-2.5 pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {schemes.map((s) => (
            <button
              key={s}
              onClick={() => setScheme(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                scheme === s
                  ? "bg-primary text-primary-foreground"
                  : "glass-input text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "All" ? "All schemes" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Category tiles */}
      {!activeCategory && (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATALOG_CATEGORIES.map((category) => {
            const count =
              category === activeCategory ? undefined : categoryCounts.get(category) ?? 0;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                disabled={count === 0}
                className="glass-card group rounded-2xl p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-default cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 border border-primary/20">
                    <FolderOpen className="h-4 w-4 text-primary" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {category}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {count} item{count === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Breadcrumb back to categories */}
      {activeCategory && (
        <button
          onClick={() => setActiveCategory(null)}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
        >
          <FolderOpen className="h-4 w-4" />
          {activeCategory}
          <X className="h-3.5 w-3.5" />
          <span className="text-muted-foreground">back to all categories</span>
        </button>
      )}

      {/* Results */}
      <div className={compact ? "mt-6" : "mt-6"}>
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutGrid className="h-4 w-4" />
            {filtered.length} standard{filtered.length === 1 ? "" : "s"}
            {activeCategory ? ` in ${activeCategory}` : ""}
            {hasFilters ? " matching your filters" : ""}
          </p>
          {hasFilters && (
            <button
              onClick={() => {
                setQuery("");
                setScheme("All");
                setActiveCategory(null);
              }}
              className="text-xs font-medium text-primary hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center">
            <p className="text-sm font-medium text-foreground">
              No standards match your search.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try a broader term, or use BIS’s official “Know Your Standard”
              tool on bis.gov.in.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <CatalogCard key={item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
