import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    quote: 'Emmanuel delivered exceptional work on our project. His attention to detail and technical skills are outstanding.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Product Manager, InnovateInc',
    quote: 'Working with Emmanuel was a pleasure. He brought creativity and efficiency to our development process.',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'CTO, StartupXYZ',
    quote: 'Emmanuel\'s code is clean, scalable, and well-documented. Highly recommend for any development needs.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for testimonials
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Auto-rotate every 5 seconds

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(interval);
    };
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Clients Say
          </motion.h2>
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Clients Say
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-lg p-6 sm:p-8 mx-4 sm:mx-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={testimonials[currentIndex].photo}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-4 border-4 border-blue-500"
                />
                <blockquote className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-4 italic leading-relaxed">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons - Hidden on very small screens, shown on larger screens */}
          <motion.button
            onClick={prevTestimonial}
            className="hidden sm:flex absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#2563eb",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous testimonial"
          >
            <motion.svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </motion.svg>
          </motion.button>

          <motion.button
            onClick={nextTestimonial}
            className="hidden sm:flex absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.1,
              backgroundColor: "#2563eb",
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next testimonial"
          >
            <motion.svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </motion.svg>
          </motion.button>

          {/* Dots indicator and mobile navigation */}
          <div className="flex flex-col items-center mt-6 sm:mt-8 space-y-4">
            {/* Mobile navigation buttons */}
            <div className="flex sm:hidden space-x-4">
              <motion.button
                onClick={prevTestimonial}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Previous testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                onClick={nextTestimonial}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Next testimonial"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentIndex ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  whileHover={{
                    scale: 1.3,
                    backgroundColor: index === currentIndex ? "#2563eb" : "#9ca3af"
                  }}
                  whileTap={{ scale: 0.9 }}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 1,
                    backgroundColor: index === currentIndex ? "#2563eb" : undefined
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  {index === currentIndex && (
                    <motion.div
                      className="absolute inset-0 bg-blue-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}