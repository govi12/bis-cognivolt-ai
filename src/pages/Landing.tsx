import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";
import logo from "@/assets/logo.svg";
import {
  Shield,
  BookOpen,
  Calculator,
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "AI-Powered Q&A",
    description:
      "Ask anything about BIS certification, ISI marks, CRS registration, or FMCS — get instant, accurate answers grounded in verified reference data.",
  },
  {
    icon: BookOpen,
    title: "IS Code Explorer",
    description:
      "Browse 150+ Indian Standards organized by category. Quickly find which certification scheme applies to your product and which IS standard governs it.",
  },
  {
    icon: CheckCircle2,
    title: "Step-by-Step Checklists",
    description:
      "Follow clear checklists for ISI, CRS, FMCS, and Hallmarking — so you never miss a step in the certification process.",
  },
  {
    icon: Calculator,
    title: "Fee Calculator",
    description:
      "Estimate your BIS marking fees with MSME concessions. Plan your certification budget before you apply.",
  },
];

const STATS = [
  { value: "300+", label: "Product Categories" },
  { value: "150+", label: "Standards Referenced" },
  { value: "100%", label: "BIS-Focused" },
  { value: "24/7", label: "Always Available" },
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

  return (
    <div className="glass-bg min-h-screen relative">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 left-[15%] w-72 h-72 rounded-full bg-[oklch(0.82_0.08_260)] opacity-40 blur-[80px] animate-float-slow" />
        <div className="absolute top-[40%] right-[10%] w-64 h-64 rounded-full bg-[oklch(0.85_0.06_220)] opacity-35 blur-[70px] animate-float-medium" />
        <div className="absolute bottom-20 left-[30%] w-80 h-80 rounded-full bg-[oklch(0.83_0.07_240)] opacity-30 blur-[90px] animate-pulse-glow" />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5"
      >
        <div className="flex items-center gap-3">
          <div className="glass-panel rounded-xl p-2">
            <img src={logo} alt="Cognivolt AI" className="w-8 h-8" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Cognivolt AI
          </span>
        </div>
        <button
          onClick={handleCTA}
          className="glass-panel rounded-full px-5 py-2 text-sm font-medium text-foreground hover:bg-white/70 transition-all duration-200 cursor-pointer"
        >
          {isAuthenticated ? "Dashboard" : "Get Started"}
        </button>
      </motion.nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center max-w-3xl"
        >
          {/* Badge */}
          <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">
              Built for Smart India Hackathon 2026
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
            Your Guide to
            <br />
            <span className="bg-gradient-to-r from-primary via-[oklch(0.5_0.15_280)] to-[oklch(0.5_0.12_220)] bg-clip-text text-transparent">
              BIS Certification
            </span>
          </h1>

          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Understand ISI marks, CRS registration, FMCS, and Indian Standards
            with an AI assistant built specifically for BIS compliance — powered
            by verified reference data, not generic AI guesses.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCTA}
              className="group flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.5_0.15_280)] px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 cursor-pointer"
            >
              <Shield className="w-5 h-5" />
              Start Exploring
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="glass-panel rounded-2xl px-8 py-3.5 text-base font-semibold text-foreground hover:bg-white/70 transition-all duration-200 cursor-pointer"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-panel rounded-2xl mt-16 px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl w-full"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div id="features" className="relative z-10 px-6 lg:px-12 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Everything you need for BIS compliance
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            From first-time certification questions to ongoing compliance —
            Cognivolt AI has you covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/10">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="relative z-10 px-6 lg:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-10 lg:p-14 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            Ready to simplify BIS compliance?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
            Join the teams already using Cognivolt AI to navigate Indian
            Standards and certification requirements.
          </p>
          <button
            onClick={handleCTA}
            className="mt-8 group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-[oklch(0.5_0.15_280)] px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-200 cursor-pointer"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-6 lg:px-12 pb-8">
        <div className="glass-panel rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Cognivolt" className="w-5 h-5" />
            <span className="text-sm font-medium text-foreground">
              Cognivolt AI
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Built for Smart India Hackathon 2026 — Team Cognivolt. Not an
            official BIS tool.
          </p>
          <a
            href="https://bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
          >
            bis.gov.in ↗
          </a>
        </div>
      </div>
    </div>
  );
}
