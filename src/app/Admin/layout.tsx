"use client";
import Sidebar from "@/components/Sidebar/Sidebar";
import SuperAdminSidebar from "@/tempdata/SuperAdminNavItems.json";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar sideBarItems={SuperAdminSidebar} isOpen={true} />
      <div className="flex-1 ">{children}</div>
    </div>
  );
}
