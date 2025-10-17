'use client';

import { useState } from 'react';
import { Camera } from 'lucide-react';

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
      <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge with 3D Effect */}
          <div className="inline-flex items-center space-x-2 glass-3d badge-3d px-6 py-3 rounded-full shadow-lg mb-6 border-2 border-blue-200">
            <Camera className="w-5 h-5 text-blue-500" />
            <span className="text-blue-800 font-semibold">Moments Worth Sharing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-800 mb-6">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
            Explore our delicious creations, happy moments, and vibrant outlets through our visual journey.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-md border-b-2 border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.filter}
                onClick={() => setActiveFilter(category.filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 text-base ${
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
      <section className="py-16 bg-gradient-to-b from-white via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                onClick={() => setSelectedImage(item.id)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} transform group-hover:scale-110 transition-transform duration-500`}></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                  <div className="text-7xl md:text-8xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {item.emoji}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 px-4 py-2 rounded-full">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Want to Be Featured?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Tag us on social media with #MakersOfMilkshakes
          </p>
          <button className="px-8 py-4 bg-white text-blue-800 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
            Follow Us
          </button>
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
