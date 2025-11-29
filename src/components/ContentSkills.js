"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import skills from "@/data/skills";

export default function SkillsSection() {
  const [activeLogos, setActiveLogos] = useState([]);
  const [buttonHover, setButtonHover] = useState(false);
  const [buttonActive, setButtonActive] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [hoveredText, setHoveredText] = useState("");
  const fullText = "Skills";
  const prefixLength = fullText.length;

  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const spellTimeouts = useRef([]);

  // Random rotation for wave/misaligned effect
  const randomRotationsRef = useRef([]);

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

  const handleMouseLeave = () => {
    setButtonHover(false);
    setButtonOffset({ x: 0, y: 0 });
    setHoveredText(fullText);

    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transition = "transform 0.6s cubic-bezier(0.68, -0.8, 0.27, 1.8)";
    btn.style.transform = "translate(0px, 0px) scale(1.05)";
    setTimeout(() => {
      if (!btn) return;
      btn.style.transform = "translate(0px, 0px) scale(1)";
    }, 300);

    spellTimeouts.current.forEach((t) => clearTimeout(t));
    spellTimeouts.current = [];
  };

  // Spell: ganti prefix ----- menjadi SKILLS satu per satu lebih cepat
  const spellText = () => {
    let textArray = Array(prefixLength).fill("-");
    setHoveredText(textArray.join(""));

    spellTimeouts.current.forEach((t) => clearTimeout(t));
    spellTimeouts.current = [];

    for (let i = 0; i < fullText.length; i++) {
      const timeout = setTimeout(() => {
        textArray[i] = fullText[i];
        setHoveredText(textArray.join(""));
      }, i * 100); // delay 100ms per langkah → cepat
      spellTimeouts.current.push(timeout);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-700
      ${buttonActive ? "bg-white" : "bg-[#161616]"}`}
    >
      {/* LOGO */}
      {activeLogos.map((item, index) => {
        const { transform, rotation } = getOrbitTransform(
          index,
          buttonHover,
          buttonActive,
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
        ${buttonActive ? "scale-[12] bg-black/10" : "scale-0 bg-[#161616]"}`}
      ></div>

      {/* TOMBOL SKILLS */}
      <div className="absolute inset-0 flex items-center justify-center z-60">
        <div
          ref={buttonRef}
          onMouseEnter={() => {
            setButtonHover(true);
            spellText();
          }}
          onMouseLeave={handleMouseLeave}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            setButtonOffset({ x: x * 0.05, y: y * 0.05 });
          }}
          onClick={() => setButtonActive(!buttonActive)}
          className={`flex w-52 h-52 rounded-full items-center justify-center
            shadow-2xl cursor-pointer
            ${buttonActive ? "" : "animate-pulse"}`}
          style={{
            // Glass effect
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px) scale(1)`,
            transition: buttonHover
              ? "none"
              : "transform 0.6s cubic-bezier(0.68, -0.8, 0.27, 1.8)",
          }}
        >
          <span
            className="text-5xl font-bold select-none flex items-baseline"
            style={{
              transform: `translate(${buttonOffset.x}px, ${buttonOffset.y}px)`,
              transition: buttonHover
                ? "none"
                : "transform 0.6s cubic-bezier(0.68, -0.8, 0.27, 1.8)",
              color: buttonActive ? "rgba(0,0,0)" : " rgba(255,255,255)",
            }}
          >
            {hoveredText || fullText}
            {/* Kotak kuning lebih kecil, sejajar baseline */}
            <span className="ml-1 w-2 h-2 bg-yellow-400 inline-block align-baseline"></span>
          </span>
        </div>
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
