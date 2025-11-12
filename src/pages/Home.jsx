import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-6 overflow-hidden">

      {/* Left side */}
      <motion.div
        className="md:w-1/2 text-center md:text-left space-y-6"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hi, I’m <span className="text-blue-500">Emmanuel Kenyani</span>
        </h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
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
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
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
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <a
            href="public/projects/emmanul kenyani cv.pdf"
            download
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105"
          >
            Download CV
          </a>

          <Link
            to="/projects"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105"
          >
            View Projects
          </Link>
        </div>
      </motion.div>

      {/* Right image */}
      <motion.div
        className="md:w-1/2 flex justify-center mt-8 md:mt-0"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.img
          src="/Profile.jpg"
          alt="Emmanuel Kenyani"
          className="w-64 h-64 rounded-full object-cover shadow-2xl border-4 border-blue-500"
          animate={{
            y: [0, -12, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.div>

    </section>
  );
}
