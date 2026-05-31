import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const MotionDiv = motion.div;

export default function StatsPanel() {
  const { portfolioData, updateStats } = usePortfolio();
  const [statsDraft, setStatsDraft] = useState(() => portfolioData.stats.map((item) => ({ ...item })));

  useEffect(() => {
    setStatsDraft(portfolioData.stats.map((item) => ({ ...item })));
  }, [portfolioData.stats]);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Stats</h2>
      <div className="space-y-3">
        {statsDraft.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <input
              value={stat.label}
              onChange={(e) =>
                setStatsDraft((prev) =>
                  prev.map((item, idx) => (idx === index ? { ...item, label: e.target.value } : item))
                )
              }
              className="sm:col-span-2 rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500"
            />
            <input
              type="number"
              value={stat.value}
              onChange={(e) =>
                setStatsDraft((prev) =>
                  prev.map((item, idx) => (idx === index ? { ...item, value: Number(e.target.value) || 0 } : item))
                )
              }
              className="rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-cyan-500/60 focus:border-cyan-500"
            />
          </div>
        ))}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateStats(statsDraft.map((item) => ({ ...item, value: Number(item.value) || 0 })))}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          <Save size={16} />
          Save Stats
        </motion.button>
      </div>
    </MotionDiv>
  );
}
