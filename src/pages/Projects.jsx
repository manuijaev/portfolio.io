import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "House Hunter Platform",
      image: "/projects/image.png",
      description:
        "A web app connecting tenants and landlords, allowing landlords to post houses with specifications and tenants to view listings and comment. NOTE, STILL UNDER DEVELOPMENT",
      link: "https://house-hunter-ehq3.vercel.app/",
      technologies: ["Django", "React.js"],
      type: "Website"
    },
    {
      id: 2,
      title: "Bill Splitter App",
      image: "/projects/bill.png",
      description:
        "A budget tracker web app that records income and expenses, supports filtering and deletion, and persists data with cookies.",
      link: "https://manuijaev.github.io/bill-splliter/",
      technologies: ["JavaScript", "HTML", "CSS"],
      type: "Website"
    },
    {
      id: 3,
      title: "Smart Budget Dashboard",
      image: "/projects/smartbudget.png",
      description:
        "A single visual hub that categorizes spending, tracks goals, and gives financial clarity using a modern dashboard interface.",
      link: "https://smart-dash-mlb2.onrender.com/",
      technologies: ["Flask", "UI/UX Principles", "Python"],
      type: "Dashboard"
    },
     {
      id: 4,
      title: "Patrolscan",
      image: "public/projects/patrol.png",
      description:
        "A modern patrol management system with QR-based guard tracking, real-time reports, offline PWA support, and role-based access.",
      link: "https://patrolscan.vercel.app/admin-login",
      technologies: ["Node.js", "React.js"],
      type: "Dashboard"
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const uniqueTechs = useMemo(() => {
    const techs = new Set();
    projects.forEach(project => project.technologies.forEach(tech => techs.add(tech)));
    return Array.from(techs).sort();
  }, [projects]);

  const uniqueTypes = useMemo(() => {
    const types = new Set(projects.map(project => project.type));
    return Array.from(types).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTech = selectedTech === "" || project.technologies.includes(selectedTech);
      const matchesType = selectedType === "" || project.type === selectedType;
      return matchesSearch && matchesTech && matchesType;
    });
  }, [projects, searchTerm, selectedTech, selectedType]);

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

        {/* Filters and Search */}
        <motion.div
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          />

          {/* Tech Filter */}
          <select
            value={selectedTech}
            onChange={(e) => setSelectedTech(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Technologies</option>
            {uniqueTechs.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </motion.div>

        {/* Grid layout - Responsive columns */}
        <motion.div
          className="grid gap-6 sm:gap-8 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden flex flex-col cursor-pointer border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{
                  scale: 1.02,
                  shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  borderColor: "rgba(59, 130, 246, 0.5)"
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

                  {/* Tech and Type Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map(tech => (
                      <span key={tech} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                        {tech}
                      </span>
                    ))}
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium rounded-full">
                      {project.type}
                    </span>
                  </div>

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
          </AnimatePresence>
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