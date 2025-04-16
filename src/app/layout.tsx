// src/app/layout.tsx
import "../styles/globals.css"; // Corrected path
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <nav className="p-4 bg-blue-500 text-white">
          {session ? (
            <a href="/dashboard">Dashboard</a>
          ) : (
            <a href="/login">Login</a>
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
