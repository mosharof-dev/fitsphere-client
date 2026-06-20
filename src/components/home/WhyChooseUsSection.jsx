import React from "react";
import { FaUserTie, FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: FaUserTie,
    title: "Expert Trainers",
    description: "Train with certified professionals dedicated to your goals.",
    color: "from-[#06B6D4]/20 to-[#3B82F6]/20",
    iconColor: "text-[#06B6D4]",
    borderColor: "group-hover:border-[#06B6D4]/50",
    shadowColor: "group-hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]",
  },
  {
    icon: FaCalendarAlt,
    title: "Flexible Scheduling",
    description: "Book classes anytime that fit perfectly into your busy life.",
    color: "from-[#3B82F6]/20 to-indigo-500/20",
    iconColor: "text-[#3B82F6]",
    borderColor: "group-hover:border-[#3B82F6]/50",
    shadowColor: "group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)]",
  },
  {
    icon: FaUsers,
    title: "Community Support",
    description: "Stay motivated together in a thriving, positive environment.",
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
    borderColor: "group-hover:border-indigo-500/50",
    shadowColor: "group-hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]",
  },
  {
    icon: FaChartLine,
    title: "Progress Tracking",
    description:
      "Track your fitness journey with advanced analytics and goals.",
    color: "from-[#06B6D4]/20 to-teal-500/20",
    iconColor: "text-teal-400",
    borderColor: "group-hover:border-teal-500/50",
    shadowColor: "group-hover:shadow-[0_20px_40px_rgba(20,184,166,0.15)]",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#06B6D4] opacity-[0.02] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
              FitSphere
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to build a stronger and healthier lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative h-full bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:-translate-y-3 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.4)] ${feature.shadowColor} ${feature.borderColor}`}
            >
              {/* Inner Glow */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none`}
              ></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-inner">
                  <feature.icon className={`text-3xl ${feature.iconColor}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed grow text-[1.05rem]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
