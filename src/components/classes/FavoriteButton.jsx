"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { checkIfFavorite } from "@/lib/api/favorites";
import { addFavoriteToDB, removeFavoriteFromDB } from "@/lib/actions/favorites";
import { useRouter } from "next/navigation";

export default function FavoriteButton({ classData }) {
  const { data: session, isPending } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (session?.user?.email && classData?._id) {
        try {
          const status = await checkIfFavorite(classData._id, session.user.email);
          setIsFavorite(status);
        } catch (error) {
          console.error("Failed to check favorite status:", error);
        }
      }
      setIsLoading(false);
    };

    if (!isPending) {
      fetchFavoriteStatus();
    }
  }, [session, isPending, classData]);

  const toggleFavorite = async () => {
    if (!session?.user) {
      toast.error("Please login to manage favorites");
      return router.push("/login");
    }

    if (session.user.role === "admin") {
      toast.error("Admins do not have access to favorite classes.");
      return;
    }

    if (session.user.status === "blocked") {
      toast.error("Action restricted by Admin. You are blocked.");
      return;
    }

    if (session.user.role === "trainer") {
      toast.error("Trainers do not have access to favorite classes.");
      return;
    }

    try {
      setIsLoading(true);
      if (isFavorite) {
        await removeFavoriteFromDB(classData._id, session.user.email);
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        const favoritePayload = {
          userEmail: session.user.email,
          classId: classData._id,
          className: classData.class_name,
          image: classData.featured_image_url,
          trainerName: classData.trainerName,
          price: classData.price,
          duration: classData.duration,
          time: classData.time,
        };
        await addFavoriteToDB(favoritePayload);
        setIsFavorite(true);
        toast.success("Added to favorites");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
        isFavorite
          ? "bg-[#ef4444]/10 border border-[#ef4444]/50 text-[#ef4444]"
          : "bg-white/5 border border-white/10 hover:border-[#ef4444]/50 hover:bg-[#ef4444]/10 text-white hover:text-[#ef4444]"
      } disabled:opacity-50 disabled:cursor-not-allowed group`}
    >
      <Heart
        className={`w-5 h-5 transition-colors ${
          isFavorite ? "fill-[#ef4444] text-[#ef4444]" : "group-hover:fill-[#ef4444]"
        }`}
      />
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
