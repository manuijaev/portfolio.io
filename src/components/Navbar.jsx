import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../ context/ThemeContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  FolderOpen, 
  Mail, 
  Moon, 
  Sun,
  Menu,
  X,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(null);
  const location = useLocation();

  // Detect scroll for navbar background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { 
      path: "/", 
      label: "Home", 
      icon: Home,
      color: "from-blue-500 to-cyan-500"
    },
    { 
      path: "/about", 
      label: "About", 
      icon: User,
      color: "from-green-500 to-emerald-500"
    },
    { 
      path: "/projects", 
      label: "Projects", 
      icon: FolderOpen,
      color: "from-purple-500 to-pink-500"
    },
    { 
      path: "/contact", 
      label: "Contact", 
      icon: Mail,
      color: "from-orange-500 to-red-500"
    },
  ];

  const iconProps = {
    size: 20,
    strokeWidth: 2
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-2xl border-b border-gray-200/50 dark:border-gray-700/50"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              <Sparkles 
                size={28} 
                className="text-blue-500 dark:text-blue-400" 
                fill="currentColor"
              />
            </motion.div>
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
            >
              Portfolio
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                icon={item.icon}
                label={item.label}
                color={item.color}
                isActive={location.pathname === item.path}
                isHovering={isHovering === item.path}
                onHoverStart={() => setIsHovering(item.path)}
                onHoverEnd={() => setIsHovering(null)}
                index={index}
              />
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            
            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className="p-3 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg transition-all duration-300 lg:hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X {...iconProps} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu {...iconProps} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="py-4 flex flex-col gap-2 px-4">
                {navItems.map((item, index) => (
                  <MobileNavLink
                    key={item.path}
                    to={item.path}
                    icon={item.icon}
                    label={item.label}
                    color={item.color}
                    isActive={location.pathname === item.path}
                    index={index}
                    onClick={() => setIsMenuOpen(false)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// Desktop NavLink Component
function NavLink({ to, icon: Icon, label, color, isActive, isHovering, onHoverStart, onHoverEnd, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <Link
        to={to}
        className={`relative px-6 py-3 rounded-2xl font-semibold transition-all duration-500 group overflow-hidden ${
          isActive
            ? `text-white bg-gradient-to-r ${color} shadow-lg`
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
        }`}
      >
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          whileHover={{ scale: 1.1 }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-3">
          <motion.div
            animate={{ 
              scale: isActive || isHovering ? 1.2 : 1,
              rotate: isActive || isHovering ? 360 : 0
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon size={20} />
          </motion.div>
          <span>{label}</span>
        </div>

        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
            layoutId="activeDot"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}

        {/* Hover arrow */}
        <motion.div
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovering ? 1 : 0, x: isHovering ? 0 : -10 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={16} />
        </motion.div>
      </Link>
    </motion.div>
  );
}

// Mobile NavLink Component
function MobileNavLink({ to, icon: Icon, label, color, isActive, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
    >
      <Link
        to={to}
        onClick={onClick}
        className={`relative flex items-center justify-between px-6 py-4 rounded-2xl font-semibold transition-all duration-500 group overflow-hidden ${
          isActive
            ? `text-white bg-gradient-to-r ${color} shadow-lg`
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
        }`}
      >
        {/* Animated background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          whileHover={{ scale: 1.05 }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{ scale: isActive ? 1.3 : 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon size={24} />
          </motion.div>
          <span className="text-lg">{label}</span>
        </div>

        {/* Chevron indicator */}
        <motion.div
          className="relative z-10"
          animate={{ x: isActive ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ChevronRight size={20} />
        </motion.div>

        {/* Ripple effect on tap */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl opacity-0"
          whileTap={{ opacity: 1, scale: 1.1 }}
          transition={{ duration: 0.1 }}
        />
      </Link>
    </motion.div>
  );
}

// Enhanced Theme Toggle Component
function ThemeToggle({ theme, toggleTheme }) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.button
      onClick={toggleTheme}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      className="relative p-4 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 hover:shadow-lg transition-all duration-300 group"
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{ scale: isHovering ? 1.1 : 1 }}
      />
      
      {/* Icons container */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {theme === "light" ? (
            <motion.div
              key="moon"
              initial={{ scale: 0.5, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 90 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Moon size={24} fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ scale: 0.5, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: -90 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <Sun size={24} className="text-amber-300" fill="currentColor" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-amber-400/20 blur-md opacity-0 group-hover:opacity-100"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Tooltip */}
      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap"
        initial={{ y: 10 }}
        animate={{ y: isHovering ? 0 : 10 }}
      >
        {theme === "light" ? "Dark mode" : "Light mode"}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45" />
      </motion.div>
    </motion.button>
  );
}