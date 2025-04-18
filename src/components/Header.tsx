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
    return pathname === path ? 'bg-white/20' : '';
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-2xl group-hover:animate-bounce">🎮</span>
              <span className="text-white text-xl font-bold tracking-tight">
                Bloop
                <span className="text-pink-200">!</span>
              </span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className={`text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all transform hover:scale-105 ${isActive('/dashboard')}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">📊</span>
                    Dashboard
                  </span>
                </Link>
                <Link 
                  href="/missions" 
                  className={`text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all transform hover:scale-105 ${isActive('/missions')}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">🎯</span>
                    Missions
                  </span>
                </Link>
                <Link 
                  href="/parties" 
                  className={`text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all transform hover:scale-105 ${isActive('/parties')}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">🎉</span>
                    Parties
                  </span>
                </Link>
                <div className="ml-4 flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full">
                  <span className="text-xl">👋</span>
                  <span className="text-white text-sm font-medium">
                    {username}
                  </span>
                </div>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-all transform hover:scale-105 ${isActive('/login')}`}
                >
                  <span className="flex items-center">
                    <span className="mr-2">🔑</span>
                    Login
                  </span>
                </Link>
                <Link 
                  href="/register" 
                  className="bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-50 transition-all transform hover:scale-105 shadow-md"
                >
                  <span className="flex items-center">
                    <span className="mr-2">✨</span>
                    Join the Fun
                  </span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
