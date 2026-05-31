import { useMemo } from "react";
import { motion } from "framer-motion";
import { Pencil, Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import { defaultPortfolioData } from "../../data/portfolioDefaults";

const MotionDiv = motion.div;

export default function TextContentPanel() {
  const { portfolioData, updateHero, updateAbout } = usePortfolio();

  const [heroBio, setHeroBio] = useMemo(() => [portfolioData.hero.bio, () => {}], [portfolioData.hero.bio]);
  const [heroName, setHeroName] = useMemo(() => [portfolioData.hero.headingName, () => {}], [portfolioData.hero.headingName]);
  const [aboutHeading, setAboutHeading] = useMemo(() => [portfolioData.about.heading || "About Me", () => {}], [portfolioData.about.heading]);
  const [aboutIntro, setAboutIntro] = useMemo(() => [portfolioData.about.intro || "", () => {}], [portfolioData.about.intro]);
  const [aboutStory, setAboutStory] = useMemo(() => [portfolioData.about.story || "", () => {}], [portfolioData.about.story]);
  const [aboutAchievementsDraft, setAboutAchievementsDraft] = useMemo(
    () => [portfolioData.about.achievements || [], () => {}],
    [portfolioData.about.achievements]
  );
  const [profileImage, setProfileImage] = useMemo(() => [portfolioData.hero.profileImage, () => {}], [portfolioData.hero.profileImage]);
  const [heroRolesText, setHeroRolesText] = useMemo(
    () => [portfolioData.hero.typewriterRoles.join("\n"), () => {}],
    [portfolioData.hero.typewriterRoles]
  );

  return (
    <div className="space-y-6">
      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Hero Section</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hero Name</label>
            <input
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Hero Bio</label>
            <textarea
              rows="4"
              value={heroBio}
              onChange={(e) => setHeroBio(e.target.value)}
              className="w-full rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
            />
          </div>
          <div className="sm:col-span-2">
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
          <div className="flex items-end">
            <button
              onClick={() => updateHero({ headingName: heroName, bio: heroBio, profileImage, typewriterRoles: heroRolesText.split("\n").map((r) => r.trim()).filter(Boolean) })}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Save size={16} />
              Save Hero
            </button>
          </div>
        </div>
      </MotionDiv>

      <MotionDiv
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">About Section</h2>
        <div className="grid gap-4">
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
          <button
            onClick={() => updateAbout({ heading: aboutHeading.trim() || "About Me", intro: aboutIntro.trim(), story: aboutStory.trim(), achievements: aboutAchievementsDraft.map((item) => String(item || "").trim()).filter(Boolean) })}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Save size={16} />
            Save About
          </button>
        </div>
      </MotionDiv>
    </div>
  );
}
