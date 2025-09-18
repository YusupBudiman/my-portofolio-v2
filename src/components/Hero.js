"use client";
import Link from "next/link";
import Spline from "@splinetool/react-spline";
import Image from "next/image";
// data
import { hero, socials } from "@/data/Hero";

export default function Hero() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="layer-blur z-[-2]"></div>
      <div className="absolute to-0 right-0 z-[-1] w-[20rem] h-[20rem] lg:w-[40rem] lg:h-[40rem] ">
        <Image
          src="/images/gradient.png"
          alt="Gradient"
          fill
          sizes="40vw"
          className="object-cover "
          priority
        />
      </div>

      <div className="absolute top-[10%] left-[5%] max-w-[40rem] flex flex-col justify-center">
        {/* Link Socials */}
        <div className="flex mb-3">
          {socials.map((item, index) => (
            <Link
              key={index}
              href={item.media}
              target="_blank"
              className="mx-2 text-2xl text-blue-50 hover:text-gray-800 lg:text-4xl"
            >
              {item.icon}
            </Link>
          ))}
        </div>

        {/* Hero Content */}
        <div className="">
          <div className="title flex flex-col font-semibold text-4xl lg:text-6xl lg:items-start mb-8  ">
            {hero.title.map((item, index) => (
              <h1 key={index}>{item}</h1>
            ))}
          </div>
          <div className="tag-box mb-8">
            <h3 className="tag">{hero.subtitle}</h3>
          </div>
          <p className="text-md w-[80vw] lg:text-xl tracking-tighter lg:w-[35rem] text-gray-400">
            {hero.description}
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-full md:h-full">
        <Spline
          scene="https://prod.spline.design/2Pjo76tSvSPPIPev/scene.splinecode"
          className="w-full h-full bg-dark"
        />
      </div>
    </div>
  );
}
