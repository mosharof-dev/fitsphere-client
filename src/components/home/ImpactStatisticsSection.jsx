"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaUsers, FaUserTie, FaDumbbell } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const stats = [
  { label: "Active Members", value: 10, suffix: "K+", icon: FaUsers },
  { label: "Expert Trainers", value: 250, suffix: "+", icon: FaUserTie },
  { label: "Fitness Classes", value: 500, suffix: "+", icon: FaDumbbell },
  {
    label: "Successful Bookings",
    value: 50,
    suffix: "K+",
    icon: FiCheckCircle,
  },
];

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

function CountUpAnimation({ endValue, suffix }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = endValue / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [endValue, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactStatisticsSection() {
  return (
    <section className="relative py-20 bg-[#020617] text-white">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/5 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
          >
            Our Impact In{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#06B6D4] to-[#3B82F6]">
              Numbers
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-slate-400">
            Join a growing platform transforming lives globally.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              className="group relative bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:-translate-y-2 transition-transform duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
            >
              <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
              <div className="w-16 h-16 mx-auto rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#06B6D4]/20 group-hover:border group-hover:border-[#06B6D4]/30 transition-colors duration-300">
                <stat.icon className="text-[#06B6D4] text-3xl group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-4xl font-extrabold text-white mb-2 group-hover:text-[#06B6D4] transition-colors duration-300">
                <CountUpAnimation endValue={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-slate-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
