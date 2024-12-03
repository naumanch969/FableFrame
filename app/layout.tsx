import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Nunito } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import Provider from "./provider";
import { ConvexClientProvider } from "@/wrappers/ConvexProvideer";

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
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
