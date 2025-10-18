import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden" data-404-page="true">
      {/* Main Container */}
      <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6 relative z-10">

        {/* 404 Large Text */}
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-blue-800 tracking-wider drop-shadow-lg">
            404
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-blue-700 tracking-wide uppercase">
            Page Not Found
          </h2>
        </div>

        {/* Character Image */}
        <div className="flex justify-center my-4 md:my-6">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <Image
              src="/404_page_character.png"
              alt="Lost character sitting"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 md:space-y-4">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium">
            Oops! Looks like you got lost.
          </p>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you&apos;re looking for seems to have vanished into thin air.
            Don&apos;t worry though, even superheroes get lost sometimes!
          </p>
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center pt-4 md:pt-6">
          <Link
            href="/"
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-base md:text-lg"
          >
            Back to Home
          </Link>
        </div>

        {/* Fun Message */}
        <div className="pt-4 md:pt-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-500 italic">
            While you&apos;re here, why not grab a milkshake? 🥤
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 right-10 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-pink-200 rounded-full opacity-20 animate-bounce animation-delay-1000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-300 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
    </div>
  );
}
