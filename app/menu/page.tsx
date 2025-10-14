'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Classic', 'Premium', 'Chocolate', 'Fruity', 'Seasonal'];

  const menuItems = [
    {
      id: 1,
      name: 'Classic Vanilla',
      category: 'Classic',
      description: 'Rich and creamy vanilla blended to perfection',
      price: '$5.99',
      emoji: '🤍',
    },
    {
      id: 2,
      name: 'Strawberry Dream',
      category: 'Fruity',
      description: 'Fresh strawberries with a hint of cream',
      price: '$6.49',
      emoji: '🍓',
    },
    {
      id: 3,
      name: 'Chocolate Heaven',
      category: 'Chocolate',
      description: 'Triple chocolate indulgence',
      price: '$6.99',
      emoji: '🍫',
    },
    {
      id: 4,
      name: 'Cookies & Cream',
      category: 'Classic',
      description: 'Crushed Oreos in vanilla ice cream',
      price: '$6.99',
      emoji: '🍪',
    },
    {
      id: 5,
      name: 'Mango Tango',
      category: 'Fruity',
      description: 'Tropical mango with a tangy twist',
      price: '$6.49',
      emoji: '🥭',
    },
    {
      id: 6,
      name: 'Salted Caramel',
      category: 'Premium',
      description: 'Sweet and salty perfection',
      price: '$7.49',
      emoji: '🍮',
    },
    {
      id: 7,
      name: 'Mint Chocolate Chip',
      category: 'Chocolate',
      description: 'Refreshing mint with chocolate chips',
      price: '$6.99',
      emoji: '🍃',
    },
    {
      id: 8,
      name: 'Peanut Butter Cup',
      category: 'Premium',
      description: 'Reese\'s lovers favorite',
      price: '$7.49',
      emoji: '🥜',
    },
    {
      id: 9,
      name: 'Banana Split',
      category: 'Classic',
      description: 'Classic banana split in a shake',
      price: '$6.49',
      emoji: '🍌',
    },
    {
      id: 10,
      name: 'Berry Blast',
      category: 'Fruity',
      description: 'Mixed berries bursting with flavor',
      price: '$6.49',
      emoji: '🫐',
    },
    {
      id: 11,
      name: 'Dark Chocolate Truffle',
      category: 'Premium',
      description: 'Rich dark chocolate with truffle pieces',
      price: '$7.99',
      emoji: '🍷',
    },
    {
      id: 12,
      name: 'Pumpkin Spice',
      category: 'Seasonal',
      description: 'Fall favorite with real pumpkin',
      price: '$6.99',
      emoji: '🎃',
    },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Our Menu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our delicious selection of handcrafted milkshakes,
            each made with premium ingredients and lots of love.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a shake..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-800 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">No shakes found. Try a different search!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Emoji/Image */}
                  <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                    {item.emoji}
                  </div>

                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full mb-3">
                    {item.category}
                  </span>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-blue-800 mb-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-800">
                      {item.price}
                    </span>
                    <button className="bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-900 transition-colors">
                      Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Offer Section */}
      <section className="py-20 bg-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Special Offer!</h2>
          <p className="text-xl mb-8">Buy 2 shakes, get 1 free on weekends!</p>
          <button className="bg-white text-blue-800 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Learn More
          </button>
        </div>
      </section>
    </div>
  );
}

