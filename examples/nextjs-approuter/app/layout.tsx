import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "rotion/style-without-dark.css";
import "./globals.css";
import { Header } from "./compornents/Header";
import styles from "./layout.module.css";

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
        <Header />
        <div className={styles.content}>
          {children}
        </div>
      </body>
    </html>
  );
}
