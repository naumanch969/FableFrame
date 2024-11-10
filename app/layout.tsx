import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from 'next/font/google'

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
      <body
        className={`${AppFont.className}`}
      >
        {children}
      </body>
    </html>
  );
}
