"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

export default function Header({ isLoggedIn, username }: HeaderProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-white text-xl font-bold">
              Bloop
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors ${isActive('/dashboard')}`}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/missions" 
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors ${isActive('/missions')}`}
                >
                  Missions
                </Link>
                <Link 
                  href="/parties" 
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors ${isActive('/parties')}`}
                >
                  Parties
                </Link>
                <div className="text-white px-3 py-2 rounded-md text-sm font-medium">
                  Welcome, {username}
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors ${isActive('/login')}`}
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className={`text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-500 transition-colors ${isActive('/register')}`}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
