import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ context/ThemeContext";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const { theme } = useTheme();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null); // null, 'success', 'error', 'validation_error'
  const [errorMessage, setErrorMessage] = useState("");
  const [charCount, setCharCount] = useState(0);

  // Auto-hide status message after 5 seconds
  useEffect(() => {
    if (sendStatus) {
      const timer = setTimeout(() => {
        setSendStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sendStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Dynamic character count for message
    if (name === 'message') {
      setCharCount(value.length);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const getDynamicTitle = (name) => {
    if (!name) return "New Website Inquiry";
    
    const greetings = ["Message from", "Inquiry from", "Contact from", "Hello from"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    return `${randomGreeting} ${name}`;
  };

  const validateForm = () => {
    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      const message = "Please fill in all required fields.";
      setSendStatus('validation_error');
      setErrorMessage(message);
      return { isValid: false, message };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const message = "Please enter a valid email address.";
      setSendStatus('validation_error');
      setErrorMessage(message);
      return { isValid: false, message };
    }

    if (message.length < 10) {
      const message = "Message must be at least 10 characters long.";
      setSendStatus('validation_error');
      setErrorMessage(message);
      return { isValid: false, message };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateForm();
    if (!validation.isValid) {
      return;
    }

    setIsSending(true);
    setSendStatus(null);
    setErrorMessage("");

    try {
      const serviceID = "service_6634531";
      const templateID = "template_fu2fd18"; 
      const publicKey = "yDT-1qLxnqvSg8eOr";

      const templateParams = {
        title: getDynamicTitle(formData.name),
        name: formData.name,
        email: formData.email,
        time: getCurrentTime(),
        message: formData.message,
        date: new Date().toLocaleDateString(),
        subject: `Portfolio Contact: ${formData.name}`
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSendStatus('success');
      setFormData({ name: "", email: "", message: "" });
      setCharCount(0);
      
      // Reset form visually
      if (formRef.current) {
        formRef.current.reset();
      }
      
    } catch (error) {
      console.error("Email sending failed:", error);
      console.error("Error type:", typeof error);
      console.error("Error properties:", Object.keys(error));
      if (error.status) {
        console.error("Status code:", error.status);
      }
      if (error.text) {
        console.error("Error message:", error.text);
      }
      if (error.message) {
        console.error("Error message (message):", error.message);
      }
      setErrorMessage("Failed to send message. Please try again later.");
      setSendStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  const getStatusStyles = () => {
    switch (sendStatus) {
      case 'success':
        return "bg-green-100 border-green-400 text-green-700";
      case 'error':
        return "bg-red-100 border-red-400 text-red-700";
      default:
        return "";
    }
  };

  const getStatusMessage = () => {
    switch (sendStatus) {
      case 'success':
        return "Message sent successfully! I'll get back to you soon.";
      case 'error':
        return errorMessage || "Failed to send message. Please try again later.";
      case 'validation_error':
        return errorMessage;
      default:
        return "";
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className={`text-center mb-8 sm:mb-12 text-base sm:text-lg px-4 ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          Looking for my next challenge where I can build innovative solutions and grow with a talented team. Let's discuss potential opportunities.
        </p>

        {/* Status Message */}
        {sendStatus && (
          <div className={`max-w-lg mx-auto mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border ${getStatusStyles()} transition-all duration-300`}>
            <p className="text-center font-medium text-sm sm:text-base">{getStatusMessage()}</p>
          </div>
        )}

        <div
          className={`max-w-lg mx-auto rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-500 ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  animate={{
                    color: formData.name ? "#6366f1" : theme === "dark" ? "#d1d5db" : "#374151"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Name *
                </motion.label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your name"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.label
                  className={`block text-sm font-medium mb-2 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  animate={{
                    color: formData.email ? "#6366f1" : theme === "dark" ? "#d1d5db" : "#374151"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Email *
                </motion.label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                  }`}
                  placeholder="your.email@example.com"
                  whileFocus={{
                    scale: 1.02,
                    boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-2">
                <motion.label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                  animate={{
                    color: formData.message ? "#6366f1" : theme === "dark" ? "#d1d5db" : "#374151"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Your Message *
                </motion.label>
                <motion.span
                  className={`text-xs ${
                    charCount > 500 ? 'text-red-500' :
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                  animate={{
                    scale: charCount > 450 ? [1, 1.1, 1] : 1,
                    color: charCount > 500 ? "#ef4444" : undefined
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {charCount}/500
                </motion.span>
              </div>
              <motion.textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength="500"
                className={`w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                }`}
                placeholder="Tell me about your project, ideas, or just say hello..."
                whileFocus={{
                  scale: 1.01,
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSending}
              className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-white text-base sm:text-lg transition-all duration-300 relative overflow-hidden touch-manipulation ${
                isSending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-95"
              }`}
              whileHover={!isSending ? {
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4), 0 10px 10px -5px rgba(99, 102, 241, 0.2)"
              } : {}}
              whileTap={!isSending ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 300 }}
            >
              {/* Animated background gradient */}
              {!isSending && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Button content */}
              <motion.div
                className="relative z-10 flex items-center justify-center"
                animate={isSending ? { scale: 0.95 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isSending ? (
                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Sending Message...
                    </motion.span>
                  </motion.div>
                ) : (
                  <motion.span
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    Send Message
                  </motion.span>
                )}
              </motion.div>

              {/* Success ripple effect */}
              {sendStatus === 'success' && (
                <motion.div
                  className="absolute inset-0 bg-green-500 rounded-lg"
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          </form>
        </div>

        {/* Additional Contact Info */}
        <div className={`text-center mt-12 ${
          theme === "dark" ? "text-gray-400" : "text-gray-600"
        }`}>
          <p>Prefer a direct email?</p>
          <a 
            href="mailto:kenyaniemmanuel44@gmail.com"
            className="text-indigo-500 hover:text-indigo-600 font-medium transition-colors"
          >
            kenyaniemmanuel44@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}