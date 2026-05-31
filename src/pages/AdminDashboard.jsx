import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, FileText, FolderKanban, LogOut, RotateCcw, Save, Trash2, XCircle, Pencil, PlusCircle, ImagePlus, Link2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { defaultPortfolioData } from "../data/portfolioDefaults";
import { getProjectLink } from "../utils/caseStudy";
import TextContentPanel from "./admin/TextContentPanel";
import StatsPanel from "./admin/StatsPanel";
import AboutManagerPanel from "./admin/AboutManagerPanel";
import SkillsManagerPanel from "./admin/SkillsManagerPanel";
import ProjectsManagerPanel from "./admin/ProjectsManagerPanel";

function SafePanel({ children, fallback = "This panel failed to load." }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
        <p className="font-semibold">Panel error</p>
        <p className="mt-1">{fallback}</p>
        <button
          type="button"
          onClick={() => setError(null)}
          className="mt-3 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
        >
          Retry
        </button>
      </div>
    );
  }

  try {
    return children;
  } catch (renderError) {
    console.error("[AdminDashboard] Panel render error:", renderError);
    setError(renderError);
    return null;
  }
}

const TABS = [
  { id: "text", label: "Text Content", icon: FileText, color: "from-emerald-500 to-teal-500" },
  { id: "stats", label: "Stats", icon: BarChart3, color: "from-cyan-500 to-blue-500" },
  { id: "about", label: "About", icon: FileText, color: "from-violet-500 to-purple-500" },
  { id: "skills", label: "Skills", icon: BarChart3, color: "from-amber-500 to-orange-500" },
  { id: "projects", label: "Projects", icon: FolderKanban, color: "from-rose-500 to-pink-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { portfolioData, storageStatus, isLoading, resetPortfolioData, logoutAdmin, exportPortfolio, importPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState("text");
  const [status, setStatus] = useState("");
  const importInputRef = useRef(null);

  console.log("[AdminDashboard] render:", { isLoading, hasPortfolioData: !!portfolioData, storageStatus });

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden py-6 sm:py-10 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block h-8 w-8 rounded-full border-4 border-solid border-emerald-600 border-r-transparent"
          />
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Loading portfolio data...</p>
        </div>
      </section>
    );
  }

  const safePortfolio = portfolioData || {};
  const projects = Array.isArray(safePortfolio.projects) ? safePortfolio.projects : [];
  const skills = Array.isArray(safePortfolio.skills) ? safePortfolio.skills : [];
  const stats = Array.isArray(safePortfolio.stats) ? safePortfolio.stats : [];
  const hero = safePortfolio.hero || {};
  const about = safePortfolio.about || {};

  const handleReset = async () => {
    if (!confirm("Reset all portfolio data to defaults? This cannot be undone.")) return;
    const result = await resetPortfolioData();
    if (result?.success) {
      setStatus("Reset to defaults.");
    } else {
      setStatus(result?.message || "Failed to reset.");
    }
  };

  const handleExport = () => {
    const result = exportPortfolio();
    if (result?.success) {
      setStatus("Portfolio exported.");
    } else {
      setStatus(result?.message || "Export failed.");
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const result = await importPortfolio(file);
    if (result?.success) {
      setStatus("Portfolio imported. Refresh to see changes.");
    } else {
      setStatus(result?.message || "Import failed.");
    }
    event.target.value = "";
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24 sm:pt-28 pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-800/20"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-800/20"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6"
      >
        <motion.div variants={itemVariants} className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/85 dark:bg-slate-900/80 p-4 sm:p-6 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Control Center</p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage your portfolio content in one workspace.</p>
            </motion.div>
            <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
              {[
                { onClick: handleExport, icon: Save, label: "Export", className: "bg-emerald-600 hover:bg-emerald-700" },
                { onClick: () => importInputRef.current?.click(), icon: RotateCcw, label: "Import", className: "bg-cyan-600 hover:bg-cyan-700" },
                { onClick: handleReset, icon: RotateCcw, label: "Reset", className: "bg-amber-500 hover:bg-amber-600" },
                { onClick: handleLogout, icon: LogOut, label: "Logout", className: "bg-slate-800 hover:bg-slate-900" },
              ].map((btn, idx) => (
                <motion.button
                  key={idx}
                  onClick={btn.onClick}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition ${btn.className}`}
                >
                  <btn.icon size={16} />
                  {btn.label}
                </motion.button>
              ))}
              <input ref={importInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="mt-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 p-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Storage: {storageStatus}</span>
            </div>
          </motion.div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/90 dark:text-emerald-200"
            >
              {status}
            </motion.div>
          )}
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                  : "bg-white/80 text-slate-700 hover:bg-slate-100 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeTab === "text" && (
            <SafePanel fallback="Text content panel failed to render.">
              <TextContentPanel />
            </SafePanel>
          )}
          {activeTab === "stats" && (
            <SafePanel fallback="Stats panel failed to render.">
              <StatsPanel />
            </SafePanel>
          )}
          {activeTab === "about" && (
            <SafePanel fallback="About panel failed to render.">
              <AboutManagerPanel />
            </SafePanel>
          )}
          {activeTab === "skills" && (
            <SafePanel fallback="Skills panel failed to render.">
              <SkillsManagerPanel />
            </SafePanel>
          )}
          {activeTab === "projects" && (
            <SafePanel fallback="Projects panel failed to render.">
              <ProjectsManagerPanel />
            </SafePanel>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
