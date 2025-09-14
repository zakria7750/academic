import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";
import Footer from "@/components/footer";
export const metadata: Metadata = {
  title: "أكاديمية المعرفة الدولية",
  description: "أكاديمية رائدة... نبني العقول ونطور المستقبل",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-academy-white">
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
