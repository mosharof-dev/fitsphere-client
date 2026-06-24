"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { getUserFavorites } from "@/lib/api/favorites";
import { removeFavoriteFromDB } from "@/lib/actions/favorites";
import { toast } from "sonner";
import { Clock, Timer, Trash2, Dumbbell, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function FavoritesList() {
  const { data: session, isPending } = useSession();
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view favorites");
      router.push("/login");
      return;
    }

    const fetchFavorites = async () => {
      if (session?.user?.email) {
        try {
          const data = await getUserFavorites(session.user.email);
          setFavorites(data);
        } catch (error) {
          console.error("Failed to load favorites", error);
          toast.error("Failed to load favorite classes");
        }
      }
      setIsLoading(false);
    };

    if (!isPending && session?.user) {
      fetchFavorites();
    }
  }, [session, isPending, router]);

  const handleRemove = async (classId) => {
    if (!session?.user?.email) return;

    try {
      await removeFavoriteFromDB(classId, session.user.email);
      setFavorites((prev) => prev.filter((fav) => fav.classId !== classId));
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(error.message || "Failed to remove favorite");
    }
  };

  if (isPending || isLoading) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 rounded-2xl h-64 w-full"
          ></div>
        ))}
      </div>
    );
  }

  // Fallback in case redirect takes a moment
  if (!session?.user) return null;

  if (favorites.length === 0) {
    return (
      <div className="text-center py-20 bg-[#0f172a] border border-white/10 rounded-3xl">
        <div className="w-20 h-20 bg-gradient-to-tr from-[#06B6D4]/20 to-[#3B82F6]/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Dumbbell className="w-10 h-10 text-[#06B6D4]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h3>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          You haven&apos;t added any classes to your favorites. Explore our
          classes and find the perfect workout for you!
        </p>
        <Link
          href="/classes"
          className="inline-flex py-3 px-8 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl font-bold text-white hover:scale-105 transition-transform"
        >
          Explore Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 mt-4">
      {favorites.map((fav) => (
        <div
          key={fav._id}
          className="group flex flex-col md:flex-row bg-[#0f172a]/80 backdrop-blur-md border border-white/10 rounded-[24px] overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]"
        >
          {/* Image Section - Left side on desktop */}
          <div className="relative w-full md:w-[320px] lg:w-[400px] h-[240px] md:h-auto overflow-hidden shrink-0">
            <Image
              src={fav.image || "/images/placeholder.jpg"}
              alt={fav.className || "Class Image"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Tags overlay like in the reference image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              <span className="bg-[#06B6D4] text-black font-bold px-3 py-1 text-xs rounded-full shadow-lg">
                Favorite
              </span>
            </div>
            {/* Gradient overlay for smooth transition */}
            <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#0f172a] to-transparent hidden md:block z-10 pointer-events-none"></div>
          </div>

          {/* Content Section - Right side on desktop */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between relative z-20">
            <div>
              <div className="flex justify-between items-start mb-2 gap-4">
                <Link href={`/classes/${fav.classId}`}>
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#06B6D4] transition-colors line-clamp-1">
                    {fav.className || "Unnamed Class"}
                  </h3>
                </Link>
              </div>

              <p className="text-sm md:text-base text-slate-300 mb-6 line-clamp-2">
                Trainer:{" "}
                <span className="font-semibold text-white">
                  {fav.trainerName || "Unknown"}
                </span>
              </p>

              {/* Badges/Schedule info */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 text-sm">
                  <Clock className="w-4 h-4 text-[#06B6D4]" />
                  <span>{fav.time || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-slate-300 text-sm">
                  <Timer className="w-4 h-4 text-[#3B82F6]" />
                  <span>{fav.duration || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Price & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                  Price
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-[#06B6D4]">
                    ${fav.price || "0"}
                  </span>
                  <span className="text-slate-400 text-sm">/class</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={`/classes/${fav.classId}`}
                  className="flex items-center gap-2 py-2.5 px-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-white transition-all hover:scale-105 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
                <button
                  onClick={() => handleRemove(fav.classId)}
                  className="flex items-center gap-2 py-2.5 px-5 bg-white/5 hover:bg-[#ef4444]/10 border border-white/10 hover:border-[#ef4444]/50 rounded-xl font-semibold text-slate-300 hover:text-[#ef4444] transition-all group/btn"
                >
                  <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
