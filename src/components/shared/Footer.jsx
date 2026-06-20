import React from "react";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { FiArrowRight, FiMail } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#020617] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Background Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-[#3B82F6] opacity-[0.03] blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Logo & Branding (Spans 4 cols on large) */}
          <div className="lg:col-span-4 flex flex-col space-y-8 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center space-x-3 group w-max">
              <div className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-180">
                <svg
                  className="w-10 h-10 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <span className="text-3xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-[#06B6D4] group-hover:to-[#3B82F6] transition-all duration-300 relative">
                FitSphere
                <div className="absolute -inset-2 bg-[#06B6D4] opacity-0 group-hover:opacity-10 blur-xl rounded-full pointer-events-none transition-opacity duration-300"></div>
              </span>
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Transform your fitness journey with expert trainers, powerful classes,
              and a supportive community.
            </p>

            {/* Contact Information moved here for better balance */}
            <ul className="space-y-4 text-slate-400 pt-4">
              <li>
                <a href="mailto:support@fitsphere.com" className="hover:text-[#06B6D4] transition-colors flex items-center group w-max">
                  <FiMail className="mr-3 text-lg" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">support@fitsphere.com</span>
                </a>
              </li>
              <li className="flex items-center group cursor-default text-slate-500 w-max pt-2">
                <span className="group-hover:translate-x-1 transition-transform duration-300">Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links (Spans 2 cols on large) */}
          <div className="lg:col-span-2 pt-2">
            <h4 className="text-white font-bold text-lg mb-8 tracking-wide">Quick Links</h4>
            <ul className="space-y-5">
              {["Home", "All Classes", "Community Forum"].map((link, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="group flex items-center text-slate-400 hover:text-white transition-colors w-max"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources (Spans 2 cols on large) */}
          <div className="lg:col-span-2 pt-2">
            <h4 className="text-white font-bold text-lg mb-8 tracking-wide">Resources</h4>
            <ul className="space-y-5">
              {["Classes", "Trainers", "Blog", "Support"].map((link, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="group flex items-center text-slate-400 hover:text-white transition-colors w-max"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter (Spans 4 cols on large) */}
          <div className="lg:col-span-4 lg:pl-4">
            <div className="bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.4)] relative overflow-hidden group h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-linear-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <h4 className="text-xl font-bold text-white mb-3 tracking-tight">Stay Updated With FitSphere</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Get fitness tips, class updates, and exclusive community news delivered directly to your inbox.
              </p>
              
              <div className="flex flex-col sm:flex-row bg-white/5 border border-white/10 rounded-xl overflow-hidden focus-within:border-[#06B6D4]/50 focus-within:ring-2 focus-within:ring-[#06B6D4]/20 focus-within:bg-white/10 transition-all shadow-inner">
                <div className="pl-4 hidden sm:flex items-center justify-center text-slate-500">
                  <FiMail className="text-lg" />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="bg-transparent text-white px-4 sm:px-3 py-4 w-full outline-hidden placeholder:text-slate-500 font-medium text-sm"
                />
                <button className="bg-linear-to-r from-[#06B6D4] to-[#3B82F6] px-6 py-4 sm:py-0 text-white font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Area */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {currentYear} FitSphere. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <span className="text-slate-500 text-sm font-medium mr-2">Follow Us</span>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#06B6D4]/20 hover:border-[#06B6D4]/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-110 transition-all duration-300"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
