import type { Metadata } from "next";
import "./globals.css";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { ConvexClientProvider } from "@/wrappers/ConvexProvideer";
import { ThemeProvider } from "@/wrappers/ThemeProvider";
import { Toaster } from "sonner";
import Modals from "@/wrappers/Modals";
import ProfileSetup from "@/wrappers/ProfileSetup";
import Drawers from "@/wrappers/Drawers";
import { Montserrat } from 'next/font/google';

export const metadata: Metadata = {
  title: "Fable Frame",
  description: "Frame your imagination",
};

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body className={montserrat.className}>
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
