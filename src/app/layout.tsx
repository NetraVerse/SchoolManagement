import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar/Sidebar";
import ReactQueryProvider from "@/context/Providers/ReactQueryProvider";
import { PermissionProvider } from "@/context/auth/PermissionContext";

export const metadata: Metadata = {
  title: "Next.js Sidebar Example",
  description: "Sidebar with navigation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <PermissionProvider>
            <main>{children}</main>
          </PermissionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
