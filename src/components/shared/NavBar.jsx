"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Classes", path: "/classes" },
    { name: "Community Forum", path: "/forum" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#020617] backdrop-blur-md shadow-sm transition-all duration-300 border-b-2 border-cyan-400/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Logo & Brand */}
            <div className="shrink-0 flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2 group">
                {/* Clean Sphere Logo for FitSphere */}
                <div className="flex items-center justify-center transition-transform duration-300 group-hover:rotate-180">
                  <svg
                    className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
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
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">
                  FitSphere
                </span>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className="relative py-2 text-sm font-semibold transition-colors duration-200 group"
                  >
                    <span
                      className={`${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-300 group-hover:text-cyan-400"
                      }`}
                    >
                      {link.name}
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                        isActive
                          ? "w-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                          : "w-0 group-hover:w-full"
                      }`}
                    ></span>
                  </Link>
                );
              })}
            </nav>

            {/* Right: Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Active Outline Log in Button */}
              <Link
                href="/login"
                className="px-5 py-2 text-sm font-semibold text-cyan-400 border border-cyan-400/30 rounded-full transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="px-6 py-2 text-sm font-bold text-slate-950 bg-cyan-400 rounded-full transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-slate-300 hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isMobileMenuOpen ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Mobile Menu Slide-over */}
      <div
        className={`fixed top-0 right-0 h-full w-70 bg-[#0b1120] border-l border-white/5 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex-1 flex flex-col overflow-y-auto mt-16">
          <div className="flex items-center justify-between mb-8">
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "text-cyan-400 bg-cyan-950/30 border border-cyan-900/50"
                      : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Auth Buttons */}
          <div className="mt-auto pt-8 border-t border-white/5 flex flex-col space-y-4">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-semibold text-cyan-400 border border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 transition-all duration-300"
            >
              Log in
            </Link>
            <Link
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 px-4 rounded-xl text-center font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
