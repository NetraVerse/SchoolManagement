import "./globals.css";
import type { Metadata } from "next";
import ReactQueryProvider from "@/context/Providers/ReactQueryProvider";
import { PermissionProvider } from "@/context/auth/PermissionContext";
import { ThemeProvider } from "@/context/Theme/ThemeContext";

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
            <ThemeProvider>
              <main>{children}</main>
            </ThemeProvider>
          </PermissionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
