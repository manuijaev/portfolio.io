import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto flex flex-col md:flex-row justify-between items-center"
      >
        {/* Left text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-center md:text-left mb-4 md:mb-0"
        >
          I’m open to opportunities in web development, 
          frontend engineering, and full-stack projects.
        </motion.p>

        {/* Social */}
        <motion.div
          className="flex space-x-6 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-sm tracking-wide">Let's Connect</p>

          {/* Mail */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="mailto:kenyniemmanuel44@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Mail className="w-6 h-6" />
          </motion.a>

          {/* Github */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/manuijaev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/emmanuel-kenyani-48b763383"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
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
