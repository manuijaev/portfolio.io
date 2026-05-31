import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const MotionDiv = motion.div;

export default function AboutManagerPanel() {
  const { portfolioData, updateAbout } = usePortfolio();
  const [aboutHeading, setAboutHeading] = useState(portfolioData.about.heading || "About Me");
  const [aboutIntro, setAboutIntro] = useState(portfolioData.about.intro || "");
  const [aboutStory, setAboutStory] = useState(portfolioData.about.story || "");
  const [aboutAchievementsDraft, setAboutAchievementsDraft] = useState(portfolioData.about.achievements || []);
  const [newAchievement, setNewAchievement] = useState("");

  useMemo(() => {
    setAboutHeading(portfolioData.about.heading || "About Me");
    setAboutIntro(portfolioData.about.intro || "");
    setAboutStory(portfolioData.about.story || "");
    setAboutAchievementsDraft(portfolioData.about.achievements || []);
  }, [portfolioData.about]);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">About Manager</h2>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">About Heading</label>
          <input
            value={aboutHeading}
            onChange={(e) => setAboutHeading(e.target.value)}
            className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Intro</label>
          <textarea
            rows="4"
            value={aboutIntro}
            onChange={(e) => setAboutIntro(e.target.value)}
            className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Story</label>
          <textarea
            rows="4"
            value={aboutStory}
            onChange={(e) => setAboutStory(e.target.value)}
            className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
          />
        </div>
        <div className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Achievements</label>
          <div className="flex gap-2 mb-3">
            <input
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Add achievement"
              className="flex-1 rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const value = newAchievement.trim();
                  if (value) {
                    setAboutAchievementsDraft([...aboutAchievementsDraft, value]);
                    setNewAchievement("");
                  }
                }
              }}
            />
            <button
              onClick={() => {
                const value = newAchievement.trim();
                if (value) {
                  setAboutAchievementsDraft([...aboutAchievementsDraft, value]);
                  setNewAchievement("");
                }
              }}
              className="rounded-lg bg-cyan-600 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-700"
            >
              Add
            </button>
          </div>
          <div className="space-y-2 max-h-44 overflow-auto pr-1">
            {aboutAchievementsDraft.map((achievement, index) => (
              <div key={`${achievement}-${index}`} className="grid grid-cols-[1fr_auto] gap-2">
                <input
                  value={achievement}
                  onChange={(e) =>
                    setAboutAchievementsDraft(aboutAchievementsDraft.map((item, idx) => (idx === index ? e.target.value : item)))
                  }
                  className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                />
                <button
                  onClick={() => setAboutAchievementsDraft(aboutAchievementsDraft.filter((_, idx) => idx !== index))}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => updateAbout({ heading: aboutHeading.trim() || "About Me", intro: aboutIntro.trim(), story: aboutStory.trim(), achievements: aboutAchievementsDraft.map((item) => String(item || "").trim()).filter(Boolean) })}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Save size={16} />
          Save About
        </button>
      </div>
    </MotionDiv>
  );
}
