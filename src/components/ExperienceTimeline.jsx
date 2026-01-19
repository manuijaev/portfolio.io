import { useState } from "react";
import { motion } from "framer-motion";

const ExperienceTimeline = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const timelineData = [
    {
      date: "2023 - Present",
      title: "Junior Software Developer",
      description: "Developing web applications using React, Node.js, and modern frameworks. Focusing on user experience and performance optimization.",
      type: "work",
      details: "Key projects include House Hunter platform with Firebase integration, bill splitter app with persistent storage, and Smart Budget Dashboard for financial tracking."
    },
    {
      date: "2023",
      title: "Hands-on Training at Zindua School",
      description: "Completed comprehensive training in frontend/backend fundamentals and modern frameworks.",
      type: "education",
      details: "Covered HTML, CSS, JavaScript, React,python,django,firebase and best practices for web development."
    },
    {
      date: "2022",
      title: "Started Learning Web Development",
      description: "Began journey into software development, focusing on frontend technologies.",
      type: "milestone",
      details: "Self-taught through online resources and built initial projects to understand core concepts."
    },
    {
      date: "2021",
      title: "Open-Source Collaboration",
      description: "Collaborated with peers on open-source projects, emphasizing clean UI design and reusable components.",
      type: "milestone",
      details: "Contributed to projects focusing on React components and UI/UX improvements."
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case "work": return "bg-blue-500";
      case "education": return "bg-green-500";
      case "milestone": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "work": return "💼";
      case "education": return "🎓";
      case "milestone": return "🏆";
      default: return "📌";
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <motion.h3
        className="text-2xl font-semibold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Experience Timeline
      </motion.h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>

        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex items-start mb-8 ml-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            {/* Marker */}
            <div className={`absolute -left-6 z-10 w-4 h-4 rounded-full ${getTypeColor(item.type)} flex items-center justify-center text-white text-xs`}>
              {getTypeIcon(item.type)}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <div className="flex items-center mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-4">{item.date}</span>
                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(item.type)} text-white`}>
                  {item.type}
                </span>
              </div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{item.description}</p>

              {item.details && (
                <button
                  onClick={() => toggleExpanded(index)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                >
                  {expandedItems.has(index) ? "Hide details" : "Show details"}
                </button>
              )}

              {expandedItems.has(index) && item.details && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 text-gray-600 dark:text-gray-400 text-sm"
                >
                  {item.details}
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceTimeline;