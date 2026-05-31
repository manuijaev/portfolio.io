import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

const SKILL_CATEGORIES = ["Frontend", "Backend", "Database", "Cloud", "DevOps", "Mobile", "AI/ML", "Tools", "General"];

const MotionDiv = motion.div;

export default function SkillsManagerPanel() {
  const { portfolioData, updateSkills } = usePortfolio();
  const [skillsDraft, setSkillsDraft] = useState(() => (portfolioData.skills || []).map((skill) => ({ ...skill })));
  const [skillForm, setSkillForm] = useState({ name: "", category: "Frontend", experience: 60 });

  useMemo(() => {
    setSkillsDraft((portfolioData.skills || []).map((skill) => ({ ...skill })));
  }, [portfolioData.skills]);

  const addSkillDraft = () => {
    const name = skillForm.name.trim();
    if (!name) return;
    const nextId = skillsDraft.reduce((max, skill) => Math.max(max, Number(skill.id) || 0), 0) + 1;
    setSkillsDraft([
      ...skillsDraft,
      {
        id: nextId,
        name,
        category: skillForm.category || "General",
        experience: Math.max(0, Math.min(100, Number(skillForm.experience) || 0)),
      },
    ]);
    setSkillForm({ name: "", category: skillForm.category || "Frontend", experience: 60 });
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white/90 dark:bg-slate-900/85 p-5 shadow-lg backdrop-blur"
    >
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">Skills Manager</h2>
      <div className="space-y-3">
        <div className="grid gap-2 sm:grid-cols-[1.2fr_0.8fr]">
          <input
            value={skillForm.name}
            onChange={(e) => setSkillForm((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Skill name"
            className="rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
          />
          <select
            value={skillForm.category}
            onChange={(e) => setSkillForm((prev) => ({ ...prev, category: e.target.value }))}
            className="rounded-xl border border-slate-300/90 dark:border-slate-600 px-3.5 py-2.5 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
          >
            {SKILL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-2">
            <span>Experience Level</span>
            <span>{skillForm.experience}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={skillForm.experience}
            onChange={(e) => setSkillForm((prev) => ({ ...prev, experience: Number(e.target.value) }))}
            className="w-full accent-emerald-600"
          />
        </div>
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addSkillDraft}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          <PlusCircle size={16} />
          Add Skill
        </motion.button>
        <div className="space-y-2 max-h-72 overflow-auto pr-1">
          {skillsDraft.map((skill, index) => (
            <div key={skill.id || index} className="rounded-xl border border-slate-300/90 dark:border-slate-600 p-3 bg-white/80 dark:bg-slate-950/50">
              <div className="grid gap-2 sm:grid-cols-[1fr_0.8fr_auto]">
                <input
                  value={skill.name}
                  onChange={(e) =>
                    setSkillsDraft((prev) =>
                      prev.map((item, idx) => (idx === index ? { ...item, name: e.target.value } : item))
                    )
                  }
                  className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                />
                <select
                  value={skill.category}
                  onChange={(e) =>
                    setSkillsDraft((prev) =>
                      prev.map((item, idx) => (idx === index ? { ...item, category: e.target.value } : item))
                    )
                  }
                  className="rounded-lg border border-slate-300/90 dark:border-slate-600 px-3 py-2 bg-white/90 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 outline-none transition focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500"
                >
                  {SKILL_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSkillsDraft((prev) => prev.filter((_, idx) => idx !== index))}
                  className="rounded-lg bg-rose-600 px-3 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Delete
                </motion.button>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
                  <span>Experience (Throttle)</span>
                  <span>{Number(skill.experience) || 0}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={Number(skill.experience) || 0}
                  onChange={(e) =>
                    setSkillsDraft((prev) =>
                      prev.map((item, idx) => (idx === index ? { ...item, experience: Number(e.target.value) } : item))
                    )
                  }
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => updateSkills(skillsDraft.map((skill) => ({ ...skill, experience: Number(skill.experience) || 0 })))}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          <Save size={16} />
          Save Skills
        </motion.button>
      </div>
    </MotionDiv>
  );
}
