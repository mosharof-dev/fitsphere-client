"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiEnvelope, BiLockAlt } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Basic validation
    if (!user.email || !user.password) {
      toast.error("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      rememberMe: true, // matching original logic
      callbackURL: "/",
    });

    if (error) {
      toast.error(`Login Failed: ${error.message || "Invalid credentials!"}`);
      console.log("Login Error:", error);
    } else if (data) {
      // Custom JWT is now generated globally via TokenProvider

      toast.success("Welcome back! Login Successful. 🎉");
      router.push("/");
    }

    setIsLoading(false);
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  const inputContainerClass =
    "group flex items-center w-full h-[50px] px-4 rounded-xl border border-white/10 bg-[#020617]/50 hover:bg-[#020617]/80 focus-within:bg-[#020617] focus-within:border-cyan-500 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300";
  const inputClass =
    "w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none ml-3";

  return (
    <div className="relative min-h-screen w-full bg-[#020617] font-sans text-white overflow-hidden flex items-center justify-center p-4 sm:p-8 xl:p-12">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-150  h-150  bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-150  h-150  bg-blue-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-7xl flex flex-col lg:flex-row bg-[#071028] rounded-[32px] sm:rounded-[40px] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.08)] overflow-hidden">
        {/* LEFT SIDE - BRANDING SECTION (Hidden on mobile <1024px) */}
        <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 flex-col justify-center p-10 xl:p-14 bg-linear-to-br from-[#020617] via-[#020617]/90 to-transparent relative z-20">
          {/* Subtle linear overlay on left section */}
          <div className="absolute inset-0 bg-linear-to-t from-cyan-900/10 to-transparent pointer-events-none" />

          <div className="flex flex-col gap-10">
            {/* Top Brand */}
            <div className="relative z-10 flex items-center gap-3 w-fit">
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-bold tracking-wider flex items-center gap-2 backdrop-blur-md">
                <span className="text-base">🏋️</span> FITSPHERE
              </div>
            </div>

            {/* Headline & Description */}
            <div className="relative z-10 max-w-lg">
              <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-5 tracking-tight text-white">
                Welcome Back to
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  Your Fitness Journey.
                </span>
              </h1>
              <p className="text-[17px] text-slate-400 leading-relaxed font-light">
                Sign in to track your progress, connect with trainers, and
                access your personalized workout plans. Let&apos;s crush
                today&apos;s goals.
              </p>
            </div>

            {/* Features List & Stats */}
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-xl shrink-0">
                  ⚡
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Instant Access
                  </h3>
                  <p className="text-slate-400 text-sm leading-snug">
                    Jump right back into your active routines and schedules.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xl shrink-0">
                  🏆
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Achieve Milestones
                  </h3>
                  <p className="text-slate-400 text-sm leading-snug">
                    Unlock new achievements as you progress every day.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Vertical Image */}
            <div className="relative z-10 w-full h-60 xl:h-70 rounded-[24px] overflow-hidden shadow-xl shadow-cyan-900/10 border border-white/5 shrink-0 mt-4">
              <Image
                src="/images/login_gym_vertical.png"
                alt="Premium Fitness Environment"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="flex w-full lg:w-[55%] xl:w-1/2 flex-col items-center justify-center p-6 sm:p-10 xl:p-16 bg-[#071028] relative z-10">
          <div className="w-full max-w-115 relative z-20">
            {/* Mobile Header Badge (Only on mobile) */}
            <div className="lg:hidden flex items-center justify-center mb-8">
              <div className="px-5 py-2 rounded-full bg-white/5 border border-cyan-500/30 text-cyan-400 text-sm font-bold tracking-wider flex items-center gap-2">
                <span className="text-lg">🏋️</span> FITSPHERE
              </div>
            </div>

            {/* Form Header */}
            <div className="mb-6">
              <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                Sign In
              </h2>
              <p className="text-slate-400 text-[14px] leading-relaxed max-w-[90%]">
                Welcome back! Please enter your details to access your account
                and continue your journey.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {/* Email Address */}
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className={inputContainerClass}>
                  <BiEnvelope className="text-xl text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative flex flex-col">
                  <div className={inputContainerClass}>
                    <BiLockAlt className="text-xl text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                    <input
                      required
                      name="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Enter your password"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => setIsVisible(!isVisible)}
                      className="p-2 text-slate-400 hover:text-white transition-colors ml-auto shrink-0"
                    >
                      {isVisible ? (
                        <BsEye className="text-lg" />
                      ) : (
                        <BsEyeSlash className="text-lg" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mt-1 mb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      name="remember"
                      defaultChecked
                      className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-white/5 checked:bg-cyan-500 checked:border-cyan-500 transition-colors cursor-pointer"
                    />
                    <svg
                      className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-[13px] text-slate-400 group-hover:text-slate-300 transition-colors">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[13px] font-medium text-cyan-400 hover:text-cyan-300 transition-colors hover:underline underline-offset-4"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-1 relative flex h-12.5 w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[11px] font-semibold uppercase tracking-wider">
                <span className="bg-[#071028] px-4 text-slate-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button - Premium Outline Style */}
            <button
              onClick={signinWithGoogle}
              type="button"
              className="group flex h-12.5 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-transparent text-sm font-semibold text-white transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-[#071028]"
            >
              <FcGoogle className="text-xl group-hover:scale-110 transition-transform" />
              Sign In with Google
            </button>

            {/* Footer Link */}
            <p className="mt-6 text-center text-[13px] text-slate-400 font-medium">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline underline-offset-4"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
