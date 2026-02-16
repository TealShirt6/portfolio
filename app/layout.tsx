import "./globals.css";
import Header from "@/components/Header"
import { Geist } from "next/font/google";
import type { Metadata } from "next";

// Pass geistSans.variable to html as a css module 
// Then use the font anywhere with font-family: var(--font-geist-sans")
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michael Bauer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <body>
        <Header></Header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
