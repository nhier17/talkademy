import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/nav/Navbar";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Talkademy",
  description: "Real-time AI teaching platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }}}>
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${bricolage.variable} antialiased`}
      >

          <Navbar />
          <Toaster richColors position="top-center" />
          {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
