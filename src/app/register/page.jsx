"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiUser, BiEnvelope, BiLockAlt, BiImageAdd } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

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

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    // Replace with your actual ImgBB API key in .env.local
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      } else {
        throw new Error("ImgBB upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName");
    const email = formData.get("email");

    // 1. Check strict password validation before proceeding
    if (!isLengthValid || !hasUppercase || !hasNumber) {
      toast.error("Please meet all password requirements.");
      setIsLoading(false);
      return;
    }

    // 2. Upload image to ImgBB first (if selected)
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

    // 3. Register user with Better Auth using the returned ImgBB URL
    const { data, error } = await authClient.signUp.email({
      name: fullName,
      email: email,
      password: password,
      image: imageUrl, // Storing only the URL
      role: "user",
      callbackURL: "/login",
    });

    if (error) {
      toast.error(
        `Registration Failed: ${error.message || "Something went wrong!"}`,
      );
    } else if (data) {
      toast.success("Registration Successful! 🎉 Please login to continue.");
      await authClient.signOut(); // Clear session if auto-logged in
      router.push("/login");
    }

    setIsLoading(false);
  };

  const signinWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  // Shared input styling to guarantee exact dimensions and look
  const inputContainerClass =
    "flex items-center w-full h-[56px] px-4 rounded-xl border border-cyan-500/20 bg-transparent focus-within:border-cyan-500 transition-colors";
  const inputClass =
    "w-full bg-transparent text-sm text-white placeholder-slate-500 outline-none ml-3";

  return (
    <div className="flex  w-full bg-[#020617] font-sans text-white">
      <div className="flex w-full lg:w-[55%] flex-col items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md rounded-3xl border border-cyan-500/20 bg-[#071028] p-8 shadow-[0_0_40px_rgba(6,182,212,0.08)]">
          {/* Header section */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Create Account
            </h2>
            <p className="text-slate-400">Start your fitness journey today.</p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            {/* Full Name */}
            <div className={inputContainerClass}>
              <BiUser className="text-xl text-cyan-500/70" />
              <input
                required
                name="fullName"
                type="text"
                placeholder="Full Name"
                className={inputClass}
              />
            </div>

            {/* Email Address */}
            <div className={inputContainerClass}>
              <BiEnvelope className="text-xl text-cyan-500/70" />
              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                className={inputClass}
              />
            </div>

            {/* Profile Image (Hidden File Input) */}
            <label
              className={`${inputContainerClass} cursor-pointer hover:border-cyan-500/50`}
            >
              <BiImageAdd className="text-xl text-cyan-500/70" />
              <span
                className={`ml-3 text-sm ${imageFile ? "text-white" : "text-slate-500"}`}
              >
                {imageFile ? imageFile.name : "Choose Profile Image"}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {/* Password */}
            <div className="relative flex flex-col">
              <div className={inputContainerClass}>
                <BiLockAlt className="text-xl text-cyan-500/70" />
                <input
                  required
                  name="password"
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setIsVisible(!isVisible)}
                  className="p-2 text-slate-400 hover:text-white transition-colors"
                >
                  {isVisible ? (
                    <BsEye className="text-lg" />
                  ) : (
                    <BsEyeSlash className="text-lg" />
                  )}
                </button>
              </div>

              {/* Live Password Rules (Only shows when typing) */}
              {password.length > 0 && (
                <div className="mt-3 flex flex-col gap-1.5 pl-1 text-xs">
                  <span
                    className={
                      isLengthValid ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {isLengthValid ? "✓" : "✖"} At least 8 characters
                  </span>
                  <span
                    className={
                      hasUppercase ? "text-green-400" : "text-slate-400"
                    }
                  >
                    {hasUppercase ? "✓" : "✖"} At least one uppercase letter
                  </span>
                  <span
                    className={hasNumber ? "text-green-400" : "text-slate-400"}
                  >
                    {hasNumber ? "✓" : "✖"} At least one number
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 h-[56px] w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cyan-500/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#071028] px-4 text-slate-400">
                Or sign up with
              </span>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={signinWithGoogle}
            type="button"
            className="flex h-[56px] w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-transparent text-sm font-medium text-white transition-all hover:bg-white/5"
          >
            <FcGoogle className="text-2xl" />
            Sign Up With Google
          </button>

          {/* Footer Link */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-cyan-400 transition-colors hover:text-cyan-300 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
