import { Github , Linkedin , Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
         Am open to opportunities in web development and frontend engineering.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <p>Let"s Connect</p>
          <a
            href="mailto:kenyniemmanuel44@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Mail className="w-6 h-6" />
          </a>

          <a
            href="https://github.com/manuijaev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Github className="w-6 h-6" />
          </a>

          <a
            href="https://www.linkedin.com/in/emmanuel-kenyani-48b763383"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors duration-200"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
