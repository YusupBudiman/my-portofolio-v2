// components/AboutCard.js
"use client";
import Image from "next/image";
import { useState } from "react";

export default function AboutCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex justify-center mt-10">
      <div
        className="w-64 h-96 perspective cursor-pointer"
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className={`relative w-full h-full transform-style-preserve-3d card-thickness ${
            flipped ? "card-flipped" : "card-3d"
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full backface-hidden bg-amber-950 rounded-xl flex flex-col items-center justify-center p-4">
            {/* <Image
              src="/foto.jpg"
              alt="Foto"
              width={120}
              height={120}
              className="rounded-full object-cover mb-4"
            /> */}
            <h3 className="text-white text-lg font-semibold">Yusup Budiman</h3>
            <p className="text-white">ID: 123456789</p>
          </div>
        </div>
      </div>
    </div>
  );
}
