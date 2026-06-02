import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import GlassButton from "../../components/GlassButton";

const MotionDiv = motion.div;

export default function AboutManagerPanel() {
  const { portfolioData, updateAbout } = usePortfolio();
  const [aboutHeading, setAboutHeading] = useState(portfolioData.about.heading || "About Me");
  const [aboutIntro, setAboutIntro] = useState(portfolioData.about.intro || "");
  const [aboutStory, setAboutStory] = useState(portfolioData.about.story || "");
  const [aboutAchievementsDraft, setAboutAchievementsDraft] = useState(portfolioData.about.achievements || []);
  const [newAchievement, setNewAchievement] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
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
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">About Manager</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        >
          {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {showDetails ? "Hide" : "Edit"} Details
        </motion.button>
      </div>
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
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
                <GlassButton
                  onClick={() => {
                    const value = newAchievement.trim();
                    if (value) {
                      setAboutAchievementsDraft([...aboutAchievementsDraft, value]);
                      setNewAchievement("");
                    }
                  }}
                  color="blue"
                  size="sm"
                >
                  Add
                </GlassButton>
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
                    <GlassButton
                      onClick={() => setAboutAchievementsDraft(aboutAchievementsDraft.filter((_, idx) => idx !== index))}
                      color="blue"
                      size="sm"
                    >
                      Delete
                    </GlassButton>
                  </div>
                ))}
              </div>
            </div>
            <GlassButton onClick={() => updateAbout({ heading: aboutHeading.trim() || "About Me", intro: aboutIntro.trim(), story: aboutStory.trim(), achievements: aboutAchievementsDraft.map((item) => String(item || "").trim()).filter(Boolean) })} color="blue" size="md" className="w-full" icon={Save}>
              Save About
            </GlassButton>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
}
