import { useState, useRef, useEffect } from "react";
import { useTheme } from "../ context/ThemeContext";
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
  const [sendStatus, setSendStatus] = useState(null); // null, 'success', 'error'
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
      setSendStatus('error');
      return false;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSendStatus('error');
      return false;
    }
    
    if (message.length < 10) {
      setSendStatus('error');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSending(true);
    setSendStatus(null);

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
        return "Failed to send message. Please check your inputs and try again.";
      default:
        return "";
    }
  };

  return (
    <section id="contact" className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className={`text-center mb-12 text-lg ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}>
          Looking for my next challenge where I can build innovative solutions and grow with a talented team. Let's discuss potential opportunities.
        </p>

        {/* Status Message */}
        {sendStatus && (
          <div className={`max-w-lg mx-auto mb-6 p-4 rounded-lg border ${getStatusStyles()} transition-all duration-300`}>
            <p className="text-center font-medium">{getStatusMessage()}</p>
          </div>
        )}

        <div
          className={`max-w-lg mx-auto rounded-2xl shadow-xl p-8 transition-all duration-500 ${
            theme === "dark"
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  Your Message *
                </label>
                <span className={`text-xs ${
                  charCount > 500 ? 'text-red-500' : 
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {charCount}/500
                </span>
              </div>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                maxLength="500"
                className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 resize-none ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
                }`}
                placeholder="Tell me about your project, ideas, or just say hello..."
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                isSending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSending ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Sending Message...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
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