import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/wrappers/ThemeProvider";
import { Nunito } from 'next/font/google';

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
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
