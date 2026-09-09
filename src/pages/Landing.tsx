import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import { CatalogCard } from "@/components/CatalogBrowser";
import { CATALOG } from "@/lib/catalog";
import {
  MessageCircle,
  BookOpen,
  ShieldCheck,
  Route,
  Gem,
  FlaskConical,
  Languages,
  ArrowRight,
  Sparkles,
  BadgeCheck,
  Globe2,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Answers on Indian Standards",
    description:
      "Ask anything about BIS certification, the ISI mark, CRS registration or FMCS — and get clear, well-explained answers grounded in curated reference data.",
    tint: "from-[oklch(0.76_0.17_65/0.25)] to-[oklch(0.72_0.19_340/0.15)]",
    iconColor: "text-[oklch(0.85_0.14_75)]",
  },
  {
    icon: BookOpen,
    title: "Standards catalog",
    description:
      "Browse a growing catalog of Indian Standards by product, scheme or standard number — every entry shows the tests involved and how to get certified.",
    tint: "from-[oklch(0.78_0.14_197/0.22)] to-[oklch(0.66_0.16_295/0.15)]",
    iconColor: "text-[oklch(0.82_0.12_197)]",
  },
  {
    icon: ShieldCheck,
    title: "Certification scheme guidance",
    description:
      "Not sure whether your product needs the ISI mark, CRS registration or FMCS? Describe what you make or import and get a straight recommendation.",
    tint: "from-[oklch(0.68_0.17_140/0.22)] to-[oklch(0.78_0.14_197/0.12)]",
    iconColor: "text-[oklch(0.78_0.15_150)]",
  },
  {
    icon: Route,
    title: "Process walkthroughs",
    description:
      "Step-by-step checklists for ISI, CRS, FMCS and hallmarking — documents, fees, factory inspections and surveillance, so nothing catches you by surprise.",
    tint: "from-[oklch(0.66_0.16_295/0.22)] to-[oklch(0.72_0.19_340/0.12)]",
    iconColor: "text-[oklch(0.78_0.13_295)]",
  },
  {
    icon: Gem,
    title: "Hallmarking help",
    description:
      "Understand the BIS mark, purity grades and the 6-digit HUID code on gold and silver — and how to verify jewellery in the BIS CARE app.",
    tint: "from-[oklch(0.72_0.19_340/0.22)] to-[oklch(0.76_0.17_65/0.12)]",
    iconColor: "text-[oklch(0.8_0.15_340)]",
  },
  {
    icon: FlaskConical,
    title: "Testing lab pointers",
    description:
      "Product testing must happen at BIS-recognized labs. We point you to the right place to find one, and explain what a valid test report looks like.",
    tint: "from-[oklch(0.76_0.17_65/0.18)] to-[oklch(0.68_0.17_140/0.14)]",
    iconColor: "text-[oklch(0.85_0.14_75)]",
  },
];

const SCHEMES = [
  {
    name: "ISI Mark",
    detail: "Scheme-I · factory-audited licence for industrial & consumer goods",
    badgeClass: "badge-isi",
  },
  {
    name: "CRS",
    detail: "Compulsory Registration Scheme · self-declaration for electronics & IT",
    badgeClass: "badge-crs",
  },
  {
    name: "FMCS",
    detail: "Foreign Manufacturers Certification · for products imported into India",
    badgeClass: "badge-fmcs",
  },
  {
    name: "Hallmarking",
    detail: "Purity certification for gold & silver jewellery, with HUID traceability",
    badgeClass: "badge-hallmarking",
  },
];

const FEATURED_SLUGS = [
  "two-wheeler-helmets",
  "gold-hallmarking",
  "led-lamps-self-ballasted",
  "lpg-cylinders-above-5l",
  "opc-cement",
  "packaged-drinking-water",
];

