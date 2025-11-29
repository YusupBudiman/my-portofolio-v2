// ProjectCarousel.jsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import ProjectCard from "./ProjectCard";

export default function ProjectCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="w-full py-10">
      <Swiper
        modules={[Autoplay, EffectCreative]}
        effect="creative"
        grabCursor={true}
        centeredSlides={true}
        initialSlide={1}
        slidesPerView="auto"
        loop={false}
        spaceBetween={40}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        navigation
        creativeEffect={{
          prev: {
            shadow: false,
            translate: ["-85%", 0, -200],
            scale: 0.75,
          },
          next: {
            shadow: false,
            translate: ["85%", 0, -200],
            scale: 0.75,
          },
        }}
        onSwiper={(swiper) => {
          swiper.on("reachEnd", () => {
            swiper.params.autoplay.reverseDirection = true;
            swiper.autoplay.start();
          });
          swiper.on("reachBeginning", () => {
            swiper.params.autoplay.reverseDirection = false;
            swiper.autoplay.start();
          });
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full"
      >
        {projects.map((project, index) => (
          <SwiperSlide
            key={project.id}
            className="w-full max-w-[260px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[920px]"
          >
            <ProjectCard {...project} isActive={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
