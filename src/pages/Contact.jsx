import { useState } from "react";
import { useTheme } from "../ context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://formspree.io/f/abcd1234", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending message.");
    }
  };

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

      <div
        className={`max-w-lg mx-auto rounded-lg shadow-lg p-6 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-300"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

