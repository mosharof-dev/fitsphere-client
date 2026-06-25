"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createForumPost } from "@/lib/actions/forum";
import { uploadToImgBB } from "@/lib/actions/image-upload";
import { PenSquare, ImagePlus, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function AddForumPostForm({ redirectPath }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        toast.loading("Uploading image...");
        imageUrl = await uploadToImgBB(imageFile);
        toast.dismiss();
        if (!imageUrl) {
          throw new Error("Failed to upload image. Please try again.");
        }
      }

      toast.loading("Publishing post...");
      await createForumPost({
        ...formData,
        image: imageUrl,
      });
      toast.dismiss();

      setSuccess(true);
      toast.success("Post published successfully!");

      setTimeout(() => {
        router.push(redirectPath || "/dashboard/trainer/my-posts");
        router.refresh();
      }, 1500);
    } catch (err) {
      toast.dismiss();
      toast.error(err?.message || "Failed to publish post.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 rounded-xl border border-white/10 bg-[#020617]/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all";
  const labelClass =
    "block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase";

  return (
    <div className="w-full mt-4 mx-auto">
      <div className="bg-[#071028] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-2xl">
        {success ? (
          <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Post Published!
            </h3>
            <p className="text-slate-400">
              Your post is now live on the community forum.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <label htmlFor="title" className={labelClass}>
                Post Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className={`${inputClass} h-[46px]`}
                placeholder="Write an engaging title..."
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className={labelClass}>Cover Image</label>
              {imagePreview ? (
                <div className="relative w-full h-[250px] sm:h-[300px] rounded-xl overflow-hidden border border-white/10 group">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={removeImage}
                      className="bg-red-500/90 hover:bg-red-500 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-lg"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-[200px] border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all bg-[#020617]/30 ${loading ? "opacity-50 pointer-events-none" : ""}`}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                        <ImagePlus className="w-6 h-6 text-slate-400" />
                      </div>
                      <p className="mb-2 text-sm text-slate-300 font-medium">
                        <span className="text-cyan-400">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-slate-500">
                        SVG, PNG, JPG or GIF (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                      disabled={loading}
                    />
                  </label>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>
                Content Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                rows={8}
                className={`${inputClass} py-3 resize-y min-h-[150px] leading-relaxed`}
                placeholder="Share your knowledge, tips, or questions with the community..."
                required
                disabled={loading}
              />
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center w-full sm:w-auto gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                {loading ? (
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
                    Publishing...
                  </>
                ) : (
                  <>
                    <PenSquare className="w-5 h-5" />
                    Publish Post
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
