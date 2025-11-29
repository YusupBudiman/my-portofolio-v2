"use client";
import Link from "next/link";
// import Spline from "@splinetool/react-spline";
import Image from "next/image";
// data
import { hero, socials } from "@/data/Hero";

export default function Hero() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="absolute top-20 left-0 right-0 flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="px-1 pt-1 pb-2 bg-white mb-4 rotate-355">
            <Image
              src="/images/myfoto24.png"
              className="bg-gradient-to-br from-[#232323] to-[#5f5f5f] object-cover  w-12 h-12"
              width={200}
              height={200}
              alt="Hero Background"
            />
          </div>

          <h1 className="text-2xl text-white font-semibold mb-6">
            Full Stack, Full Impact
          </h1>
          <p className="max-w-md text-center text-sm text-gray-300 mb-6">
            I build modern web applications from frontend to backend with a
            focus on performance, clarity, and a seamless user experience.
          </p>
          <div className="flex items-center justify-between gap-2">
            <Link
              href={"#contact"}
              className="text-[#18181a] bg-[#f9fc9f] border-2 border-[#e3e8b8] px-4 py-1 rounded-xs text-xs font-semibold"
            >
              WORK WITH ME
            </Link>
            <Link
              href={"#projects"}
              className="text-white bg-gradient-to-b from-[#252525] to-[#171717] border-2 border-[#242224] px-4 py-1 rounded-xs text-xs font-semibold"
            >
              PROJECTS
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-white mb-2">
            Fast learner. Highly adaptable. Experienced though academy
            projects,internship work, and personal full-stack builds.
          </p>
          <span className="text-sm text-[#e3e8b8]">
            developer@yusupbudiman3@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
