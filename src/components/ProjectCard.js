"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({
  title,
  tools,
  images,
  github,
  demo,
  isActive = false,
}) {
  const [imgIndex, setImgIndex] = useState(0);

  const brightnessClass = isActive ? "brightness-100" : "brightness-50";

  // Auto-slide gambar saat card active
  useEffect(() => {
    let interval;
    if (isActive && images.length > 1) {
      interval = setInterval(() => {
        setImgIndex((prev) => (prev + 1) % images.length);
      }, 2000);
    } else {
      setImgIndex(0);
    }
    return () => clearInterval(interval);
  }, [isActive, images.length]);

  return (
    <div className="relative max-w-[clamp(260px,80vw,840px)] aspect-[16/9] mx-auto shadow-lg overflow-hidden cursor-pointer">
      {/* Gambar container */}
      <div className="relative w-full h-[10rem] lg:h-[22rem] overflow-hidden">
        <div
          className="flex transition-transform duration-1000 ease-in-out h-full"
          style={{ transform: `translateX(-${imgIndex * 100}%)` }}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 relative rounded-md"
            >
              <Image
                src={img}
                alt={`${title}-${idx}`}
                fill
                className={`object-cover object-center rounded-md ${brightnessClass}`}
              />
            </div>
          ))}
        </div>

        {/* Tools Icon */}
        <div className="absolute right-6 bottom-4 flex flex-wrap gap-2 z-20">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="relative w-6 h-6 bg-white bg-opacity-90 rounded-full overflow-hidden border border-gray-200"
            >
              <Image src={tool} alt={title} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-center items-center transition-opacity duration-700 w-full relative z-10 ${
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <h3 className="font-semibold text-3xl sm:text-4xl md:text-4xl mb-2 text-white text-center">
          {title}
        </h3>
        {/* <div className="flex justify-center space-x-4 bg-[#202020] px-6 py-1 rounded-full">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Code
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              Demo
            </a>
          )}
        </div> */}
      </div>
    </div>
  );
}
