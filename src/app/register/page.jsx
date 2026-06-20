"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiUser, BiEnvelope, BiLockAlt, BiImageAdd } from "react-icons/bi";
import {
  BsEye,
  BsEyeSlash,
  BsCheckCircleFill,
  BsXCircleFill,
} from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { uploadToImgBB } from "@/lib/actions/image-upload";

const SignUp = () => {
  const router = useRouter();

  // Form State
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password Validation Rules
  const isLengthValid = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");

    if (!isLengthValid || !hasUppercase || !hasNumber) {
      toast.error("Please meet all password requirements.");
      setIsLoading(false);
      return;
    }

    let imageUrl = "";
    if (imageFile) {
      const uploadedUrl = await uploadToImgBB(imageFile);
      if (!uploadedUrl) {
        toast.error("Failed to upload profile image.");
        setIsLoading(false);
        return;
      }
      imageUrl = uploadedUrl;
    }

    const { data, error } = await authClient.signUp.email({
      name: fullName,
      email: email,
      password: password,
      image: imageUrl,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(
        `Registration Failed: ${error.message || "Something went wrong!"}`,
      );
    } else if (data) {
      toast.success("Registration Successful! 🎉 Please login to continue.");
      await authClient.signOut();
      router.push("/login");
    }

    setIsLoading(false);
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const inputContainerClass =
    "group flex items-center w-full h-[50px] px-4 rounded-xl border border-white/10 bg-[#020617]/50 hover:bg-[#020617]/80 focus-within:bg-[#020617] focus-within:border-cyan-500 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300";
  const inputClass =
    "w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none ml-3";

  return (
    <div className="relative  w-full bg-[#020617] font-sans text-white overflow-hidden flex items-center justify-center p-4 sm:p-8 xl:p-12 px-4 sm:px-6 lg:px-8 mx-auto">
      {/* Background Radial Glows */}
      <div className="absolute top-0 left-0 w-150 h-150 bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-0 right-0 w-150  h-150 bg-blue-600/10 rounded-full blur-[150px] pointer-events-none translate-x-1/3 -translate-y-1/3" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-7xl  mx-auto flex flex-col lg:flex-row bg-[#071028] rounded-[32px] sm:rounded-[40px] border border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.08)] overflow-hidden">
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
                Transform Your Body.
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">
                  Build Your Best Self.
                </span>
              </h1>
              <p className="text-[17px] text-slate-400 leading-relaxed font-light">
                Join thousands of fitness enthusiasts achieving their goals
                through expert trainers, personalized programs, and a supportive
                community.
              </p>
            </div>

            {/* Features List (No Cards, Simple Layout) */}
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-xl shrink-0">
                  🏋️
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Expert Trainers
                  </h3>
                  <p className="text-slate-400 text-sm leading-snug">
                    Learn from world-class professionals.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-xl shrink-0">
                  📈
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Progress Tracking
                  </h3>
                  <p className="text-slate-400 text-sm leading-snug">
                    Monitor your daily improvements with precision.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-xl shrink-0">
                  🔥
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">
                    Personalized Plans
                  </h3>
                  <p className="text-slate-400 text-sm leading-snug">
                    Workouts perfectly tailored to your body type.
                  </p>
                </div>
              </div>
            </div>

            {/* Premium Image */}
            <div className="relative z-10 w-full h-55 rounded-[24px] overflow-hidden shadow-xl shadow-cyan-900/10 border border-white/5 shrink-0">
              <Image
                src="/images/premium_fitness_gym.png"
                alt="Premium Fitness Environment"
                fill
                className="object-cover"
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
                Create Account
              </h2>
              <p className="text-slate-400 text-[14px] leading-relaxed max-w-[90%]">
                Start your fitness journey today. Join thousands of members
                building healthier lifestyles through expert coaching and
                personalized fitness programs.
              </p>
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <div className={inputContainerClass}>
                  <BiUser className="text-xl text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    required
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>
              </div>

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

              {/* Profile Image Field */}
              <div>
                <label className="block text-[13px] font-medium text-slate-300 mb-1.5">
                  Profile Image (Optional)
                </label>
                <label
                  className={`${inputContainerClass} cursor-pointer hover:border-cyan-500/30 group`}
                >
                  <BiImageAdd
                    className={`text-xl transition-colors shrink-0 ${imageFile ? "text-cyan-400" : "text-slate-400 group-hover:text-cyan-400"}`}
                  />
                  <span
                    className={`ml-3 text-sm truncate w-full ${imageFile ? "text-white font-medium" : "text-slate-400"}`}
                  >
                    {imageFile ? imageFile.name : "Click to upload an image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  {imageFile && (
                    <BsCheckCircleFill className="text-green-400 ml-auto shrink-0" />
                  )}
                </label>
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
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {/* Live Password Rules (Only visible when typing) */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${password.length > 0 ? "max-h-30 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}`}
                  >
                    <div className="flex flex-col gap-2 bg-[#020617]/50 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center gap-2.5 text-[12px]">
                        {isLengthValid ? (
                          <BsCheckCircleFill className="text-green-400 text-sm shrink-0" />
                        ) : (
                          <BsXCircleFill className="text-slate-500 text-sm shrink-0" />
                        )}
                        <span
                          className={
                            isLengthValid
                              ? "text-green-400 font-medium"
                              : "text-slate-400"
                          }
                        >
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px]">
                        {hasUppercase ? (
                          <BsCheckCircleFill className="text-green-400 text-sm shrink-0" />
                        ) : (
                          <BsXCircleFill className="text-slate-500 text-sm shrink-0" />
                        )}
                        <span
                          className={
                            hasUppercase
                              ? "text-green-400 font-medium"
                              : "text-slate-400"
                          }
                        >
                          At least one uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5 text-[12px]">
                        {hasNumber ? (
                          <BsCheckCircleFill className="text-green-400 text-sm shrink-0" />
                        ) : (
                          <BsXCircleFill className="text-slate-500 text-sm shrink-0" />
                        )}
                        <span
                          className={
                            hasNumber
                              ? "text-green-400 font-medium"
                              : "text-slate-400"
                          }
                        >
                          At least one number
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-3 relative flex h-12.5 w-full items-center justify-center rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
              Sign up with Google
            </button>

            {/* Footer Link */}
            <p className="mt-6 text-center text-[13px] text-slate-400 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
