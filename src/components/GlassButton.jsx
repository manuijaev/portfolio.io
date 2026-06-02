import { motion } from "framer-motion";

const glassVariants = {
  idle: {
    scale: 1,
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.25)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
    boxShadow: "0 4px 16px 0 rgba(31, 38, 135, 0.2)",
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 20,
    },
  },
};

const rippleVariants = {
  initial: {
    scale: 0,
    opacity: 0.6,
  },
  animate: {
    scale: 4,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function GlassButton({
  children,
  onClick,
  href,
  type = "button",
  disabled = false,
  className = "",
  color = "blue",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const colorClasses = {
    blue: "from-blue-500/20 to-cyan-500/20 border-blue-400/30 hover:border-blue-400/60 text-blue-700 dark:text-blue-300",
    emerald: "from-emerald-500/20 to-teal-500/20 border-emerald-400/30 hover:border-emerald-400/60 text-emerald-700 dark:text-emerald-300",
    violet: "from-violet-500/20 to-purple-500/20 border-violet-400/30 hover:border-violet-400/60 text-violet-700 dark:text-violet-300",
    rose: "from-rose-500/20 to-pink-500/20 border-rose-400/30 hover:border-rose-400/60 text-rose-700 dark:text-rose-300",
    amber: "from-amber-500/20 to-orange-500/20 border-amber-400/30 hover:border-amber-400/60 text-amber-700 dark:text-amber-300",
    slate: "from-slate-500/20 to-gray-500/20 border-slate-400/30 hover:border-slate-400/60 text-slate-700 dark:text-slate-300",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-5 py-2.5 text-base gap-2",
    lg: "px-7 py-3.5 text-lg gap-2.5",
  };

  const baseClasses = `
    relative inline-flex items-center justify-center font-semibold rounded-2xl
    border backdrop-blur-xl bg-gradient-to-br
    transition-all duration-300 overflow-hidden
    disabled:opacity-50 disabled:cursor-not-allowed
    ${colorClasses[color] || colorClasses.blue}
    ${sizeClasses[size] || sizeClasses.md}
    ${className}
  `;

  const content = (
    <>
      {/* Ripple effect */}
      <motion.span
        className="absolute inset-0 rounded-2xl bg-white/30"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />

      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Content */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />}
      </span>
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        variants={glassVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        className={baseClasses}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={glassVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      className={baseClasses}
      {...props}
    >
      {content}
    </motion.button>
  );
}
