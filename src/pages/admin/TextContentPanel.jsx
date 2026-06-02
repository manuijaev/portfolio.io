import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Save, ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const MotionDiv = motion.div;

export default function TextContentPanel() {
  const { portfolioData, updateHero, updateAbout } = usePortfolio();
  const [heroBio, setHeroBio] = useState(portfolioData.hero.bio);
  const [heroName, setHeroName] = useState(portfolioData.hero.headingName);
  const [aboutHeading, setAboutHeading] = useState(portfolioData.about.heading || "About Me");
  const [aboutIntro, setAboutIntro] = useState(portfolioData.about.intro || "");
  const [aboutStory, setAboutStory] = useState(portfolioData.about.story || "");
  const [aboutAchievementsDraft, setAboutAchievementsDraft] = useState(portfolioData.about.achievements || []);
  const [profileImage, setProfileImage] = useState(portfolioData.hero.profileImage);
  const [heroRolesText, setHeroRolesText] = useState(portfolioData.hero.typewriterRoles.join("\n"));
  const [showAboutForm, setShowAboutForm] = useState(false);

  useEffect(() => {
    setHeroBio(portfolioData.hero.bio);
    setHeroName(portfolioData.hero.headingName);
    setAboutHeading(portfolioData.about.heading || "About Me");
    setAboutIntro(portfolioData.about.intro || "");
    setAboutStory(portfolioData.about.story || "");
    setAboutAchievementsDraft(portfolioData.about.achievements || []);
    setProfileImage(portfolioData.hero.profileImage);
    setHeroRolesText(portfolioData.hero.typewriterRoles.join("\n"));
  }, [portfolioData.hero, portfolioData.about]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Hero Section</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAboutForm(!showAboutForm)}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {showAboutForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAboutForm ? "Hide" : "Edit"} About
          </motion.button>
        </div>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hero Name</label>
            <input
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hero Bio</label>
            <textarea
              rows="4"
              value={heroBio}
              onChange={(e) => setHeroBio(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Rotating Roles (one per line)</label>
            <textarea
              rows="4"
              value={heroRolesText}
              onChange={(e) => setHeroRolesText(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Profile Image</label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-300/90 dark:border-slate-600 bg-white/80 dark:bg-slate-950/60 p-3">
              <div className="relative h-16 w-16 shrink-0">
                <img
                  src={profileImage}
                  alt="Profile preview"
                  className="h-16 w-16 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload new avatar</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">PNG or JPG recommended</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => updateHero({ headingName: heroName, bio: heroBio, profileImage, typewriterRoles: heroRolesText.split("\n").map((r) => r.trim()).filter(Boolean) })}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Save size={16} />
            Save Hero
          </motion.button>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">About Section</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAboutForm(!showAboutForm)}
            className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            {showAboutForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showAboutForm ? "Hide" : "Edit"}
          </motion.button>
        </div>
        <AnimatePresence>
          {showAboutForm && (
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
                    placeholder="Add achievement"
                    className="flex-1 rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const value = e.target.value.trim();
                        if (value) {
                          setAboutAchievementsDraft([...aboutAchievementsDraft, value]);
                          e.target.value = "";
                        }
                      }
                    }}
                  />
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateAbout({ heading: aboutHeading.trim() || "About Me", intro: aboutIntro.trim(), story: aboutStory.trim(), achievements: aboutAchievementsDraft.map((item) => String(item || "").trim()).filter(Boolean) })}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                <Save size={16} />
                Save About
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </MotionDiv>
    </div>
  );
}
