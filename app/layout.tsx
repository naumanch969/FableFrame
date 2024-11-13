import type { Metadata } from "next";
import "./globals.css";
<<<<<<< Updated upstream
import { Nunito } from 'next/font/google'
=======
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/wrappers/ThemeProvider";
import { Nunito } from 'next/font/google';
import Navbar from "./(landingpage)/components/Navbar";
>>>>>>> Stashed changes

const AppFont = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "FableFrame",
  description: "Your Tale, Our Frame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< Updated upstream
      <body
        className={`${AppFont.className}`}
      >
        {children}
=======
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
            {children}
          </ThemeProvider>
        </ClerkProvider>
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
