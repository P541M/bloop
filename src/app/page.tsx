import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero section */}
      <section className="flex-grow flex flex-col md:flex-row items-center justify-center md:justify-between px-4 py-12 md:py-20">
        {/* Hero content */}
        <div className="text-center md:text-left md:max-w-md lg:max-w-lg space-y-6 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
              Make Every Party
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
              Unforgettable!
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Join the fun with Bloop! Get secret missions, complete challenges, and create hilarious memories with friends. The party game that brings everyone together! 🎉
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link 
              href="/register" 
              className="btn bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Start the Party! 🎈
            </Link>
            
            <Link 
              href="/login" 
              className="btn bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 px-8 py-3 rounded-full text-base font-semibold shadow-md hover:shadow-lg border-2 border-purple-200 dark:border-purple-800"
            >
              Join In! 🎮
            </Link>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="relative w-full max-w-md md:max-w-lg h-64 md:h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-90 transform rotate-3"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-violet-500 rounded-3xl opacity-90 transform -rotate-3"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center transform hover:scale-105 transition-transform">
              <div className="text-8xl mb-4 animate-bounce">🎮</div>
              <p className="text-2xl font-bold">Party Time!</p>
              <p className="text-lg mt-2">Ready for some fun?</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="px-4 py-16 bg-gray-50 dark:bg-gray-800/50">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
          How the Magic Happens ✨
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-white text-2xl">1</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Join the Party</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Scan a QR code or enter a party code to jump right into the fun! 🎯
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-white text-2xl">2</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Get Your Mission</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Receive a secret mission that'll make the party even more exciting! 🎭
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="text-white text-2xl">3</span>
            </div>
            <h3 className="text-xl font-semibold text-center mb-3">Make Memories</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Complete missions, earn points, and create unforgettable moments! 🌟
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
