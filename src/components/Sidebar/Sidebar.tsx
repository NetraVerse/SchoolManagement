/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import adi from "@/assets/adi.jpg";
import {
  BadgeCent,
  Calculator,
  ChevronDown,
  ChevronRight,
  Factory,
  LogOut,
  LucideProps,
  SheetIcon,
  User,
  UserCog,
} from "lucide-react";
import { ISidebar } from "@/types/ISidebar";
import { usePermissions } from "@/context/auth/PermissionContext";
import {
  Home,
  Navigation,
  School,
  LockKeyholeOpen,
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
  let role = "";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeSubModule, setActiveSubModule] = useState<string | null>(null);
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const pathAfterFirst = `/${parts.slice(1).join("/")}`;
  const navigate = useRouter();
  const storedUser = localStorage.getItem("userDetails");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      role = parsedUser.role;
    } catch (error) {
      console.error("Failed to parse user details:", error);
    }
  }

  const withRolePrefix = (path: string) => {
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    let prefix;
    if (role === "superadmin") {
      prefix = "SuperAdmin";
    } else if (role === "admin") prefix = "admin";
    else prefix = "endUser";
    return `/${prefix?.toLowerCase()}${cleanPath}`;
  };

  useEffect(() => {
    if (role === "superadmin" || role === "developeruser") {
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
    Navigation: Navigation,
    "Access Control": LockKeyholeOpen,
    "Institution SetUp": School,
    User: User,
    Role: UserCog,
    Inventory: Factory,
    Sales: BadgeCent,
    Report: SheetIcon,
    Account: Calculator,
    Setup: Settings,
  };

  const sortByRank = (a: any, b: any) => (a.rank ?? 999) - (b.rank ?? 999);
  const handleLogout = () => {
    navigate.push("/");
  };
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
      className={`h-screen flex flex-col dark:bg-[#353535] bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ${
        isOpen ? "w-16 md:w-64" : "w-16"
      }`}
    >
      <div className="p-4 pb-[1.7rem] pt-6 flex justify-center md:justify-start border-b border-gray-200">
        <Link
          href={
            role === "superadmin"
              ? "/SuperAdmin/dashboard"
              : role === "developeruse"
              ? "/Developer/dashboard"
              : withRolePrefix("dashboard")
          }
          className="flex items-center cursor-pointer"
        >
          <span className="ml-3 text-lg font-semibold hidden md:inline">
            MyApp
          </span>
        </Link>
      </div>
      <div className="flex items-center justify-between px-4 text-gray-800 dark:text-white py-2 bg-white shadow-sm border-y dark:border-white dark:bg-[#353535] ">
        <div className="relative w-9 h-9">
          <img
            src={adi.src}
            alt="User"
            className="w-8 h-9 rounded-full object-cover cursor-pointer ml-auto"
          />
        </div>
        <span className="text-md  font-semibold  group-hover:text-blue-600 transition-colors hidden md:inline">
          {role}
        </span>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <LogOut className=" hover:text-red-500 transition-colors" />
        </button>
      </div>
      <div className="flex-1 mt-4 px-2 overflow-y-auto space-y-1">
        {navLinks
          .filter((item) => {
            const lowerRole = role?.toLowerCase() || "";
            if (lowerRole === "superadmin" || lowerRole === "developeruser")
              return (item.allowedRoles ?? []).includes(lowerRole);
            return true;
          })
          .map((item) => {
            const hasSubItems = item.subItems.length > 0;
            const isOpen = activeSection === item.key;
            const hasActiveChild = item.subItems.some(
              (child) => pathAfterFirst === child.targetUrl
            );
            const active = pathAfterFirst === item.url;
            if (!hasSubItems) {
              return (
                <Link
                  key={item.key}
                  href={
                    role === "superadmin" || role === "developeruser"
                      ? item.url
                      : withRolePrefix(item.url)
                  }
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "bg-[#CCE3FC] text-[#035BBA] font-semibold rounded-l-none"
                      : "text-gray-600 hover:bg-gray-300 dark:text-white hover:text-gray-800 dark:hover:text-black"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#035BBA] rounded-r-lg" />
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
                      ? "bg-[#CCE3FC] text-[#035BBA] font-semibold rounded-l-none"
                      : "text-gray-600 hover:bg-gray-300 dark:text-white hover:text-gray-800 dark:hover:text-black"
                  }`}
                >
                  {hasActiveChild && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-[#035BBA] rounded-r-lg" />
                  )}
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon size={18} />}
                    <span className="hidden md:inline  ">{item.name}</span>
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
                  {item.subItems.map((subItem, index) => {
                    const activeSub = pathAfterFirst === subItem.targetUrl;
                    return (
                      <Link
                        key={subItem.targetUrl + index}
                        href={
                          role === "superadmin" || role === "developeruser"
                            ? subItem.targetUrl
                            : withRolePrefix(subItem.targetUrl)
                        }
                        onClick={() =>
                          handleSelectSubModule(subItem.subModulesId!)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm ml-4 transition-colors ${
                          activeSub
                            ? "bg-[#e5f1fe] text-[#035BBA] font-medium"
                            : "text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-400 dark:text-[#e2e2e2] hover:text-gray-800 dark:hover:text-black"
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
