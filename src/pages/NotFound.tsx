import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="glass-bg min-h-screen relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[20%] left-[20%] h-64 w-64 rounded-full bg-[oklch(0.7_0.17_65)] opacity-25 blur-[90px] animate-float-slow" />
        <div className="absolute bottom-[20%] right-[15%] h-56 w-56 rounded-full bg-[oklch(0.6_0.17_300)] opacity-20 blur-[80px] animate-float-medium" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-gradient-brand text-7xl font-bold">404</p>
        <h1 className="mt-4 text-xl font-semibold text-foreground">
          This page isn’t on our standards list
        </h1>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          The page you’re looking for doesn’t exist — but our catalog and
          assistant do.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            to="/catalog"
            className="glass-input inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            Browse the catalog
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
