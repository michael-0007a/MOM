'use client';

import React from 'react';

export default function ContactSlider() {
  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200">
      {/* Mountains Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-200"></div>

      {/* Animated Elements */}
      <div className="relative h-full">
        {/* Sun with enhanced glow */}
        <div
          className="absolute top-20 right-20 w-20 h-20 bg-yellow-400 rounded-full hover:scale-110 transition-transform duration-300"
          style={{
            boxShadow: '0 0 50px rgba(255, 255, 0, 0.3), 0 0 100px rgba(255, 255, 0, 0.1)',
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>

        {/* Enhanced Clouds with hover effects */}
        <div
          className="absolute top-32 left-1/4 w-24 h-12 bg-white rounded-full opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{
            animation: 'drift 20s linear infinite',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
          }}
        ></div>
        <div
          className="absolute top-40 right-1/3 w-20 h-10 bg-white rounded-full opacity-70 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
          style={{
            animation: 'drift 25s linear infinite reverse',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
          }}
        ></div>

        {/* Simple Delivery Truck without milkshake glass */}
        <div
          className="absolute bottom-32 left-0 w-full h-full hover:brightness-110 transition-all duration-300"
          style={{
            background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 60'%3E%3Cg%3E%3Crect x='20' y='30' width='50' height='20' rx='5' fill='%232b91cb'/%3E%3Ccircle cx='30' cy='55' r='5' fill='%23333'/%3E%3Ccircle cx='60' cy='55' r='5' fill='%23333'/%3E%3Crect x='25' y='20' width='20' height='15' fill='%23FFB6C1'/%3E%3Ctext x='35' y='35' font-size='8' text-anchor='middle' fill='white'%3EMOM%3C/text%3E%3C/g%3E%3C/svg%3E") no-repeat`,
            backgroundSize: 'auto 80px',
            backgroundPosition: '-200px bottom',
            animation: 'parallax_truck linear 15s infinite both',
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))'
          }}
        ></div>

        {/* Left-aligned Content with enhanced styling */}
        <div className="absolute inset-0 flex items-center">
          <div className="ml-16 z-10 max-w-2xl">
            {/* Company Logo/Badge */}
            <div className="mb-6 inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 hover:bg-white/30 transition-all duration-300 group">
              <div className="w-3 h-3 bg-[#2b91cb] rounded-full mr-3 animate-pulse group-hover:animate-bounce"></div>
              <span className="text-[#2b91cb] font-semibold text-sm uppercase tracking-wider">Hyderabad Startup</span>
            </div>

            {/* Main Heading with glow effect */}
            <h1 className="text-7xl font-bold text-[#2b91cb] mb-4 leading-tight hover:scale-105 transition-transform duration-300 cursor-default"
                style={{
                  textShadow: '0 0 20px rgba(43, 145, 203, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1)',
                  animation: 'glow 3s ease-in-out infinite alternate'
                }}>
              Makers of
              <br />
              <span className="bg-gradient-to-r from-[#2b91cb] to-purple-600 bg-clip-text text-transparent animate-pulse">
                Milkshake
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-2xl text-gray-700 mb-6 font-medium hover:text-gray-800 transition-colors duration-300"
               style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              Blending science and sweetness — every sip precision-crafted for happiness
            </p>

            {/* Company Description */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
              <p className="text-lg text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                From a small kitchen in Hyderabad to serving happiness in 50+ cities.
                We&apos;re revolutionizing the milkshake experience with innovative flavors
                and premium ingredients, delivered fresh to your doorstep.
              </p>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 group">
                <div className="text-[#2b91cb] text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🧪</div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#2b91cb] transition-colors duration-300">Science-Based</h3>
                <p className="text-sm text-gray-600">Precision-crafted recipes using molecular gastronomy techniques</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 group">
                <div className="text-[#2b91cb] text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">🚚</div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-[#2b91cb] transition-colors duration-300">Fresh Delivery</h3>
                <p className="text-sm text-gray-600">Direct from our kitchen to your doorstep in under 30 minutes</p>
              </div>
            </div>

            {/* CTA Buttons with enhanced effects */}
            <div className="flex gap-4 mb-8">
              <button className="group bg-[#2b91cb] text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden">
                <span className="relative z-10">Order Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>

              <button className="group bg-white/20 backdrop-blur-sm text-[#2b91cb] px-8 py-4 rounded-full text-xl font-semibold border-2 border-[#2b91cb]/30 hover:bg-[#2b91cb] hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl">
                <span className="flex items-center gap-2">
                  Learn More
                  <div className="w-2 h-2 bg-current rounded-full group-hover:animate-bounce"></div>
                </span>
              </button>
            </div>

            {/* Floating Statistics */}
            <div className="flex gap-6">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                <div className="text-2xl font-bold text-[#2b91cb] group-hover:text-purple-600 transition-colors duration-300">50+</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Cities</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                <div className="text-2xl font-bold text-[#2b91cb] group-hover:text-purple-600 transition-colors duration-300">100K+</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Happy Customers</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 hover:bg-white/25 transition-all duration-300 group cursor-pointer transform hover:scale-105">
                <div className="text-2xl font-bold text-[#2b91cb] group-hover:text-purple-600 transition-colors duration-300">2018</div>
                <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Founded</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles with enhanced animation */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-pink-300 rounded-full opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
             style={{ animation: 'float 4s ease-in-out infinite 1s' }}></div>
        <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-purple-300 rounded-full opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
             style={{ animation: 'float 5s ease-in-out infinite 2s' }}></div>
        <div className="absolute top-3/4 right-1/3 w-2 h-2 bg-orange-300 rounded-full opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
             style={{ animation: 'float 3s ease-in-out infinite 0.5s' }}></div>

        {/* Additional animated elements */}
        <div className="absolute top-1/3 left-2/3 w-6 h-6 bg-yellow-300 rounded-full opacity-30 hover:opacity-80 transition-all duration-300 cursor-pointer transform hover:scale-150"
             style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-20px) rotate(5deg) scale(1.1); }
        }
        
        @keyframes drift {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        
        @keyframes parallax_truck {
          0% { background-position: -200px bottom; }
          100% { background-position: calc(100vw + 200px) bottom; }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 20px rgba(43, 145, 203, 0.3), 0 4px 8px rgba(0, 0, 0, 0.1); }
          100% { text-shadow: 0 0 30px rgba(43, 145, 203, 0.5), 0 0 40px rgba(43, 145, 203, 0.2), 0 4px 8px rgba(0, 0, 0, 0.1); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}