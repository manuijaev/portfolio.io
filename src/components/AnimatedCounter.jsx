import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className = "",
  suffix = "",
  prefix = ""
}) {
  const [displayValue, setDisplayValue] = useState(from);
  const count = useMotionValue(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => setDisplayValue(Math.round(value))
    });

    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </motion.span>
  );
}

// Stats section with animated counters
export function AnimatedStats() {
  // Calculate dynamic years of experience
  const calculateYearsExperience = () => {
    const startDate = new Date('2023-01-01'); // Assuming started in 2023
    const currentDate = new Date();
    const years = currentDate.getFullYear() - startDate.getFullYear();
    const months = currentDate.getMonth() - startDate.getMonth();
    return months < 0 ? years - 1 : years;
  };

  const stats = [
    { label: "Projects Completed", value: 15, suffix: "+" },
    { label: "Happy Clients", value: 12, suffix: "+" },
    { label: "Years Experience", value: calculateYearsExperience(), suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Subtle background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 dark:bg-blue-800/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/30 dark:bg-purple-800/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          My <span className="text-blue-600 dark:text-blue-400">Achievements</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                <AnimatedCounter
                  from={0}
                  to={stat.value}
                  duration={2.5}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}