"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProjectCard({
  title,
  description,
  tools,
  images, // array of images
  github,
  demo,
  isActive = false,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isHovered || images.length < 2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, images]);

  const brightnessClass = isActive ? "brightness-100" : "brightness-50";
  const finalBrightness = isHovered ? "brightness-110" : brightnessClass;

  return (
    <div
      className="relative w-full max-w-full mx-auto rounded-xl shadow-lg overflow-hidden overflow-x-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentIndex(0);
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[400px] rounded-t-xl overflow-hidden">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={title}
            fill
            priority
            className={`object-cover object-center transition-opacity duration-1000 ease-in-out
              ${currentIndex === index ? "opacity-100" : "opacity-0"}
              ${finalBrightness}`}
          />
        ))}
      </div>

      {/* Content Below Image */}
      <div
        className={`p-6 flex flex-col justify-center items-center transition-opacity duration-700
          ${isActive ? "opacity-100" : "opacity-0"} w-full`}
      >
        <h3 className="font-semibold text-3xl sm:text-4xl md:text-5xl mb-2 text-white text-center">
          {title}
        </h3>
        <p className="text-sm sm:text-base mb-4 text-white/80 text-center">
          {description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="bg-[#f9fc9f] bg-opacity-80 px-2 py-1 rounded-full text-xs font-bold text-black"
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="flex justify-center space-x-4 bg-[#202020] px-6 py-1 rounded-full">
          <Link href={github} target="_blank" className=" text-white">
            Code
          </Link>
          <Link href={demo} target="_blank" className=" text-white">
            Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
