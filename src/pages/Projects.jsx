import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "House Hunter Platform",
      image: "/projects/house.png",
      description:
        "A web app connecting tenants and landlords, allowing landlords to post houses with specifications and tenants to view listings and comment. NOTE, STILL UNDER DEVELOPMENT",
      link: "https://house-hunter-six.vercel.app"
    },
    {
      id: 2,
      title: "Bill Splitter App",
      image: "/projects/bill.png",
      description:
        "A budget tracker web app that records income and expenses, supports filtering and deletion, and persists data with cookies.",
      link: "https://manuijaev.github.io/bill-splliter/",
    },
    {
      id: 3,
      title: "Smart Budget Dashboard",
      image: "/projects/smartbudget.png",
      description:
        "A single visual hub that categorizes spending, tracks goals, and gives financial clarity using a modern dashboard interface.",
      link: "https://smart-dash-mlb2.onrender.com/",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 py-8 sm:py-12">
      <div className="container mx-auto max-w-7xl">

        {/* Animated Section Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>

        {/* Grid layout - Responsive columns */}
        <motion.div
          className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden flex flex-col cursor-pointer border border-gray-200 dark:border-gray-700"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.02,
                shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image Container */}
              <div className="overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Content Container */}
              <div className="p-4 sm:p-6 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl md:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">
                  {project.title}
                </h3>

                <motion.p
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex-grow leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {project.description}
                </motion.p>

                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-4 sm:mt-6 inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Visit Site
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Optional: Add a call-to-action for mobile */}
        <motion.div
          className="mt-8 sm:mt-12 text-center sm:hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            💡 Tap on projects to visit live sites
          </p>
        </motion.div>
      </div>
    </section>
  );
}