import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitSphere",
  description:
    "FitSphere is the ultimate social sports app. Track your fitness, join tournaments, and connect with athletes in your community.",
  keywords: "sports app, fitness tracker, tournament, sports social",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
       data-theme="light"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavBar />
        <main className="pt-16 grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
