import React from "react";
import Image from "next/image";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function ClassContent({
  singleClass,
  whatYouWillLearn,
  requirements,
}) {
  return (
    <div className="lg:col-span-2 space-y-10">
      {/* Featured Image Container */}
      <div className="relative w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(6,182,212,0.1)] group">
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent z-10"></div>
        <Image
          src={singleClass.featured_image_url}
          alt={singleClass.class_name}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
          priority
        />
        <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-3">
          <span className="bg-[#0f172a]/80 backdrop-blur-md border border-white/10 text-white font-medium px-4 py-1.5 rounded-full text-sm">
            {singleClass.category}
          </span>
          <span className="bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] text-white font-semibold px-4 py-1.5 rounded-full text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
            {singleClass.difficulty}
          </span>
        </div>
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white mb-4">
            {singleClass.class_name}
          </h1>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#0f172a]/60 backdrop-blur-xl p-8 md:p-10 rounded-[32px] border border-white/10 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <span className="w-8 h-1 bg-[#06B6D4] rounded-full inline-block"></span>
          About This Class
        </h3>
        <p className="text-slate-300 text-lg leading-relaxed whitespace-pre-line">
          {singleClass.description}
        </p>
      </div>

      {/* Extra Section: What You'll Learn & Requirements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
          <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <CheckCircle2 className="text-[#06B6D4] w-6 h-6" />
            What You&apos;ll Achieve
          </h4>
          <ul className="space-y-4">
            {whatYouWillLearn.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="min-w-[6px] h-[6px] mt-2 rounded-full bg-[#3B82F6]"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0f172a]/40 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
          <h4 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
            <AlertCircle className="text-[#3B82F6] w-6 h-6" />
            Prerequisites
          </h4>
          <ul className="space-y-4">
            {requirements.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-300">
                <span className="min-w-[6px] h-[6px] mt-2 rounded-full bg-[#06B6D4]"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
