import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Hero section */}
      <section className="flex-grow flex flex-col md:flex-row items-center justify-center md:justify-between max-w-6xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
        {/* Hero content */}
        <div className="text-center md:text-left md:max-w-md lg:max-w-lg space-y-6 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            Complete Secret Missions at Parties
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Join Bloop, meet new people, complete fun challenges, and collect points at social events. Make every party memorable!
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link 
              href="/register" 
              className="btn btn-primary px-8 py-3 rounded-md text-base font-semibold shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
            
            <Link 
              href="/login" 
              className="btn btn-outline px-8 py-3 rounded-md text-base font-semibold"
            >
              Login
            </Link>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="relative w-full max-w-md md:max-w-lg h-64 md:h-96 animate-slide-up">
          {/* You can replace this with an actual image later */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-violet-500 rounded-lg opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-8xl mb-4">🎮</div>
              <p className="text-xl font-bold">Party Missions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow animate-fade-in">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-blue-600 dark:text-blue-400 text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Join a Party</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Scan the QR code at the entrance or join with a unique code provided by the host.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-purple-600 dark:text-purple-400 text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Get Missions</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Receive fun challenges and secret missions to complete during the party.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-green-600 dark:text-green-400 text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Earn Points</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                Complete missions, scan verification QR codes, and climb the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
