// components/AboutCard.js
"use client";
import Image from "next/image";

export default function AboutCard() {
  return (
    <div className=" flex justify-center mt-10 bg-amber-500 w-full h-96 rounded-lg p-4">
      <h1>aaaa</h1>
      <div className="absolute lg:w-[15rem] lg:h-[40rem] xl:w-[20rem] xl:h-[60rem] ">
        <Image
          src="/images/face.png"
          alt="Gradient"
          fill
          sizes="20vw"
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
