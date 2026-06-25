"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getClassesId } from "@/lib/api/classes";
import { createBooking } from "@/lib/api/bookings";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const classId = searchParams.get("classId");
  const router = useRouter();
  
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(true);
  const [singleClass, setSingleClass] = useState(null);
  const [error, setError] = useState(false);

  const hasRun = React.useRef(false);

  useEffect(() => {
    const handleSuccess = async () => {
      if (isPending) return;
      if (hasRun.current) return;
      hasRun.current = true;

      if (!session?.user || !sessionId || !classId) {
        setLoading(false);
        setError(true);
        return;
      }

      try {
        // Fetch class details
        const classData = await getClassesId(classId);
        setSingleClass(classData);

        // Save booking
        const bookingData = {
          userEmail: session.user.email,
          userName: session.user.name,
          classId: classData._id,
          className: classData.class_name || classData.name,
          trainerName: classData.trainerName,
          schedule: `${classData.days?.join(", ")} at ${classData.time}`,
          price: classData.price,
          transactionId: sessionId,
          status: "Paid",
        };

        try {
          await createBooking(bookingData);
          toast.success("Booking confirmed successfully!");
        } catch (bookingErr) {
          if (bookingErr.message?.includes("already booked") || bookingErr.status === 400) {
            console.log("Already booked");
          } else {
            console.error(bookingErr);
          }
        }
      } catch (err) {
        console.error("Error processing success:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    handleSuccess();
  }, [session, isPending, sessionId, classId]);

  if (loading || isPending) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium">Finalizing your booking...</p>
      </div>
    );
  }

  if (error || !singleClass) {
    return (
      <div className="bg-[#0f172a] border border-white/10 p-10 rounded-3xl text-center max-w-md relative z-10">
        <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-slate-400 mb-8">We couldn't verify your booking session. If you were charged, please contact support.</p>
        <Link
          href="/classes"
          className="inline-flex w-full justify-center px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
        >
          Back to Classes
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 w-full max-w-lg relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-[#06B6D4]/10 text-[#06B6D4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Payment Complete!</h1>
        <p className="text-slate-400">You have successfully enrolled in this class.</p>
      </div>

      <div className="bg-[#020617] border border-white/5 rounded-2xl p-6 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-400 text-sm">Course</span>
            <span className="font-semibold text-white text-right">{singleClass.class_name || singleClass.name}</span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-white/5">
            <span className="text-slate-400 text-sm">Price</span>
            <span className="font-semibold text-[#06B6D4]">${singleClass.price}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Transaction ID</span>
            <span className="font-mono text-xs text-slate-300 bg-white/5 px-2 py-1 rounded truncate max-w-[180px]" title={sessionId}>
              {sessionId}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard/user/booked-classes"
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-90 text-white rounded-xl font-bold transition-colors"
        >
          View Booked Class
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/"
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-medium transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-[#06B6D4] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>
      
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4 relative z-10">
          <div className="w-10 h-10 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
          <p className="text-slate-400 font-medium">Loading...</p>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}
