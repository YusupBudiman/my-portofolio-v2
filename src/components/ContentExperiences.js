"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Data pengalaman
const experiences = [
  {
    company: "Pengadilan Militer II - 09 Bandung",
    role: "Full-Stack Developer (Internship)",
    period: "Sep 2022 - Dec 2022",
    description:
      "Designed and developed a web application using React, Node.js, and MongoDB, and implemented UI/UX designs from Figma into the system.",
  },
];

export default function ContentExperience() {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const containerRefs = useRef([]);

  useEffect(() => {
    const observers = containerRefs.current.map((ref, idx) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, idx])]);
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  return (
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8 px-4 md:px-0 mx-auto">
      <div className="flex-shrink-0 hidden md:flex justify-center items-start mt-4 relative w-40 h-40">
        {/* Foto */}
        <div className="absolute inset-2 rounded-full overflow-hidden shadow-2xl bg-white">
          <Image
            src="/images/myfoto24.png"
            alt="My Photo"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Kontainer pengalaman scrollable tanpa scrollbar */}
      <div className="flex-1 max-h-screen overflow-y-auto flex flex-col gap-6 pr-2 scrollbar-hidden">
        {experiences.map((exp, idx) => (
          <div
            key={idx}
            ref={(el) => (containerRefs.current[idx] = el)}
            className={`bg-[#1f1f1f] rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col transition-all duration-700 transform ${
              visibleIndexes.includes(idx)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h3 className="text-2xl font-semibold mb-1">{exp.role}</h3>
            <p className="text-yellow-400 font-medium mb-1">{exp.company}</p>
            <p className="text-gray-400 text-sm mb-3">{exp.period}</p>
            <p className="text-gray-200">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
