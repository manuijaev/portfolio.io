import { motion } from "framer-motion";
import { FloatingParticles } from "../components/ParticleEffect";
import SkillsVisualization from "../components/SkillsVisualization";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { AnimatedStats } from "../components/AnimatedCounter";
import { usePortfolio } from "../ context/PortfolioContext";

const MotionH2 = motion.h2;
const MotionDiv = motion.div;
const MotionH3 = motion.h3;
const MotionLi = motion.li;

export default function About() {
  const { portfolioData } = usePortfolio();
  const about = portfolioData.about || {};
  const achievements = Array.isArray(about.achievements) ? about.achievements : [];

  return (
    <section className="section-shell py-12 relative overflow-hidden">
      <FloatingParticles count={15} />

      {/* Title */}
      <MotionH2
        className="text-3xl sm:text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {about.heading || "About Me"}
      </MotionH2>

      {/* Intro */}
      <MotionDiv
        className="max-w-3xl mx-auto mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-left md:text-left text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto md:mx-auto">
          {about.intro}
        </p>
        {about.story ? (
          <p className="mt-4 text-left md:text-left text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto md:mx-auto">
            {about.story}
          </p>
        ) : null}
      </MotionDiv>

      {/* Stats */}
      <div className="mb-12">
        <AnimatedStats />
      </div>

      {/* Skills */}
      <div className="mb-12">
        <SkillsVisualization />
      </div>

      {/* Experience Timeline */}
      <div className="mb-12">
        <ExperienceTimeline />
      </div>

      {/* Achievements */}
      <div className="max-w-3xl mx-auto">
        <MotionH3
          className="text-2xl font-semibold mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Achievements
        </MotionH3>

        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300">
          {achievements.map((ach, idx) => (
            <MotionLi
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
            >
              {ach}
            </MotionLi>
          ))}
        </ul>
      </div>

    </section>
  );
}
