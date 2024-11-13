import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/wrappers/ThemeProvider";
import { Nunito } from 'next/font/google';
import Navbar from "./(landingpage)/components/Navbar";

const AppFont = Nunito({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: "FableFrame",
  description: "Your Tale, Your Frame",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={AppFont.className}>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
          >
            <div className="bg-[#cad3ff]">
              <div className="max-w-7xl mx-auto">
                <div className="min-h-screen">
                  <Navbar />
                  {children}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
