"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;

  const getDashboardPath = () => {
    if (!user) return "/login";
    switch (user.role) {
      case "admin":
        return "/dashboard/admin";
      case "trainer":
        return "/dashboard/trainer";
      default:
        return "/dashboard/user";
    }
  };

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

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
              {isPending ? (
                <div className="flex items-center gap-4 animate-pulse">
                  <div className="h-9 w-28 bg-slate-800/50 rounded-full border border-slate-700/50"></div>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-800/50 border border-slate-700/50">
                    <div className="w-8 h-8 rounded-full bg-slate-700/50"></div>
                    <div className="h-4 w-20 bg-slate-700/50 rounded-md"></div>
                  </div>
                  <div className="h-9 w-24 bg-slate-800/50 rounded-full border border-slate-700/50"></div>
                </div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <Link
                    href={getDashboardPath()}
                    className="px-5 py-2 text-sm font-semibold text-cyan-400 border border-cyan-400/30 rounded-full transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  >
                    Dashboard
                  </Link>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-cyan-400/30">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-slate-200 pr-2 max-w-[120px] truncate">
                      {user.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all duration-300 border  hover:border-red-400/20"
                    title="Log out"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <>
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
                </>
              )}
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
            {isPending ? (
              <div className="flex flex-col space-y-4 animate-pulse w-full">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-10 h-10 rounded-full bg-slate-700/50 shrink-0"></div>
                  <div className="flex flex-col flex-1 gap-2">
                    <div className="h-4 w-24 bg-slate-700/50 rounded-md"></div>
                    <div className="h-3 w-16 bg-slate-700/50 rounded-md"></div>
                  </div>
                  <div className="h-8 w-20 bg-slate-800/50 rounded-full border border-slate-700/50 shrink-0"></div>
                </div>
                <div className="w-full py-3 h-[48px] rounded-xl bg-slate-800/50 border border-slate-700/50"></div>
              </div>
            ) : user ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-400/50 shrink-0">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-cyan-900 flex items-center justify-center text-cyan-400 font-bold text-lg">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-semibold text-slate-200 truncate">
                      {user.name}
                    </span>
                    <span className="text-xs text-cyan-400 capitalize">
                      {user.role || "User"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-800/50 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all duration-300 border border-slate-700/50 hover:border-red-400/30 shrink-0"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>

                <Link
                  href={getDashboardPath()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 px-4 rounded-xl text-center font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
