import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/wrappers/ConvexProvideer";
import { ToastContainer } from 'react-toastify'
import Navbar from './(landingpage)/components/Navbar'
import { ThemeProvider } from "@/wrappers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoryBot",
  description: "",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ToastContainer />
              <div className="bg-[#cad3ff]">
                <div className="max-w-7xl mx-auto">
                  <div className="min-h-screen">
                    <Navbar />
                    {children}
                  </div>
                </div>
              </div>
            </ThemeProvider> 
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
