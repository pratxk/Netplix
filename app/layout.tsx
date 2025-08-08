import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SearchContextProvider } from "@/Context/SearchContext/SearchContext";
import { SingleContextProvider } from "@/Context/SinglePageContext/SinglePageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Netplix - Movies & TV Shows",
  description: "Discover millions of movies, TV shows and people to explore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#010d21] text-white overflow-x-hidden`}
      >
        <SearchContextProvider>
          <SingleContextProvider>
            <Navbar />
            {children}
            <Footer />
          </SingleContextProvider>
        </SearchContextProvider>
      </body>
    </html>
  );
}
