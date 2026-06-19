"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaDumbbell, FaUserTie } from "react-icons/fa";
import {
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import { HiOutlineTrophy } from "react-icons/hi2";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-[calc(100vh-4rem)] bg-[#020617] text-white overflow-hidden py-12 flex items-center">
      {/* Dynamic Premium Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(to right, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Cyan blurred glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#06B6D4] opacity-20 blur-[150px] rounded-full mix-blend-screen"></div>

        {/* Blue radial gradient */}
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#3B82F6] opacity-20 blur-[150px] rounded-full mix-blend-screen"></div>

        {/* Floating abstract circles */}
        <motion.div
          animate={{ y: [-20, 20, -20], x: [-20, 20, -20], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[20%] right-[30%] w-64 h-64 border border-cyan-500/10 rounded-full opacity-50"
        ></motion.div>
        <motion.div
          animate={{ y: [20, -20, 20], x: [20, -20, 20], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[30%] left-[10%] w-96 h-96 border border-blue-500/10 rounded-full opacity-50"
        ></motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between w-full">
          {/* Left Side: Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col space-y-8 w-full lg:w-[48%]"
          >
            {/* Top Badge */}
            <motion.div variants={fadeUp} className="inline-block">
              <div className="flex items-center space-x-2 bg-white/5 border border-[#06B6D4]/30 backdrop-blur-md px-4 py-2 rounded-full w-max shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <HiOutlineTrophy className="text-[#06B6D4] text-lg" />
                <span className="text-sm font-medium text-cyan-50">
                  #1 Fitness Community Platform
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-extrabold tracking-tight leading-[1.15]"
            >
              Transform Your Body.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#3B82F6]">
                Build Your Best Self.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed"
            >
              Join expert-led fitness classes, connect with certified trainers,
              track your progress, and become part of a thriving fitness
              community designed for real results.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="group relative flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-xl font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-105">
                Explore Classes
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group flex items-center justify-center px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 backdrop-blur-md rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105">
                <FaUserTie className="mr-2 text-slate-300 group-hover:text-white transition-colors" />
                Become A Trainer
              </button>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10"
            >
              {[
                { label: "Active Members", value: "10K+", icon: FaUsers },
                { label: "Expert Trainers", value: "250+", icon: FaUserTie },
                { label: "Fitness Classes", value: "500+", icon: FaDumbbell },
                {
                  label: "Successful Bookings",
                  value: "50K+",
                  icon: FiCheckCircle,
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-3 group cursor-default"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#06B6D4]/20 group-hover:border-[#06B6D4]/30 transition-colors duration-300">
                    <stat.icon className="text-[#06B6D4] text-lg" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#06B6D4] transition-colors duration-300">
                      {stat.value}
                    </h4>
                    <p className="text-sm text-slate-400">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Premium Fitness Visual Collage */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex items-center justify-center lg:justify-end mt-16 lg:mt-0 w-full lg:w-[52%] h-[500px] sm:h-[600px] lg:h-[750px] xl:h-[800px]"
          >
            {/* Collage Wrapper */}
            <div className="relative w-full max-w-[800px] h-full">

              {/* ── Dedicated glow backdrop — only behind the collage, z-0 ── */}
              <div className="absolute inset-[-60px] -z-10 pointer-events-none">
                {/* Cyan spotlight top-center */}
                <div className="absolute top-0 left-[20%] w-[60%] h-[60%] bg-[#06B6D4] opacity-[0.25] blur-[100px] rounded-full"></div>
                {/* Blue spotlight bottom-right */}
                <div className="absolute bottom-0 right-[10%] w-[60%] h-[60%] bg-[#3B82F6] opacity-[0.2] blur-[100px] rounded-full"></div>
                {/* Soft center radial for depth */}
                <div className="absolute inset-[15%] bg-gradient-radial from-cyan-900/30 to-transparent blur-[80px] rounded-full"></div>
              </div>

              {/* Image 1: Professional gym workout (Top Left — large) */}
              <motion.div
                className="absolute top-[2%] left-0 w-[58%] h-[56%] rounded-[32px] overflow-hidden
                  border border-white/20
                  shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                  z-20 group cursor-pointer"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.02, zIndex: 50, transition: { duration: 0.4, ease: "easeOut" } }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/40 via-transparent to-transparent group-hover:opacity-0 transition-all duration-500 z-10"></div>
                {/* glass reflection strip */}
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent z-20 pointer-events-none rounded-t-[32px]"></div>
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                  alt="Professional gym workout"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </motion.div>

              {/* Image 2: Yoga/stretching (Top Right — tall) */}
              <motion.div
                className="absolute top-[8%] right-0 w-[38%] h-[62%] rounded-[32px] overflow-hidden
                  border border-white/15
                  shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]
                  z-10 group cursor-pointer"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.02, zIndex: 50, transition: { duration: 0.4, ease: "easeOut" } }}
                style={{ animationDelay: "1.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/50 via-transparent to-transparent group-hover:opacity-0 transition-all duration-500 z-10"></div>
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent z-20 pointer-events-none rounded-t-[32px]"></div>
                <img
                  src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=1470&auto=format&fit=crop"
                  alt="Yoga Class"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </motion.div>

              {/* Image 3: Weight lifting (Bottom Left — medium) */}
              <motion.div
                className="absolute bottom-[2%] left-[4%] w-[44%] h-[40%] rounded-[32px] overflow-hidden
                  border border-white/15
                  shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.15)]
                  z-30 group cursor-pointer"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.02, zIndex: 50, transition: { duration: 0.4, ease: "easeOut" } }}
                style={{ animationDelay: "2.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/50 via-transparent to-transparent group-hover:opacity-0 transition-all duration-500 z-10"></div>
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent z-20 pointer-events-none rounded-t-[32px]"></div>
                <img
                  src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop"
                  alt="Weight Lifting"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </motion.div>

              {/* Image 4: Personal trainer (Bottom Right — medium) */}
              <motion.div
                className="absolute bottom-[8%] right-[6%] w-[42%] h-[34%] rounded-[32px] overflow-hidden
                  border border-white/20
                  shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(59,130,246,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
                  z-40 group cursor-pointer"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                whileHover={{ scale: 1.02, zIndex: 50, transition: { duration: 0.4, ease: "easeOut" } }}
                style={{ animationDelay: "3.2s" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/40 via-transparent to-transparent group-hover:opacity-0 transition-all duration-500 z-10"></div>
                <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-white/[0.08] to-transparent z-20 pointer-events-none rounded-t-[32px]"></div>
                <img
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop"
                  alt="Personal Trainer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
                />
              </motion.div>

              {/* ── Floating Stat 1: 10K+ Active Members ── */}
              <motion.div
                className="absolute -left-6 top-[40%] z-50
                  bg-[#0f172a]/80 backdrop-blur-xl
                  border border-white/20 rounded-2xl px-5 py-4
                  shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]
                  flex items-center space-x-4 min-w-[170px]"
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/20 flex items-center justify-center border border-[#06B6D4]/40 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <FaUsers className="text-[#06B6D4] text-base" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-white leading-tight">10K+</p>
                  <p className="text-xs text-slate-300 leading-tight mt-0.5">Active Members</p>
                </div>
              </motion.div>

              {/* ── Floating Stat 2: 250+ Certified Trainers ── */}
              <motion.div
                className="absolute -right-4 top-[15%] z-50
                  bg-[#0f172a]/80 backdrop-blur-xl
                  border border-white/20 rounded-2xl px-5 py-4
                  shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]
                  flex items-center space-x-4 min-w-[180px]"
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center border border-[#3B82F6]/40 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <FaUserTie className="text-[#3B82F6] text-base" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-white leading-tight">250+</p>
                  <p className="text-xs text-slate-300 leading-tight mt-0.5">Certified Trainers</p>
                </div>
              </motion.div>

              {/* ── Floating Stat 3: 50K+ Bookings ── */}
              <motion.div
                className="absolute left-[45%] -translate-x-1/2 -bottom-6 z-50
                  bg-[#0f172a]/80 backdrop-blur-xl
                  border border-white/20 rounded-2xl px-5 py-4
                  shadow-[0_15px_35px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]
                  flex items-center space-x-4 min-w-[190px]"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              >
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center border border-green-500/40 shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  <FiCheckCircle className="text-green-400 text-base" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-white leading-tight">50K+</p>
                  <p className="text-xs text-slate-300 leading-tight mt-0.5">Successful Bookings</p>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
