export default function About() {
  return (
    <section className="py-12 px-6">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>

      {/* Intro */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Hi, I’m <span className="font-semibold">Emmanuel Kenyani</span>, a
          passionate <span className="text-indigo-600 dark:text-indigo-400">Junior Software Developer</span>.  
          I enjoy turning ideas into real-world solutions by leveraging modern
          technologies. My main focus has been web development, where I have
          gained hands-on experience with{" "}
          <strong>HTML, CSS, TailwindCSS, JavaScript, React, and Firebase</strong>.  
          My goal is to keep learning and contribute to impactful projects that
          improve lives.
        </p>
      </div>

      {/* Skills in Card Form */}
      <div className="max-w-4xl mx-auto mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-center">My Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "HTML5 & CSS3",
            "Tailwind CSS",
            "JavaScript (ES6+)",
            "React.js",
            "Firebase",
            "Git & GitHub",
          ].map((skill, idx) => (
            <div
              key={idx}
              className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-xl shadow-md p-6 flex items-center justify-center text-lg font-medium hover:shadow-lg transition"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center">
          Achievements
        </h3>
        <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            Built and deployed <strong>House Hunter</strong>, a platform that
            connects tenants and landlords, featuring real-time data with
            Firebase.
          </li>
          <li>
            Designed and developed a <strong>budget tracker app</strong> with
            persistent storage and filtering features.
          </li>
          <li>
            Completed hands-on training at{" "}
            <strong>Zindua School</strong>, covering frontend development
            fundamentals and modern frameworks.
          </li>
          <li>
            Collaborated with peers on open-source projects, focusing on clean
            UI design and reusable React components.
          </li>
          <li>
            Continuously learning and experimenting with new technologies to
            stay current with industry trends.
          </li>
        </ul>
      </div>
    </section>
  );
}
