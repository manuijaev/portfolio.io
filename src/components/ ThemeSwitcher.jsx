import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-md border dark:border-gray-500"
    >
      {theme === "light" ? "🌞" : "🌙"}
    </button>
  );
}
