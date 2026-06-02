import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import Testimonials from "../components/Testimonials";
import ParticleEffect from "../components/ParticleEffect";
import { AnimatedStats } from "../components/AnimatedCounter";
import { usePortfolio } from "../context/PortfolioContext";
import GlassButton from "../components/GlassButton";

export default function Home() {
  const [showParticles, setShowParticles] = useState(false);
  const { portfolioData } = usePortfolio();

  const triggerParticles = () => {
    setShowParticles(true);
    setTimeout(() => setShowParticles(false), 100);
  };

  return (
    <div>
      <section className="section-shell flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden py-10 sm:py-14 md:py-0 gap-8 md:gap-12">

        {/* Left side */}
        <motion.div
          className="md:w-1/2 text-center md:text-left space-y-4 md:space-y-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Hi, I’m <span className="text-blue-500">{portfolioData.hero.headingName}</span>
          </h1>

          {/* Dynamic Typewriter Subtitle */}
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-600 dark:text-blue-400 min-h-[2.5rem] sm:min-h-[3rem]">
            <Typewriter
              options={{
                strings: [
                  ...portfolioData.hero.typewriterRoles,
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          {/* Paragraph */}
          <p className="text-left md:text-left text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
            {portfolioData.hero.bio}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
            <GlassButton
              href="/projects/kenyani's resume.pdf"
              download
              color="blue"
              size="lg"
              onClick={triggerParticles}
            >
              Download CV
            </GlassButton>

            <GlassButton
              Component={Link}
              to="/projects"
              color="blue"
              size="lg"
              onClick={triggerParticles}
            >
              View Projects
            </GlassButton>
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
              src={portfolioData.hero.profileImage}
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
