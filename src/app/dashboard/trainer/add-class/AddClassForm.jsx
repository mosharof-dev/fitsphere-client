"use client";

import PageContainer from "@/components/dashboard/PageContainer";
import { uploadToImgBB } from "@/lib/actions/image-upload";
import { createNewClass } from "@/lib/actions/classes";
import { Plus, Clock, CheckCircle2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { MdOutlineAddToQueue } from "react-icons/md";
import { toast } from "sonner";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const breadcrumbs = [
  { label: "Dashboard", href: "/dashboard/trainer/overview" },
  { label: "Add Class" },
];

export default function AddClassForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      class_name: "",
      description: "",
      price: "",
      difficulty: "Beginner",
      category: "Yoga",
      duration: "",
      time: "09:00",
      days: new Set(),
    },
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (data.days.size === 0) {
        toast.error("Please select at least one day from Class Schedule Days.");
        setIsSubmitting(false);
        return;
      }

      if (!imageFile) {
        toast.error("Please upload a class image.");
        setIsSubmitting(false);
        return;
      }

      const formattedData = {
        ...data,
        days: Array.from(data.days),
      };

      console.log("Uploading image...");
      const uploadedUrl = await uploadToImgBB(imageFile);

      if (!uploadedUrl) {
        toast.error("Failed to upload image. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const finalPayload = {
        ...formattedData,
        featured_image_url: uploadedUrl,
      };

      console.log("Final Payload ready for API:", finalPayload);

      // Sending data to backend using the Server Action
      const res = await createNewClass(finalPayload);

      if (res) {
        toast.success("Class added successfully!");
        reset();
        setImageFile(null);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to add class.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass =
    "block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase";
  const inputClass =
    "w-full h-[46px] px-4 rounded-xl border border-white/10 bg-[#020617]/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all";

  return (
    <PageContainer breadcrumbs={breadcrumbs}>
      <div className="w-full  mx-auto  pb-6">
        {/* Header Section with Meaningful Text */}
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <MdOutlineAddToQueue className="text-cyan-500" /> Add New Class
          </h1>
          <p className="text-slate-400 text-[14px] leading-relaxed max-w-2xl mt-1">
            Set up your new fitness class by providing the details below. Ensure
            the class name, description, and pricing are clear to help your
            students understand what you offer.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#071028] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-2xl">
          <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Class Name */}
            <div>
              <label className={labelClass}>Class Name</label>
              <input
                type="text"
                placeholder="Enter class name"
                className={inputClass}
                {...register("class_name", {
                  required: "Class Name is required",
                })}
              />
              {errors.class_name && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.class_name.message}
                </span>
              )}
            </div>

            {/* Class Image */}
            <div>
              <label className={labelClass}>Class Image</label>
              <label
                className={`${inputClass} cursor-pointer flex items-center justify-between group overflow-hidden`}
              >
                <div className="flex items-center gap-3">
                  <span className="bg-white/10 border border-white/5 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold group-hover:bg-white/20 transition-colors">
                    Choose image
                  </span>
                  <span
                    className={`text-sm truncate ${imageFile ? "text-white" : "text-slate-500"}`}
                  >
                    {imageFile ? imageFile.name : "No class image selected"}
                  </span>
                </div>
                {imageFile && (
                  <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="Yoga">Yoga</option>
                    <option value="Zumba">Zumba</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Functional Training">
                      Functional Training
                    </option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="Pilates">Pilates</option>
                    <option value="HIIT">HIIT</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Difficulty Level</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    {...register("difficulty", {
                      required: "Difficulty is required",
                    })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Duration</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                  >
                    <option value="" disabled>
                      Select duration
                    </option>
                    <option value="30 Minutes">30 Minutes</option>
                    <option value="45 Minutes">45 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="90 Minutes">90 Minutes</option>
                    <option value="120 Minutes">120 Minutes</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                {errors.duration && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.duration.message}
                  </span>
                )}
              </div>

              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="Class price"
                  className={inputClass}
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.price.message}
                  </span>
                )}
              </div>
            </div>

            {/* Schedule Days */}
            <div>
              <label className={labelClass}>Class Schedule Days</label>
              <Controller
                name="days"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2.5">
                    {DAYS_OF_WEEK.map((day) => {
                      const isSelected = field.value.has(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            const newSet = new Set(field.value);
                            if (isSelected) {
                              newSet.delete(day);
                            } else {
                              newSet.add(day);
                            }
                            field.onChange(newSet);
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                            isSelected
                              ? "bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                              : "bg-transparent text-slate-400 border-white/5 hover:bg-white/5"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            </div>

            {/* Time */}
            <div>
              <label className={labelClass}>Time</label>
              <div className="relative">
                <input
                  type="time"
                  className={`${inputClass} pr-10`}
                  {...register("time", { required: "Time is required" })}
                  defaultValue={"09:00 AM"}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              {errors.time && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.time.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                placeholder="Course description about the class"
                rows={4}
                className={`${inputClass} h-auto py-3 resize-y`}
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-400 text-xs mt-1 block">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading & Saving...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add Class
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}
