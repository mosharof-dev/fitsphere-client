"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTrainerApplication } from "@/lib/actions/trainerApplications";
import { UserPlus, CheckCircle2, Clock, XCircle } from "lucide-react";
import { MdOutlineAddToQueue } from "react-icons/md";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ApplyTrainerContent({ existingApplication }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    experience: "",
    specialty: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();

  // If user already applied, show the status UI
  if (existingApplication) {
    const isPending = existingApplication.status === "pending";
    const isRejected = existingApplication.status === "rejected";
    const isApproved = existingApplication.status === "approved";

    return (
      <div className="w-full mx-auto pb-6">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <UserPlus className="text-cyan-500" /> Application Status
          </h1>
          <p className="text-slate-400 text-[14px] leading-relaxed max-w-2xl mt-1">
            Check the status of your application to become a certified trainer
            on FitSphere.
          </p>
        </div>

        <div className="bg-[#071028] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-2xl  text-center flex flex-col items-center">
          {isPending && (
            <>
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                <Clock className="w-10 h-10 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Application Pending
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-md">
                Your application has been received and is currently under review
                by our administration team. We will notify you once a decision
                is made.
              </p>
            </>
          )}
          {isRejected && (
            <>
              <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Application Rejected
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-md">
                Unfortunately, your application was not approved at this time.
              </p>
              {existingApplication.feedback && (
                <div className="w-full bg-red-500/5 border border-red-500/10 rounded-xl p-4 text-left">
                  <span className="block text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                    Feedback from Admin
                  </span>
                  <p className="text-slate-300 text-sm">
                    {existingApplication.feedback}
                  </p>
                </div>
              )}
            </>
          )}
          {isApproved && (
            <>
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Application Approved
              </h2>
              <p className="text-slate-400 text-sm mb-6 max-w-md">
                Congratulations! Your application has been approved. You should
                now have access to the Trainer Dashboard.
              </p>
            </>
          )}

          <div className="w-full mt-6 bg-[#020617]/50 rounded-xl border border-white/5 p-5 text-left">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Your Submitted Details
            </h3>
            <div className="space-y-4">
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Experience
                </span>
                <span className="text-sm text-slate-200">
                  {existingApplication.experience} Years
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Specialty
                </span>
                <span className="text-sm text-slate-200">
                  {existingApplication.specialty}
                </span>
              </div>
              <div>
                <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Description
                </span>
                <span className="text-sm text-slate-200 block mt-1 leading-relaxed">
                  {existingApplication.description ||
                    existingApplication.availableTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session?.user?.status === "blocked") {
      toast.error("Action restricted by Admin. You are blocked.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await createTrainerApplication({
        experience: Number(formData.experience),
        specialty: formData.specialty,
        description: formData.description,
      });
      setSuccess(true);
      setTimeout(() => {
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err?.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  const labelClass =
    "block text-[11px] font-bold text-slate-400 tracking-wider mb-2 uppercase";
  const inputClass =
    "w-full h-[46px] px-4 rounded-xl border border-white/10 bg-[#020617]/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all";

  return (
    <div className="w-full mx-auto pb-6">
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <UserPlus className="text-cyan-500" /> Apply As Trainer
        </h1>
        <p className="text-slate-400 text-[14px] leading-relaxed max-w-2xl mt-1">
          Submit your application to become a certified trainer on FitSphere.
          Tell us about your experience and what you specialize in.
        </p>
      </div>

      <div className="bg-[#071028] border border-white/5 rounded-[24px] p-6 sm:p-8 shadow-2xl">
        {success && (
          <div className="mb-6 p-4 text-sm text-emerald-400 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span className="font-medium">
              Success! Your application has been submitted and is pending
              approval.
            </span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 text-sm text-red-400 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
            <XCircle className="w-5 h-5 shrink-0" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="experience" className={labelClass}>
                Experience (in years)
              </label>
              <input
                type="number"
                name="experience"
                id="experience"
                value={formData.experience}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. 3"
                required
                min="0"
                disabled={loading || success}
              />
            </div>
            <div>
              <label htmlFor="specialty" className={labelClass}>
                Specialty
              </label>
              <input
                type="text"
                name="specialty"
                id="specialty"
                value={formData.specialty}
                onChange={handleChange}
                className={inputClass}
                placeholder="e.g. Yoga, Weights, Cardio"
                required
                disabled={loading || success}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className={labelClass}>
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} h-auto py-3 resize-y`}
              placeholder="Tell us a bit about yourself and your training style..."
              required
              disabled={loading || success}
            />
          </div>

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading || success}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center justify-center sm:justify-start w-full sm:w-auto gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(6,182,212,0.2)]"
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
                  Submitting...
                </>
              ) : (
                <>
                  <MdOutlineAddToQueue className="w-5 h-5" />
                  Submit Application
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
