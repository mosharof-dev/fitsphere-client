"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Timer, Award } from "lucide-react";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { checkBooking } from "@/lib/api/bookings";
import { toast } from "sonner";

export default function ClassSidebar({ singleClass }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isBooked, setIsBooked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBookingStatus = async () => {
      if (session?.user?.email && singleClass?._id) {
        try {
          const res = await checkBooking(session.user.email, singleClass._id);
          setIsBooked(res.isBooked);
        } catch (error) {
          console.error("Error checking booking status:", error);
        }
      }
    };
    checkBookingStatus();
  }, [session, singleClass]);

  const handleBookNow = () => {
    if (!session?.user) {
      toast.error("Please login to book a class");
      router.push("/login");
      return;
    }
    if (session.user.status === 'blocked') {
      toast.error("Action restricted by Admin. You are blocked.");
      return;
    }
    if (isBooked) {
      toast.error("You have already booked this class");
      return;
    }
    // Redirect to payment page
    router.push(`/payment/${singleClass._id}`);
  };

  return (
    <div className="space-y-8">
      <div className="sticky top-8 bg-[#0f172a]/80 backdrop-blur-2xl p-8 rounded-[32px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
        
        {/* Price */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Investment</p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]">
              ${singleClass.price}
            </span>
            <span className="text-slate-400 font-medium text-lg">/ session</span>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-8"></div>
        
        {/* Schedule Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Schedule Days</p>
              <p className="text-white font-semibold text-lg">{singleClass.days?.join(", ")}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-[#3B82F6]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Start Time</p>
              <p className="text-white font-semibold text-lg">{singleClass.time}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <Timer className="w-6 h-6 text-[#06B6D4]" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Duration</p>
              <p className="text-white font-semibold text-lg">{singleClass.duration}</p>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 my-8"></div>

        {/* Trainer Info */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Instructor</p>
          <div className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#06B6D4]/30 group-hover:border-[#06B6D4] transition-colors">
              <Image 
                src={singleClass.trainerImage} 
                alt={singleClass.trainerName} 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-white text-lg flex items-center gap-2">
                {singleClass.trainerName}
                <Award className="w-4 h-4 text-[#3B82F6]" />
              </p>
              <p className="text-sm text-slate-400">{singleClass.trainerEmail}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          {(!session?.user || session.user.role === "user") && (
            <button 
              onClick={handleBookNow}
              disabled={isBooked}
              className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isBooked 
                  ? 'bg-slate-600 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isBooked ? "Already Booked" : "Book Now"}
            </button>
          )}
          <FavoriteButton classData={singleClass} />
        </div>
      </div>
    </div>
  );
}