const STATS = [
  { value: "300+", label: "Product categories under QCOs" },
  { value: "50+", label: "Standards in our catalog" },
  { value: "4", label: "Certification schemes covered" },
  { value: "10+", label: "Indian languages supported" },
];

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth?returnTo=/dashboard");
    }
  };

  const featured = FEATURED_SLUGS.map(
    (slug) => CATALOG.find((item) => item.slug === slug)!,
  ).filter(Boolean);

  return (
    <div className="glass-bg relative min-h-screen">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[15%] top-20 h-72 w-72 rounded-full bg-[oklch(0.7_0.17_65)] opacity-30 blur-[100px] animate-float-slow" />
        <div className="absolute right-[8%] top-[38%] h-64 w-64 rounded-full bg-[oklch(0.6_0.17_300)] opacity-25 blur-[90px] animate-float-medium" />
        <div className="absolute bottom-24 left-[30%] h-80 w-80 rounded-full bg-[oklch(0.72_0.19_340)] opacity-20 blur-[110px] animate-pulse-glow" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-12"
      >
        <div className="flex items-center gap-3">
          <div className="glass-panel rounded-xl p-2">
            <img src={logo} alt="BIS Cognivolt AI" className="h-8 w-8" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            BIS Cognivolt AI
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/catalog"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
          >
            Standards Catalog
          </Link>
          <button
            onClick={handleCTA}
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/35 cursor-pointer"
          >
            {isAuthenticated ? "Open Dashboard" : "Get Started"}
          </button>
        </div>
      </motion.nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-20 pt-16 lg:pb-28 lg:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl text-center"
        >
          <div className="glass-panel mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              Built for Smart India Hackathon 2026
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
            India’s standards,
            <br />
            <span className="text-gradient-brand">explained in plain language.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:text-xl">
            BIS Cognivolt AI is an intelligent assistant for the Bureau of
            Indian Standards. Ask questions in Hindi, Tamil, Telugu or English,
            find the standard that applies to your product, and walk through
            certification one clear step at a time.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.17_65)] via-[oklch(0.78_0.15_45)] to-[oklch(0.72_0.19_340)] px-8 py-3.5 text-base font-semibold text-[oklch(0.2_0.05_274)] shadow-xl shadow-primary/25 transition-all duration-200 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer"
            >
              <MessageCircle className="h-5 w-5" />
              Ask the Assistant
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/catalog"
                className="glass-panel flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-primary/40 cursor-pointer"
              >
                <BookOpen className="h-5 w-5 text-accent" />
                Browse Standards
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel mt-16 grid w-full max-w-3xl grid-cols-2 gap-8 rounded-2xl px-8 py-6 md:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-gradient-brand text-2xl font-bold lg:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Capabilities */}
      <div id="features" className="relative z-10 px-6 pb-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
            One assistant, every BIS question
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From “which standard applies to my product?” to “how do I read a
            hallmark?” — Cognivolt is built to cover the full certification
            journey.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br ${feature.tint}`}
              >
                <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Schemes strip */}
      <div className="relative z-10 px-6 pb-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
              Know your scheme before you apply
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Four certification routes, each with its own process. Pick the
              wrong one and you waste months — the assistant and the catalog
              both tell you which route fits.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SCHEMES.map((scheme, i) => (
              <motion.div
                key={scheme.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="glass-card rounded-2xl p-5"
              >
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide ${scheme.badgeClass}`}
                >
                  {scheme.name}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {scheme.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Catalog preview */}
      <div className="relative z-10 px-6 pb-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-5xl"
        >
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-foreground lg:text-3xl">
                Popular standards
              </h2>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                A taste of the catalog — search the full library by product,
                standard number or test on the Standards Catalog page.
              </p>
            </div>
            <Link
              to="/catalog"
              className="group inline-flex flex-shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-opacity hover:opacity-90"
            >
              Open the catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((item, i) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              >
                <CatalogCard item={item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Multilingual callout */}
      <div className="relative z-10 px-6 pb-24 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card mx-auto max-w-4xl overflow-hidden rounded-3xl p-8 lg:p-12"
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[oklch(0.78_0.14_197/0.3)] to-[oklch(0.66_0.16_295/0.2)] border border-white/10">
              <Languages className="h-9 w-9 text-[oklch(0.82_0.12_197)]" />
            </div>
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-foreground">
                Ask in your language
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground lg:text-base">
                Standards shouldn’t be locked behind English. Ask your question
                in Hindi, Bengali, Tamil, Telugu, Marathi, Kannada or any other
                Indian language, and Cognivolt answers in the same language —
                translating the underlying standard faithfully.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 px-6 pb-20 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card mx-auto max-w-3xl rounded-3xl p-10 text-center lg:p-14"
        >
          <BadgeCheck className="mx-auto h-10 w-10 text-primary" />
          <h2 className="mt-4 text-2xl font-bold text-foreground lg:text-3xl">
            Ready to make compliance the easy part?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Sign in, ask your first question, and get a certification roadmap
            in under a minute — free, and built for the Smart India Hackathon.
          </p>
          <button
            onClick={handleCTA}
            className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[oklch(0.78_0.17_65)] via-[oklch(0.78_0.15_45)] to-[oklch(0.72_0.19_340)] px-8 py-3.5 text-base font-semibold text-[oklch(0.2_0.05_274)] shadow-xl shadow-primary/25 transition-all duration-200 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer"
          >
            {isAuthenticated ? "Go to Dashboard" : "Start asking — it’s free"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5" />
            No credit card. Works in every major Indian language.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 pb-8 lg:px-12">
        <div className="glass-panel mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BIS Cognivolt AI" className="h-5 w-5" />
            <span className="text-sm font-medium text-foreground">
              BIS Cognivolt AI
            </span>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Built for Smart India Hackathon 2026 — Team Cognivolt. Not an
            official BIS tool.
          </p>
          <Link
            to="/catalog"
            className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
          >
            Standards Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
