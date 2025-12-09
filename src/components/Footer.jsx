import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 sm:py-8 mt-8 sm:mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6"
      >
        {/* Left text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm sm:text-base text-center md:text-left flex-1 max-w-md"
        >
          I’m open to opportunities in web development,
          frontend engineering, and full-stack projects.
        </motion.p>

        {/* Social */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm sm:text-base tracking-wide mb-2 sm:mb-0">Let's Connect</p>

          <div className="flex space-x-4 sm:space-x-6">
            {/* Mail */}
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:kenyaniemmanuel44@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 touch-manipulation"
              aria-label="Send email"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>

            {/* Github */}
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/manuijaev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 touch-manipulation"
              aria-label="Visit GitHub"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/emmanuel-kenyani-48b763383"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors duration-200 p-2 rounded-full hover:bg-gray-800 touch-manipulation"
              aria-label="Visit LinkedIn"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="h-px bg-gray-700 mt-6 mx-auto"
      />

      {/* Copyright */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-gray-400 mt-4"
      >
        © {new Date().getFullYear()} Emmanuel Kenyani — Portfolio
      </motion.p>
    </footer>
  );
}
