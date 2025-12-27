import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import "rotion/style.css";
import Footer from "./components/Footer";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rotion - Next.js App Router Example",
  description: "Rotion integration example with Next.js App Router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={raleway.variable}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
