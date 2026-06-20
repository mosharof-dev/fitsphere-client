"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  UserPlus, 
  Heart,
  PlusCircle,
  ListTodo,
  MessageSquarePlus,
  MessageSquare,
  Users,
  UserCheck,
  Dumbbell,
  Receipt,
  LogOut,
} from "lucide-react";
import RoleBadge from "./RoleBadge";
import NavItem from "./NavItem";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";

const navigationMap = {
  user: [
    { name: "Overview", href: "/dashboard/user/overview", icon: LayoutDashboard },
    { name: "Booked Classes", href: "/dashboard/user/booked-classes", icon: CalendarCheck },
    { name: "Apply As Trainer", href: "/dashboard/user/apply-trainer", icon: UserPlus },
    { name: "Favorite Classes", href: "/dashboard/user/favorites", icon: Heart },
  ],
  trainer: [
    { name: "Overview", href: "/dashboard/trainer/overview", icon: LayoutDashboard },
    { name: "Add Class", href: "/dashboard/trainer/add-class", icon: PlusCircle },
    { name: "My Classes", href: "/dashboard/trainer/my-classes", icon: ListTodo },
    { name: "Add Forum Post", href: "/dashboard/trainer/add-forum-post", icon: MessageSquarePlus },
    { name: "My Forum Posts", href: "/dashboard/trainer/my-posts", icon: MessageSquare },
  ],
  admin: [
    { name: "Overview", href: "/dashboard/admin/overview", icon: LayoutDashboard },
    { name: "Manage Users", href: "/dashboard/admin/manage-users", icon: Users },
    { name: "Applied Trainers", href: "/dashboard/admin/applied-trainers", icon: UserCheck },
    { name: "Manage Trainers", href: "/dashboard/admin/manage-trainers", icon: Dumbbell },
    { name: "Manage Classes", href: "/dashboard/admin/manage-classes", icon: ListTodo },
    { name: "Add Forum Post", href: "/dashboard/admin/add-forum-post", icon: MessageSquarePlus },
    { name: "Transactions", href: "/dashboard/admin/transactions", icon: Receipt },
    { name: "Forum Post Manage", href: "/dashboard/admin/manage-forum", icon: MessageSquare },
  ],
};

export default function DashboardSidebar({ role = "user", user, onClickItem }) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = navigationMap[role] || navigationMap.user;

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="flex h-full flex-col bg-[#0b1120]">
      {/* Logo Area */}
      <div className="flex h-[72px] items-center px-6 border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2 group transition-opacity hover:opacity-80">
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
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-300">FitSphere</span>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="p-5 border-b border-white/5 bg-[#020617]/30 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-400/30 shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center justify-center bg-[#020617]">
            {!user ? (
              <Skeleton className="w-full h-full rounded-full" />
            ) : user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-cyan-950 flex items-center justify-center text-cyan-400 font-bold text-xl uppercase">
                {user.name?.charAt(0) || "U"}
              </div>
            )}
          </div>
          <div className="flex flex-col overflow-hidden gap-1.5 w-full">
            {!user ? (
              <>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-16 mt-0.5 rounded-full" />
              </>
            ) : (
              <>
                <span className="truncate text-sm font-bold text-slate-100">
                  {user.name}
                </span>
                <span className="truncate text-xs text-slate-400">
                  {user.email}
                </span>
                <RoleBadge role={role} className="w-fit mt-0.5" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 overflow-y-auto py-5 px-4 no-scrollbar">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <div key={item.href} onClick={onClickItem}>
              <NavItem 
                href={item.href} 
                icon={item.icon} 
                name={item.name} 
                isActive={pathname === item.href || pathname.startsWith(item.href + "/")} 
              />
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/5 shrink-0 bg-[#020617]/50">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 bg-white/5 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-white/5 hover:border-red-500/30 group"
        >
          <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          Logout
        </button>
      </div>
    </div>
  );
}
