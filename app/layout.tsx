import type { Metadata } from "next";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/wrappers/ConvexProvideer";
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import { Toaster } from "sonner";
import Modals from "@/wrappers/Modals";
import ProfileSetup from "@/wrappers/ProfileSetup";
import Drawers from "@/wrappers/Drawers";

export const metadata: Metadata = {
  title: "StoryBot",
  description: "",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={''}>
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

              {children}

            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
