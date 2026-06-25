"use client";

import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getClassesId } from "@/lib/api/classes";
import { createCheckoutSession } from "@/lib/api/payments";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";

export default function PaymentPage({ params }) {
  const router = useRouter();
  const { data: session } = useSession();
  const resolvedParams = use(params);
  const classId = resolvedParams.classId;

  const [singleClass, setSingleClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await getClassesId(classId);
        setSingleClass(data);
      } catch (error) {
        console.error("Failed to fetch class:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [classId]);

  const handleProceedToCheckout = async () => {
    if (!session?.user) {
      toast.error("Please login to proceed to checkout");
      router.push("/login");
      return;
    }

    setCheckoutLoading(true);
    try {
      const response = await createCheckoutSession({
        price: singleClass.price,
        className: singleClass.class_name || singleClass.name, // Support both properties if inconsistent
        classId: singleClass._id,
        trainerName: singleClass.trainerName,
        customerEmail: session.user.email,
        classImage: singleClass.featured_image_url || singleClass.image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
      });

      if (response.url) {
        window.location.href = response.url; // Redirect to Stripe Hosted Checkout
      } else {
        toast.error("Failed to get checkout URL");
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout");
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="w-8 h-8 border-4 border-[#06B6D4]/30 border-t-[#06B6D4] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!singleClass) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Class not found</h2>
          <Link
            href="/classes"
            className="inline-block px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all"
          >
            Back to Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative pt-24 pb-20 px-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06B6D4] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#3B82F6] opacity-10 blur-[150px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <Link 
          href={`/classes/${classId}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Class
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white mb-2">Complete Booking</h1>
          <p className="text-slate-400">Review your order details below and proceed to our secure Stripe checkout.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Order Summary Card */}
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 border border-white/5">
              <Image 
                src={singleClass.featured_image_url || singleClass.image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b"} 
                alt={singleClass.class_name || singleClass.name} 
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Item</span>
                <span className="font-semibold text-white">{singleClass.class_name || singleClass.name}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-slate-400">Trainer</span>
                <span className="font-semibold text-white">{singleClass.trainerName}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-white">Total Due</span>
              <span className="text-3xl font-extrabold text-[#06B6D4]">
                ${singleClass.price}
              </span>
            </div>
          </div>

          {/* Payment Card */}
          <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Payment</h2>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                <Lock className="w-3 h-3 text-slate-400" />
                <span className="text-xs text-slate-400 font-medium">Secure Checkout</span>
              </div>
            </div>

            <div className="bg-[#020617] border border-white/5 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-[#06B6D4] shrink-0" />
              <p className="text-sm text-slate-400 leading-relaxed">
                You will be redirected to <span className="font-semibold text-white">Stripe</span> to complete your purchase securely. We do not store any of your payment information.
              </p>
            </div>

            <button
              onClick={handleProceedToCheckout}
              disabled={checkoutLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:opacity-90 text-white rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {checkoutLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Redirecting...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Proceed to Checkout
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
