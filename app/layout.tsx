import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/wrappers/ConvexProvideer";
import Navbar from './(landingpage)/components/Navbar'
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import { Toaster } from "sonner";
import Modals from "@/wrappers/Modals";
import ProfileSetup from "@/wrappers/ProfileSetup";
import BGWrapper from "@/wrappers/BGWrapper";
import Drawers from "@/wrappers/Drawers";

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
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Modals />
              <Drawers />
              <ProfileSetup />

              <div className="max-w-screen-xl px-6 mx-auto">
                <div className="min-h-screen">
                  <Navbar />
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
