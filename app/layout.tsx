import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/ui/nav/Navbar";

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
    <html lang="en">
      <body
        className={`${bricolage.variable} antialiased`}
      >
        <ClerkProvider appearance={{ variables: { colorPrimary: '#fe5933' }}}>
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
