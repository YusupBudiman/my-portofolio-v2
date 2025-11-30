"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import ContactForm from "./ContactForm";
import skills from "@/data/skills";

export default function ContactSection() {
  const [showForm, setShowForm] = useState(false);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [hoveredText, setHoveredText] = useState("");
  const [activeLogos, setActiveLogos] = useState([]);
  const [animationKey, setAnimationKey] = useState(0);

  const fullText = "Contact";
  const buttonRef = useRef(null);
  const spellTimeouts = useRef([]);
  const sectionRef = useRef(null);
  const randomRotationsRef = useRef([]);

  // Spell text saat hover
  const spellText = () => {
    let textArray = Array(fullText.length).fill("-");
    setHoveredText(textArray.join(""));

    spellTimeouts.current.forEach((t) => clearTimeout(t));
    spellTimeouts.current = [];

    for (let i = 0; i < fullText.length; i++) {
      const timeout = setTimeout(() => {
        textArray[i] = fullText[i];
        setHoveredText(textArray.join(""));
      }, i * 100);
      spellTimeouts.current.push(timeout);
    }
  };

  const handleMouseLeave = () => {
    if (!showForm) {
      setButtonHover(false);
      setButtonOffset({ x: 0, y: 0 });
      setHoveredText(fullText);

      spellTimeouts.current.forEach((t) => clearTimeout(t));
      spellTimeouts.current = [];
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setShowForm(false);
    setHoveredText(fullText);
    setButtonOffset({ x: 0, y: 0 });
  };

  // Observer untuk aktifkan logo saat muncul
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveLogos([]);
          setTimeout(() => {
            const shuffled = shuffleArray(skills);
            setActiveLogos(shuffled);
            randomRotationsRef.current = shuffled.map(
              () => (Math.random() - 0.5) * 40
            );
            setAnimationKey((prev) => prev + 1);
          }, 100);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex min-h-screen items-center justify-center overflow-hidden transition-colors duration-700 bg-[#161616]"
    >
      {/* Background Image saat showForm = true */}
      <div
        className={`absolute inset-0 bg-[url('/images/dodle-bg.jpg')] bg-cover bg-center bg-no-repeat z-0 transition-opacity duration-700 ${
          showForm ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      {/* Overlay gelap sebelum tombol diklik */}
      {!showForm && <div className="absolute inset-0 bg-black/50 z-0"></div>}

      {/* LOGO ORBIT */}
      {activeLogos.map((item, index) => {
        const { transform, rotation } = getOrbitTransform(
          index,
          buttonHover,
          showForm,
          activeLogos.length
        );
        const randomRotation = randomRotationsRef.current[index] || 0;

        return (
          <div
            key={`${animationKey}-${index}`}
            className="absolute flex items-center justify-center z-50 logo-wrapper"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div
              className="logo-inner"
              style={{
                transform: `${transform} ${rotation} rotate(${randomRotation}deg)`,
                transition: "transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Image
                src={item.img}
                alt="Skills Icon"
                width={200}
                height={200}
                className="logo"
              />
            </div>
          </div>
        );
      })}

      {/* LINGKARAN BESAR SAAT KLIK */}
      <div
        className={`absolute rounded-full pointer-events-none
          w-52 h-52 transform transition-all duration-700 ease-out
          z-30
          ${showForm ? "scale-[12] bg-black/10" : "scale-0 bg-[#161616]"}`}
      ></div>

      {/* TOMBOL / FORM */}
      <div
        ref={buttonRef}
        onMouseEnter={() => {
          if (!showForm) {
            setButtonHover(true);
            spellText();
          }
        }}
        onMouseLeave={handleMouseLeave}
        onMouseMove={(e) => {
          if (!showForm) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            setButtonOffset({ x: x * 0.05, y: y * 0.05 });
          }
        }}
        onClick={() => {
          if (!showForm) setShowForm(true);
        }}
        className="relative flex items-center justify-center shadow-2xl cursor-pointer z-20 transition-all duration-700"
        style={{
          width: showForm ? "500px" : "208px",
          height: showForm ? "auto" : "208px",
          borderRadius: showForm ? "1rem" : "9999px",
          padding: showForm ? "2rem" : "0",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
        }}
      >
        {!showForm ? (
          <span
            className="text-5xl font-bold select-none text-white flex items-baseline"
            style={{
              transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
            }}
          >
            {hoveredText || fullText}
            <span className="ml-1 w-2 h-2 bg-yellow-400 inline-block align-baseline"></span>
          </span>
        ) : (
          <div className="w-full relative z-30">
            <ContactForm onClose={handleClose} />
          </div>
        )}
      </div>
    </section>
  );
}

// Shuffle array
const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

// Fungsi posisi orbit dan rotasi logo
const getOrbitTransform = (index, isHover, isActive, total) => {
  const centerIndex = (total - 1) / 2;
  const normalSpacing = 8;
  const hoverSpacing = 10;
  const normalAmplitude = 14;
  const hoverAmplitude = 18;

  if (isActive) {
    const radius = 20; // vw
    const angle = (index / total) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    const rotation = ` rotate(${(angle * 180) / Math.PI + 90}deg)`;

    return { transform: `translate(${x}vw, ${y}vh)`, rotation };
  }

  if (isHover) {
    const x = (index - centerIndex) * hoverSpacing;
    const y = Math.sin(index * 0.9) * hoverAmplitude;
    return { transform: `translate(${x}vw, ${y}vh)`, rotation: "" };
  }

  const x = (index - centerIndex) * normalSpacing;
  const y = Math.sin(index * 0.9) * normalAmplitude;
  return { transform: `translate(${x}vw, ${y}vh)`, rotation: "" };
};
