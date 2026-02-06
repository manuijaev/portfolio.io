import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Testimonials from "../components/Testimonials";
import ParticleEffect from "../components/ParticleEffect";
import { AnimatedStats } from "../components/AnimatedCounter";

export default function Home() {
  const [showParticles, setShowParticles] = useState(false);

  const triggerParticles = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 100);
  };

  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 overflow-hidden py-16 md:py-0">

        {/* Left side */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-4 md:space-y-6 max-w-2xl mx-auto md:mx-0"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Hi, I’m <span className="text-blue-500">Emmanuel Kenyani</span>
          </h1>

          {/* Dynamic Typewriter Subtitle */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 min-h-[2.5rem] sm:min-h-[3rem]">
            <Typewriter
              options={{
                strings: [
                  "Junior Software Developer",
                  "Full-Stack Developer",
                  "React & Tailwind Specialist",
                  "Firebase & Cloud Enthusiast",
                  "Python & Django Developer",
                  "RESTful API Engineer",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          {/* Paragraph */}
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
            I’m a <span className="font-semibold">Junior Software Developer</span> who loves transforming ideas
            into fast, clean, and interactive digital experiences. I specialize in
            <strong> HTML, CSS, Tailwind, and JavaScript</strong>, with strong hands-on
            experience in <strong>React</strong> and <strong>Firebase</strong>.
            I also work with <strong>Python, Django, SQLite,</strong> and
            <strong>RESTful API development</strong> to build powerful and scalable backend
            solutions. I’m constantly exploring new technologies and refining my craft to
            create impactful and user-friendly applications.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <motion.a
              href="/projects/kenyani's resume.pdf"
              download
              className="relative inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-xl overflow-hidden group"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={triggerParticles}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                whileHover={{ scale: 1.1 }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Download CV
              </span>
            </motion.a>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                to="/projects"
                onClick={triggerParticles}
                className="relative inline-block px-6 py-3 bg-gray-800 text-white rounded-lg shadow-xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right image */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-8 md:mt-0 px-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div className="relative">
            <motion.img
              src="/projects/emmanuel.jpg"
              alt="Emmanuel Kenyani"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover shadow-2xl border-4 border-blue-500"
              animate={{
                y: [0, -12, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
            {/* Decorative elements */}
          </motion.div>
        </motion.div>

      </section>

      {/* <AnimatedStats /> */}

      {/* <Testimonials /> */}

      {/* Particle Effects */}
      <ParticleEffect trigger={showParticles} />
    </div>
  );
}
