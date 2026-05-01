import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { usePortfolio } from "../ context/PortfolioContext";

const MotionH3 = motion.h3;
const MotionDiv = motion.div;

function groupSkillsByCategory(skills) {
  return skills.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});
}

export default function SkillsVisualization() {
  const { portfolioData } = usePortfolio();
  const groupedSkills = groupSkillsByCategory(portfolioData.skills || []);
  const categories = Object.keys(groupedSkills);

  const [openSections, setOpenSections] = useState({
    [categories[0] || "General"]: true,
  });

  const toggleSection = (category) => {
    setOpenSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <MotionH3
        className="text-2xl font-semibold mb-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        My Skills
      </MotionH3>

      {categories.length === 0 ? (
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          No skills added yet. Add skills from the admin dashboard.
        </p>
      ) : null}

      {Object.entries(groupedSkills).map(([category, skills]) => (
        <MotionDiv
          key={category}
          className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => toggleSection(category)}
            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <h4 className="text-xl font-medium text-gray-900 dark:text-gray-100">
              {category}
            </h4>
            {openSections[category] ? (
              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          <MotionDiv
            initial={false}
            animate={{ height: openSections[category] ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {skills.map((skill, idx) => (
                <div key={skill.id || idx} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {skill.experience}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <MotionDiv
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.experience}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0, delay: Math.floor(idx / 3) * 0.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        </MotionDiv>
      ))}
    </div>
  );
}
