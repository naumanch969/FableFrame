import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/wrappers/ThemeProvider";
import { Nunito } from 'next/font/google';
import Navbar from "./(landingpage)/components/Navbar";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Provider from "./provider";

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
    <ClerkProvider>
      <html lang="en">
        <body className={AppFont.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
