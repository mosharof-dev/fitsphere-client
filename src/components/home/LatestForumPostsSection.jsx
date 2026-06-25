"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { getAllForumPosts } from "@/lib/actions/forum";
import { format } from "date-fns";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function LatestForumPostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      // The API sorts by latest (_id: -1) by default. limit=8
      const data = await getAllForumPosts(1, 8);
      setPosts(data?.posts || []);
      setLoading(false);
    };
    fetchLatestPosts();
  }, []);

  if (!loading && posts.length === 0) return null;

  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Community{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
                Conversations
              </span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl text-lg">
              Check out the latest tips, tricks, and discussions from our expert trainers and members.
            </p>
          </div>
          <div>
            <Link
              href="/forum"
              className="group flex items-center space-x-2 text-[#06B6D4] font-semibold hover:text-cyan-300 transition-colors text-lg"
            >
              <span>Join the Forum</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-full md:w-1/2 lg:w-1/3 shrink-0 h-[380px] bg-[#0B1120] rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-16"
          >
            {posts.map((post) => (
              <SwiperSlide key={post._id}>
                <div className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.6)] bg-[#0B1120] flex flex-col border border-white/5 hover:border-cyan-500/30 transition-all duration-300">
                  {/* Image Header */}
                  <div className="relative h-[180px] w-full shrink-0">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-300 border border-white/10 shadow-lg">
                      {post.createdAt ? format(new Date(post.createdAt), 'MMM dd, yyyy') : 'Recent'}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-1 relative z-10 -mt-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                      {post.description}
                    </p>

                    <div className="mt-auto flex items-center gap-3">
                      {post.authorImage ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden relative shrink-0 border border-white/10">
                          <Image src={post.authorImage} alt={post.authorName} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {post.authorName?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-medium text-slate-300 block leading-none mb-1 truncate max-w-[150px]">{post.authorName}</span>
                        <span className="text-[10px] text-cyan-500 uppercase tracking-wider font-bold block leading-none">{post.authorRole}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay button on hover */}
                  <div className="absolute inset-0 bg-[#020617]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-sm">
                    <Link href={`/forum/${post._id}`} className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2.5 rounded-full font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all hover:scale-105 text-sm">
                      Read Full Post
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
