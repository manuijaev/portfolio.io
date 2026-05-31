import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, FileText, FolderKanban, LogOut, RotateCcw, Save, Trash2, XCircle, Pencil, PlusCircle, ImagePlus, Link2 } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { defaultPortfolioData } from "../data/portfolioDefaults";
import { getProjectLink } from "../utils/caseStudy";
import TextContentPanel from "./admin/TextContentPanel";
import StatsPanel from "./admin/StatsPanel";
import AboutManagerPanel from "./admin/AboutManagerPanel";
import SkillsManagerPanel from "./admin/SkillsManagerPanel";
import ProjectsManagerPanel from "./admin/ProjectsManagerPanel";

const TABS = [
  { id: "text", label: "Text Content", icon: FileText },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "about", label: "About", icon: FileText },
  { id: "skills", label: "Skills", icon: BarChart3 },
  { id: "projects", label: "Projects", icon: FolderKanban },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { portfolioData, storageStatus, isLoading, resetPortfolioData, logoutAdmin, exportPortfolio, importPortfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState("text");
  const [status, setStatus] = useState("");
  const importInputRef = useRef(null);

  if (isLoading) {
    return (
      <section className="relative min-h-screen overflow-hidden py-6 sm:py-10 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Loading portfolio data...</p>
        </div>
      </section>
    );
  }

  if (!portfolioData) {
    return (
      <section className="relative min-h-screen overflow-hidden py-6 sm:py-10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-rose-600 dark:text-rose-400">Failed to load portfolio data.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

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
    <section className="relative min-h-screen overflow-hidden py-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-300/25 blur-3xl dark:bg-emerald-800/20" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl dark:bg-cyan-800/20" />
      </div>

      <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/85 dark:bg-slate-900/80 p-4 sm:p-6 shadow-lg backdrop-blur"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">Control Center</p>
              <h1 className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Manage your portfolio content in one workspace.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={handleExport} className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                <Save size={16} className="inline mr-1" /> Export
              </button>
              <button onClick={() => importInputRef.current?.click()} className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700">
                <RotateCcw size={16} className="inline mr-1" /> Import
              </button>
              <input ref={importInputRef} type="file" accept="application/json" onChange={handleImport} className="hidden" />
              <button onClick={handleReset} className="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-amber-600">
                <RotateCcw size={16} className="inline mr-1" /> Reset
              </button>
              <button onClick={handleLogout} className="rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-900">
                <LogOut size={16} className="inline mr-1" /> Logout
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80 bg-white/80 dark:bg-slate-900/80 p-3">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <span>Storage: {storageStatus}</span>
            </div>
          </div>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800/70 dark:bg-emerald-950/90 dark:text-emerald-200"
            >
              {status}
            </motion.div>
          )}
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-emerald-600 text-white"
                  : "bg-white/80 text-slate-700 hover:bg-slate-100 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "text" && <TextContentPanel />}
          {activeTab === "stats" && <StatsPanel />}
          {activeTab === "about" && <AboutManagerPanel />}
          {activeTab === "skills" && <SkillsManagerPanel />}
          {activeTab === "projects" && <ProjectsManagerPanel />}
        </motion.div>
      </div>
    </section>
  );
}
