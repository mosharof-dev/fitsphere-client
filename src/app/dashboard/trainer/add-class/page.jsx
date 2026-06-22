"use client";

import PageContainer from "@/components/dashboard/PageContainer";
import { uploadToImgBB } from "@/lib/actions/image-upload";
import { Plus, Clock } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function AddClassPage() {
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
      time: "",
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
        alert("Please select at least one day from Class Schedule Days.");
        setIsSubmitting(false);
        return;
      }

      if (!imageFile) {
        alert("Please upload a class image.");
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
        alert("Failed to upload image. Please try again.");
        setIsSubmitting(false);
        return;
      }

      const finalPayload = {
        ...formattedData,
        featured_image_url: uploadedUrl,
      };

      console.log("Final Payload ready for API:", finalPayload);
      alert("Class added successfully! Check console for details.");
      
      reset();
      setImageFile(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to add class.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const labelClass = "block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase";
  const inputClass = "w-full h-[46px] px-4 rounded-xl border border-slate-700/50 bg-[#0f172a]/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#b4fc2c] focus:ring-1 focus:ring-[#b4fc2c] transition-all";

  return (
    <PageContainer>
      <div className="w-full max-w-5xl mx-auto py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#b4fc2c]/10 flex items-center justify-center border border-[#b4fc2c]/20">
            <Plus className="w-5 h-5 text-[#b4fc2c]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Add New Class
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-[#1e293b]/30 border border-slate-700/40 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Class Name */}
            <div>
              <label className={labelClass}>Class Name</label>
              <input
                type="text"
                placeholder="e.g. Power Yoga Flow"
                className={inputClass}
                {...register("class_name", { required: "Class Name is required" })}
              />
              {errors.class_name && <span className="text-red-400 text-xs mt-1 block">{errors.class_name.message}</span>}
            </div>

            {/* Class Image */}
            <div>
              <label className={labelClass}>Class Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full h-[46px] px-4 py-2.5 rounded-xl border border-slate-700/50 bg-[#0f172a]/50 text-sm text-slate-400 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 transition-all focus:outline-none focus:border-[#b4fc2c]"
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Category</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    {...register("category", { required: "Category is required" })}
                  >
                    <option value="Yoga">Yoga</option>
                    <option value="Zumba">Zumba</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength Training">Strength Training</option>
                    <option value="Functional Training">Functional Training</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="CrossFit">CrossFit</option>
                    <option value="Bodybuilding">Bodybuilding</option>
                    <option value="Pilates">Pilates</option>
                    <option value="HIIT">HIIT</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Difficulty Level</label>
                <div className="relative">
                  <select
                    className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                    {...register("difficulty", { required: "Difficulty is required" })}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Duration & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 60 mins"
                  className={inputClass}
                  {...register("duration", { required: "Duration is required" })}
                />
                {errors.duration && <span className="text-red-400 text-xs mt-1 block">{errors.duration.message}</span>}
              </div>

              <div>
                <label className={labelClass}>Price ($)</label>
                <input
                  type="number"
                  min="0"
                  placeholder="25"
                  className={inputClass}
                  {...register("price", { required: "Price is required" })}
                />
                {errors.price && <span className="text-red-400 text-xs mt-1 block">{errors.price.message}</span>}
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
                              ? "bg-slate-700/80 text-white border-slate-500 shadow-inner"
                              : "bg-[#0f172a]/50 text-slate-400 border-slate-700/50 hover:bg-slate-800"
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
                  type="text"
                  placeholder="08:00 AM"
                  className={`${inputClass} pr-10`}
                  {...register("time", { required: "Time is required" })}
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              {errors.time && <span className="text-red-400 text-xs mt-1 block">{errors.time.message}</span>}
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                placeholder="Describe the class..."
                rows={4}
                className={`${inputClass} h-auto py-3 resize-y`}
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && <span className="text-red-400 text-xs mt-1 block">{errors.description.message}</span>}
            </div>

            {/* Submit Button */}
            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#b4fc2c] hover:bg-[#a3e622] text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
                {isSubmitting ? "Adding..." : "Add Class"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </PageContainer>
  );
}

