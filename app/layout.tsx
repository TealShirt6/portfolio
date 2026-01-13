import type { Metadata } from "next";
import "./globals.css";
import styles from "./page.module.css"
import Header from "@/components/Header"


export const metadata: Metadata = {
  title: "Michael Bauer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        <Header></Header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
