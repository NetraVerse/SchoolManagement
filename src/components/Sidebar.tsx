"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Home,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  CreditCard,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/", icon: <Home size={18} /> },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    children: [
      { name: "Profile", href: "/settings/profile", icon: <User size={16} /> },
      {
        name: "Billing",
        href: "/settings/billing",
        icon: <CreditCard size={16} />,
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  return (
    <div className="left-0 top-0 h-screen w-16 md:w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300">
      <div className="p-4 flex justify-center md:justify-start border-b-0">
        <div
          onClick={() => router.push("/")}
          className="flex items-center cursor-pointer"
        >
          <img
            src="/logo.svg"
            alt="logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-sm"
          />
          <span className="ml-3 text-lg font-semibold hidden md:inline">
            MyApp
          </span>
        </div>
      </div>
      <div className="flex-1 mt-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const hasChildren = !!item.children;
          const isOpen = openMenu === item.name;
          const hasActiveChild = hasChildren
            ? item.children.some((child) => pathname === child.href)
            : false;
          if (!hasChildren) {
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[#E0F3E0] text-[#0C6338]  font-semibold rounded-l-none"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0C6338] rounded-r-lg" />
                )}
                {item.icon}
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            );
          }
          return (
            <div key={item.name} className="relative">
              <button
                onClick={() => toggleMenu(item.name)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  hasActiveChild
                    ? "bg-[#E0F3E0] text-[#0C6338] font-semibold rounded-l-none"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {hasActiveChild && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0C6338] rounded-r-lg" />
                )}
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="hidden md:inline">{item.name}</span>
                </div>
                <span className="hidden md:inline">
                  {isOpen ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </span>
              </button>

              {/* Submenu */}
              <div
                className={`ml-3 mt-1 flex flex-col gap-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {item.children.map((child) => {
                  const active = pathname === child.href;
                  return (
                    <Link
                      key={child.name}
                      href={child.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ml-4 transition-colors ${
                        active
                          ? "bg-[#dae4da] text-[#0C6338] font-medium "
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {child.icon}
                      <span className="hidden md:inline">{child.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border-t border-gray-200 hidden md:block">
        <p className="text-xs text-gray-500">© 2025 MyApp</p>
      </div>
    </div>
  );
}
