"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import useRoleWiseSidebarMenu from "../SuperAdmin/navigation/hooks/useRoleWiseSidebarMenu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );
  const navigate = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate.push("/");
  }, [navigate]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);
  const { data: sideBarMenu } = useRoleWiseSidebarMenu(userId);

  return (
    <div className="flex">
      <Sidebar
        sideBarItems={{
          module: Array.isArray(sideBarMenu) ? sideBarMenu : [],
        }}
        isOpen={true}
      />
      <div className="flex-1 ">{children}</div>
    </div>
  );
}
