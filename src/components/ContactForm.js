"use client";

import { useState, useRef, useEffect } from "react";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [showContent, setShowContent] = useState(false);

  const formRef = useRef(null);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  // Trigger showContent after mount / scale animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 700); // delay sesuai animasi tombol
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={formRef}
      className={`w-full transition-opacity duration-500  ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Tombol close */}
      {onClose && (
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-white font-extrabold rounded-full shadow-lg cursor-pointer hover:text-[#9a284b] transition-colors hover:rotate-15"
          >
            ✕
          </button>
        </div>
      )}

      {/* Form content */}
      <div className="max-w-2xl mx-auto p-6  text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-md bg-black/20 border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-md bg-black/20 border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-md bg-black/20 border border-gray-600 focus:outline-none focus:border-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-[#0ca48d] hover:bg-[#0e6c5e] transition-colors p-3 rounded-md font-semibold"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status === "success" && (
          <p className="mt-4 text-green-400">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-400">
            Failed to send message. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
