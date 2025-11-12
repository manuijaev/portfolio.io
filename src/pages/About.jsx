import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 700 });
  }, []);

  const skills = [
    "HTML5 & CSS3",
    "Tailwind CSS",
    "JavaScript (ES6+)",
    "React.js",
    "Firebase",
    "Git & GitHub",
    "Python",
    "Django",
    "SQLite",
    "RESTful APIs",
    "Responsive Design",
    "Problem Solving",
    "Team Collaboration",
    "Agile Methodologies",
    "UI/UX Principles",
  ];

  const achievements = [
    "Built and deployed House Hunter, a platform that connects tenants and landlords, featuring real-time data with Firebase.",
    "Designed and developed a bill splitter app with persistent storage and filtering features.",
    "Completed hands-on training at Zindua School, covering frontend development fundamentals and modern frameworks.",
    "Collaborated with peers on open-source projects, focusing on clean UI design and reusable React components.",
    "Continuously learning and experimenting with new technologies to stay current with industry trends.",
    "Developed a full-stack Smart Budget Dashboard that automates financial tracking by securely syncing with user bank accounts, providing real-time visual spending analytics and personalized budget alerts, empowering users to achieve their financial goals with clarity and confidence."
  ];

  return (
    <section className="py-12 px-6">

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

      {/* Skills */}
      <div className="max-w-4xl mx-auto mb-12">
        <motion.h3
          className="text-2xl font-semibold mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          My Skills
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 
              rounded-xl shadow-md p-6 flex items-center justify-center text-lg font-medium 
              border border-transparent hover:border-indigo-500 hover:shadow-lg transition"
            >
              {skill}
            </motion.div>
          ))}
        </div>
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

