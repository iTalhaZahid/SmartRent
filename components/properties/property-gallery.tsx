"use client";

import Image from "next/image";
import {ChevronLeft, ChevronRight} from "lucide-react";
import {useState} from "react";
import type {Swiper as SwiperInstance} from "swiper";
import {A11y, Keyboard, Mousewheel, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export function PropertyGallery({images, title}: {images: {src: string; alt: string}[]; title: string}) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const hasMultipleImages = images.length > 1;

  return (
    <section aria-label="Property photo gallery" className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 sm:gap-4">
      <button type="button" onClick={() => swiper?.slidePrev()} disabled={!hasMultipleImages} aria-label="Previous property photo" className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-teal-600 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 sm:size-12">
        <ChevronLeft className="size-5" />
      </button>
      <div className="min-w-0 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
        <Swiper modules={[A11y, Keyboard, Mousewheel, Pagination]} onSwiper={setSwiper} rewind={hasMultipleImages} pagination={hasMultipleImages ? {clickable: true} : false} keyboard={{enabled: true}} mousewheel={{forceToAxis: true}} grabCursor={hasMultipleImages} className="aspect-[16/10] sm:aspect-[16/7] [&_.swiper-pagination-bullet-active]:bg-white">
          {images.map((image, index) => (
            <SwiperSlide key={image.src}>
              <div className="relative size-full">
                <Image src={image.src} alt={image.alt || `${title} photo ${index + 1}`} fill priority={index === 0} sizes="100vw" className="object-cover" />
                <span className="absolute bottom-4 right-4 rounded-full bg-slate-950/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {index + 1} / {images.length}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button type="button" onClick={() => swiper?.slideNext()} disabled={!hasMultipleImages} aria-label="Next property photo" className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-teal-600 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-35 sm:size-12">
        <ChevronRight className="size-5" />
      </button>
    </section>
  );
}
