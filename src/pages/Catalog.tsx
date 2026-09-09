import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CatalogBrowser from "@/components/CatalogBrowser";
import logo from "@/assets/logo.svg";

export default function Catalog() {
  return (
    <div className="glass-bg min-h-screen relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-10 right-[12%] h-64 w-64 rounded-full bg-[oklch(0.7_0.17_65)] opacity-25 blur-[90px] animate-float-slow" />
        <div className="absolute bottom-16 left-[8%] h-72 w-72 rounded-full bg-[oklch(0.6_0.17_300)] opacity-25 blur-[90px] animate-float-medium" />
      </div>

      {/* Top bar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 lg:px-12">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="BIS Cognivolt AI" className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            BIS Cognivolt AI
          </span>
        </Link>
      </nav>

      {/* Header */}
      <header className="relative z-10 px-6 pb-10 pt-8 text-center lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Standards <span className="text-gradient-brand">Catalog</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            Every product category we track, the Indian Standard that governs
            it, and the BIS scheme that applies. Search by product, standard
            number, or test — then open an item for the full picture.
          </p>
        </motion.div>
      </header>

      {/* Browser */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 lg:px-8">
        <CatalogBrowser />
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 pb-8 text-center">
        <p className="text-xs text-muted-foreground">
          Built for Smart India Hackathon 2026 — Team Cognivolt. Not an
          official BIS tool; always confirm requirements on{" "}
          <a
            href="https://bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            bis.gov.in
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
