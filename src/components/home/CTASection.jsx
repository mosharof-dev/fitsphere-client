"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function CTASection() {
  return (
    <section className="relative py-32 bg-[#020617] text-white overflow-hidden flex items-center justify-center">
      {/* Large Gradient Glow & Spotlight */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-[#06B6D4] opacity-[0.15] blur-[250px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#3B82F6] opacity-[0.25] blur-[200px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="max-w-5xl mx-auto bg-white/5 border border-white/10 backdrop-blur-3xl rounded-[3rem] p-12 md:p-24 shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)] relative overflow-hidden"
        >
          {/* Inner Highlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-linear-to-b from-[#06B6D4]/30 to-transparent blur-3xl pointer-events-none"></div>

          <motion.h2
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]"
          >
            Ready To Start Your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
              Fitness Journey?
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Join thousands of members already transforming their lives with
            FitSphere. Whether you&apos;re here to learn, train, or teach.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link
              href="/classes"
              className="w-full sm:w-auto group relative flex items-center justify-center px-12 py-5 bg-linear-to-r from-[#06B6D4] to-[#3B82F6] rounded-2xl font-bold text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.6)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-xl"
            >
              Explore Classes
              <FiArrowRight className="ml-3 text-2xl group-hover:translate-x-2 transition-transform" />
            </Link>
            <Link
              href="/register?type=trainer"
              className="w-full sm:w-auto group flex items-center justify-center px-12 py-5 bg-white/5 border border-white/20 hover:border-white/40 hover:bg-white/10 backdrop-blur-md rounded-2xl font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-xl shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
            >
              Become A Trainer
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Smooth Transition Divider to Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#06B6D4]/50 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-linear-to-r from-transparent via-[#06B6D4]/30 to-transparent blur-sm"></div>
    </section>
  );
}
