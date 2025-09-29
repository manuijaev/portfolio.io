import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-6">
      {/* Left side: Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hi, I’m <span className="text-blue-500">Emmanuel Kenyani</span>
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          I’m a <span className="font-semibold">Junior Software Developer</span> 
          passionate about building clean, efficient, and user-friendly web
          applications. I’ve tackled <strong>HTML, CSS, Tailwind, and JavaScript</strong>, 
          and have also gained a solid grasp of <strong>React</strong> and <strong>Firebase</strong>.
        </p>

        {/* Download CV button */}
        <a
          href="/Emmanuel_Kenyani_CV.pdf"  // Update with actual CV file path or
          download
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          Download CV
        </a>
         <Link
            to="/projects"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:bg-gray-900 transition-colors"
          >
            View Projects
          </Link>
      </div>

      {/* Right side: Image */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src="/Profile.jpg"
          alt="Emmanuel Kenyani"
          className="w-64 h-64 rounded-full object-cover shadow-lg border-4 border-blue-500"
        />
      </div>
    </section>
  );
}

