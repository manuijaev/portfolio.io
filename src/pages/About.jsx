import { motion } from "framer-motion";
import { FloatingParticles } from "../components/ParticleEffect";
import SkillsVisualization from "../components/SkillsVisualization";
import ExperienceTimeline from "../components/ExperienceTimeline";
import { AnimatedStats } from "../components/AnimatedCounter";

export default function About() {


  const achievements = [
    "Built and deployed House Hunter, a platform that connects tenants and landlords, featuring real-time data with Firebase.",
    "Designed and developed a bill splitter app with persistent storage and filtering features.",
    "Completed hands-on training at Zindua School, covering frontend development fundamentals and modern frameworks.",
    "Collaborated with peers on open-source projects, focusing on clean UI design and reusable React components.",
    "Continuously learning and experimenting with new technologies to stay current with industry trends.",
    "Developed a full-stack Smart Budget Dashboard that automates financial tracking by securely syncing with user bank accounts, providing real-time visual spending analytics and personalized budget alerts, empowering users to achieve their financial goals with clarity and confidence.",
    "A modern patrol management system with QR-based guard tracking, real-time reports, offline PWA support, and role-based accesss"
  ];

  return (
    <section className="py-12 px-6 relative overflow-hidden">
      <FloatingParticles count={15} />

      {/* Title */}
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Me
      </motion.h2>

      {/* Intro */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Hi, I’m <span className="font-semibold">Emmanuel Kenyani</span>, a
          passionate{" "}
          <span className="text-indigo-600 dark:text-indigo-400">
            Junior Software Developer
          </span>.
          I enjoy turning ideas into real-world solutions by leveraging modern
          technologies. My main focus has been web development, where I have
          gained hands-on experience with{" "}
          <strong>HTML, CSS, TailwindCSS, JavaScript, React,python,django,sqlite and Firebase</strong>.
          My goal is to keep learning and contribute to impactful projects that
          improve lives.
        </p>
      </motion.div>

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
        <motion.h3
          className="text-2xl font-semibold mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h3>

        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300">
          {achievements.map((ach, idx) => (
            <motion.li
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
            >
              {ach}
            </motion.li>
          ))}
        </ul>
      </div>

    </section>
  );
}

