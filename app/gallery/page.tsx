'use client';

import { useState } from 'react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryItems = [
    { id: 1, type: 'milkshake', emoji: '🥤', title: 'Classic Collection', color: 'from-blue-400 to-blue-600' },
    { id: 2, type: 'customer', emoji: '😊', title: 'Happy Customers', color: 'from-pink-400 to-pink-600' },
    { id: 3, type: 'milkshake', emoji: '🍓', title: 'Berry Delights', color: 'from-red-400 to-red-600' },
    { id: 4, type: 'outlet', emoji: '🏪', title: 'Our Outlets', color: 'from-purple-400 to-purple-600' },
    { id: 5, type: 'milkshake', emoji: '🍫', title: 'Chocolate Heaven', color: 'from-amber-600 to-amber-800' },
    { id: 6, type: 'customer', emoji: '🎉', title: 'Celebrations', color: 'from-yellow-400 to-yellow-600' },
    { id: 7, type: 'milkshake', emoji: '🥭', title: 'Tropical Paradise', color: 'from-orange-400 to-orange-600' },
    { id: 8, type: 'outlet', emoji: '✨', title: 'Store Ambiance', color: 'from-cyan-400 to-cyan-600' },
    { id: 9, type: 'milkshake', emoji: '🍪', title: 'Cookie Crunch', color: 'from-stone-400 to-stone-600' },
    { id: 10, type: 'customer', emoji: '👨‍👩‍👧‍👦', title: 'Family Time', color: 'from-green-400 to-green-600' },
    { id: 11, type: 'milkshake', emoji: '🎂', title: 'Birthday Specials', color: 'from-indigo-400 to-indigo-600' },
    { id: 12, type: 'outlet', emoji: '🌟', title: 'Grand Opening', color: 'from-violet-400 to-violet-600' },
  ];

  const categories = [
    { name: 'All', filter: 'all' },
    { name: 'Milkshakes', filter: 'milkshake' },
    { name: 'Customers', filter: 'customer' },
    { name: 'Outlets', filter: 'outlet' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our delicious creations, happy moments, and vibrant outlets through our visual journey.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.filter}
                onClick={() => setActiveFilter(category.filter)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === category.filter
                    ? 'bg-blue-800 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transform group-hover:scale-110 transition-transform duration-500`}></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <div className="text-8xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {item.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-4">
            Share Your Shake Moments!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Tag us @makersofmilkshakes to be featured in our gallery
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Follow Us on Instagram
          </a>
        </div>
      </section>

      {/* Modal for Full View */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl">
            {galleryItems.find(item => item.id === selectedImage) && (
              <div className={`absolute inset-0 bg-gradient-to-br ${galleryItems.find(item => item.id === selectedImage)?.color} flex flex-col items-center justify-center p-12`}>
                <div className="text-[200px]">
                  {galleryItems.find(item => item.id === selectedImage)?.emoji}
                </div>
                <h3 className="text-4xl font-bold text-white mt-8">
                  {galleryItems.find(item => item.id === selectedImage)?.title}
                </h3>
              </div>
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-12 h-12 bg-white text-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

