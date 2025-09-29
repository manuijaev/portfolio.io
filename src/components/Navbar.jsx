import { Link } from "react-router-dom";
import { useTheme } from "../ context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-gray-200 dark:bg-gray-800 p-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
    >
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
}