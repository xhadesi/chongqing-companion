"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ImageIcon } from "lucide-react";

interface ImageSliderProps {
    images: string[];
    alt: string;
    className?: string;
    imageClassName?: string;
}

// A simple blurred placeholder
const defaultBlurDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

export function ImageSlider({ images, alt, className = "", imageClassName = "" }: ImageSliderProps) {
    // Safe default if no images somehow
    const validImages = images?.length > 0 ? images : [];

    if (validImages.length === 0) {
        return (
            <div className={`relative flex items-center justify-center bg-slate-100 dark:bg-slate-800 ${className}`}>
                <ImageIcon className="w-8 h-8 text-slate-400" />
            </div>
        );
    }

    // If only 1 image, just show it normally without the Swiper overhead
    if (validImages.length === 1) {
        return (
            <div className={`relative ${className}`}>
                <Image
                    src={validImages[0]}
                    alt={alt}
                    fill
                    className={`object-cover ${imageClassName}`}
                    placeholder="blur"
                    blurDataURL={defaultBlurDataURL}
                />
            </div>
        );
    }

    // Slider for multiple images
    return (
        <div className={`relative group ${className}`}>
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                    // Custom pagination styles are often needed to make dots visible over images
                    bulletClass: "swiper-pagination-bullet bg-white/50 opacity-100 shadow-sm",
                    bulletActiveClass: "swiper-pagination-bullet-active !bg-amber-400 !scale-125"
                }}
                className="w-full h-full"
                loop={validImages.length > 1}
            >
                {validImages.map((src, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                src={src}
                                alt={`${alt} - Image ${index + 1}`}
                                fill
                                className={`object-cover ${imageClassName}`}
                                placeholder="blur"
                                blurDataURL={defaultBlurDataURL}
                                // Only eager load the first image for performance
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* We add a subtle gradient at the bottom so pagination dots are always visible */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />
        </div>
    );
}
