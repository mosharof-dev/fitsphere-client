"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Marathon Runner",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop",
    review:
      "FitSphere completely transformed my training routine. The expert trainers and flexible scheduling allow me to prep for my marathons efficiently. Highly recommended!",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Fitness Enthusiast",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
    review:
      "The community support here is unmatched. I've met incredible workout partners and the progress tracking tools keep me motivated every single day.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Yoga Instructor",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
    review:
      "As an instructor, I love how seamless the platform is. It connects me with dedicated students and provides all the tools needed for successful online classes.",
    rating: 5,
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
          >
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
              Members Say
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400">
            Real stories from our dedicated community.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 hover:-translate-y-3 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] flex flex-col h-full"
            >
              <div className="flex items-center space-x-1.5 mb-8">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl" />
                ))}
              </div>
              <p className="text-slate-200 text-xl leading-relaxed mb-10 font-medium grow">
                &quot;{testimonial.review}&quot;
              </p>
              <div className="flex items-center space-x-5 mt-auto border-t border-white/10 pt-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-lg group-hover:border-[#06B6D4]/50 transition-colors duration-500">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-xl">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#06B6D4] text-base font-semibold">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
