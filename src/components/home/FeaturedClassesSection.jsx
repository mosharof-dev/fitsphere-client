"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiUsers, FiClock } from "react-icons/fi";
import { getFeaturedClasses } from "@/lib/actions/classes";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedClassesSection() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const data = await getFeaturedClasses();
      setClasses(data || []);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (!loading && classes.length === 0) return null;

  return (
    <section className="relative py-24 bg-[#071028] text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Featured{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
                Classes
              </span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl text-lg">
              Discover our most popular and highly booked fitness sessions.
            </p>
          </div>
          <div>
            <Link
              href="/classes"
              className="group flex items-center space-x-2 text-[#06B6D4] font-semibold hover:text-cyan-300 transition-colors text-lg"
            >
              <span>View All Classes</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-full md:w-1/2 lg:w-1/3 shrink-0 h-[450px] bg-[#0B1120] rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {classes.map((cls) => (
              <SwiperSlide key={cls._id}>
                <div className="group relative h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.6)] bg-[#0B1120] flex flex-col border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                  {/* Image Header */}
                  <div className="relative h-[200px] w-full shrink-0">
                    {cls.featured_image_url ? (
                      <Image
                        src={cls.featured_image_url}
                        alt={cls.class_name || "Featured Class"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-[#0B1120]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 shadow-lg">
                      <FiUsers className="text-cyan-400" />
                      <span className="text-sm font-bold text-white">{cls.bookingCount} Booked</span>
                    </div>
                    <div className="absolute top-4 left-4 bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      {cls.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 relative z-10 -mt-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {cls.class_name}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {cls.description}
                    </p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      {cls.trainerImage ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                          <Image src={cls.trainerImage} alt={cls.trainerName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {cls.trainerName?.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-slate-300 truncate">{cls.trainerName}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <FiClock className="text-cyan-500" />
                        {cls.duration}
                      </div>
                      <div className="text-lg font-bold text-white">
                        ${cls.price}
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay button on hover */}
                  <div className="absolute inset-0 bg-[#020617]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                    <Link href={`/classes/${cls._id}`} className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:scale-105">
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
