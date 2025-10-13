/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, ChevronRight, LogOut, LucideProps } from "lucide-react";
import { ISidebar } from "@/types/ISidebar";
import { usePermissions } from "@/context/auth/PermissionContext";
import {
  Accessibility,
  Home,
  Navigation,
  School,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

type Props = {
  sideBarItems: ISidebar;
  isOpen: boolean;
};

const Sidebar: React.FC<Props> = ({ isOpen, sideBarItems }: Props) => {
  const { setMenuStatus } = usePermissions();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const storedUser = localStorage.getItem("userDetails");
  let role = "";
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser); // parse JSON
      role = parsedUser.role; // extract the role
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }
  useEffect(() => {
    if (role === "Admin" || role === "developeruser") {
      setMenuStatus([
        {
          menuName: "add",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "edit",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "delete",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
        {
          menuName: "assign",
          isActive: true,
          submoduleId: "",
          icon: "",
          targetUrl: "",
          role: "",
          rank: 0,
        },
      ]);
    }
  }, [role, setMenuStatus]);

  const staticIcons: {
    [key: string]: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  } = {
    Dashboard: Home,
    Setup: Settings,
    Navigation: Navigation,
    "Access Control": Accessibility,
    "Institution Setup": School,
  };

  const sortByRank = (a: any, b: any) => (a.rank ?? 999) - (b.rank ?? 999);

  const sortedModules = [...sideBarItems.module]
    .sort(sortByRank)
    .map((item) => ({
      ...item,
      subModulesResponse: item.subModulesResponse
        ? [...item.subModulesResponse].sort(sortByRank)
        : [],
    }));

  const navLinks = sortedModules.map((item) => ({
    name: item.name,
    url: item.targetUrl,
    key: item.targetUrl,
    icon: staticIcons[item.name],
    subItems: item.subModulesResponse
      ? [...item.subModulesResponse].sort(sortByRank)
      : [],
    allowedRoles: item.role,
  }));

  const toggleSection = (section: string) => {
    setActiveSection((prev) => (prev === section ? null : section));
    if (activeSection !== section) setActiveSubModule(null);
  };

  const handleSelectSubModule = (subModuleId: string) => {
    setActiveSubModule(subModuleId);
  };

  return (
    <div
      className={`h-screen flex flex-col bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
        isOpen ? "w-16 md:w-64" : "w-16"
      }`}
    >
      {/* Logo */}
      <div className="p-4 flex justify-center md:justify-start border-b border-gray-200">
        <Link
          href="/Admin/dashboard"
          className="flex items-center cursor-pointer"
        >
          {/* <img
            src="/logo.svg"
            alt="logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-sm"
          /> */}
          <span className="ml-3 text-lg font-semibold hidden md:inline">
            MyApp
          </span>
        </Link>
      </div>
      <div className="p-4 flex justify-center md:justify-start border-b border-gray-200">
        <Link
          href="/Admin/dashboard"
          className="flex justify-between cursor-pointer"
        >
          {/* <img
            src="/logo.svg"
            alt="logo"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full shadow-sm"
          /> */}
          <span className="ml-3 text-lg font-semibold hidden md:inline">
            My profile
          </span>
          <div className="ml-25">
            <LogOut />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 mt-4 px-2 overflow-y-auto space-y-1">
        {navLinks
          .filter((item) =>
            (item.allowedRoles ?? []).includes(role?.toLowerCase() || "")
          )
          .map((item) => {
            const hasSubItems = item.subItems.length > 0;
            const isOpen = activeSection === item.key;
            const hasActiveChild = item.subItems.some(
              (child) => pathname === child.targetUrl
            );
            const active = pathname === item.url;

            if (!hasSubItems) {
              return (
                <Link
                  key={item.key}
                  href={item.url}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#E0F3E0] text-[#0C6338] font-semibold rounded-l-none"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#0C6338] rounded-r-lg" />
                  )}
                  {item.icon && <item.icon size={18} />}
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              );
            }

            return (
              <div key={item.key} className="relative">
                <button
                  onClick={() => toggleSection(item.key)}
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
                    {item.icon && <item.icon size={18} />}
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
                <div
                  className={`ml-3 mt-1 flex flex-col gap-1 overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {item.subItems.map((subItem) => {
                    const activeSub = pathname === subItem.targetUrl;
                    return (
                      <Link
                        key={subItem.subModulesId}
                        href={subItem.targetUrl}
                        onClick={() =>
                          handleSelectSubModule(subItem.subModulesId!)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ml-4 transition-colors ${
                          activeSub
                            ? "bg-[#dae4da] text-[#0C6338] font-medium"
                            : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                      >
                        <span className="hidden md:inline">{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 hidden md:block">
        <p className="text-xs text-gray-500">© 2025 MyApp</p>
      </div>
    </div>
  );
};

export default Sidebar;
