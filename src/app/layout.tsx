// src/app/layout.tsx
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

// Load Inter font
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bloop - Party Missions",
  description: "Complete secret missions at parties and earn points!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background flex flex-col">
        <Header 
          isLoggedIn={!!session} 
          username={session?.user?.name || undefined} 
        />
        
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        
        <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-12 shadow-lg mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <p className="text-sm">© {new Date().getFullYear()} Bloop - All rights reserved</p>
              </div>
              <div className="flex space-x-8">
                <a href="/privacy" className="text-white hover:text-purple-200 text-sm transition-colors">Privacy Policy</a>
                <a href="/terms" className="text-white hover:text-purple-200 text-sm transition-colors">Terms of Service</a>
                <a href="/contact" className="text-white hover:text-purple-200 text-sm transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
