'use client';

import { useState } from 'react';
import { MapPin, Clock, Phone, Search } from 'lucide-react';

export default function StoreLocator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  const stores = [
    {
      id: 1,
      name: 'Downtown Manhattan',
      address: '123 Broadway, New York, NY 10012',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
      city: 'New York',
      zipcode: '10012',
    },
    {
      id: 2,
      name: 'Brooklyn Heights',
      address: '456 Atlantic Ave, Brooklyn, NY 11217',
      phone: '+1 (555) 234-5678',
      hours: 'Mon-Sun: 10:00 AM - 11:00 PM',
      city: 'Brooklyn',
      zipcode: '11217',
    },
    {
      id: 3,
      name: 'Queens Plaza',
      address: '789 Queens Blvd, Queens, NY 11373',
      phone: '+1 (555) 345-6789',
      hours: 'Mon-Sun: 9:00 AM - 9:00 PM',
      city: 'Queens',
      zipcode: '11373',
    },
    {
      id: 4,
      name: 'Upper East Side',
      address: '321 Madison Ave, New York, NY 10017',
      phone: '+1 (555) 456-7890',
      hours: 'Mon-Sun: 8:00 AM - 10:00 PM',
      city: 'New York',
      zipcode: '10017',
    },
    {
      id: 5,
      name: 'Williamsburg',
      address: '567 Bedford Ave, Brooklyn, NY 11249',
      phone: '+1 (555) 567-8901',
      hours: 'Mon-Sun: 10:00 AM - 11:00 PM',
      city: 'Brooklyn',
      zipcode: '11249',
    },
    {
      id: 6,
      name: 'Times Square',
      address: '890 7th Ave, New York, NY 10019',
      phone: '+1 (555) 678-9012',
      hours: 'Mon-Sun: 7:00 AM - 12:00 AM',
      city: 'New York',
      zipcode: '10019',
    },
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.zipcode.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-blue-800 mb-6">
            Store Locator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your nearest Makers of Milkshakes outlet and visit us today!
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by city, address, or zip code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-800 focus:outline-none transition-colors text-lg"
            />
          </div>
        </div>
      </section>

      {/* Map and Store List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Map Placeholder */}
            <div className="lg:sticky lg:top-32 h-[500px] lg:h-[600px]">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl shadow-lg overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-20 h-20 text-blue-800 mx-auto mb-4" />
                    <p className="text-2xl font-bold text-blue-800 mb-2">Interactive Map</p>
                    <p className="text-gray-600">
                      {filteredStores.length} location{filteredStores.length !== 1 ? 's' : ''} found
                    </p>
                  </div>
                </div>

                {/* Decorative map pins */}
                <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-blue-800 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-blue-800 rounded-full animate-pulse delay-100"></div>
                <div className="absolute bottom-1/3 left-1/2 w-8 h-8 bg-blue-800 rounded-full animate-pulse delay-200"></div>
                <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-blue-800 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>

            {/* Store List */}
            <div className="space-y-4">
              {filteredStores.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-600">No stores found. Try a different search!</p>
                </div>
              ) : (
                filteredStores.map((store) => (
                  <div
                    key={store.id}
                    className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                      selectedStore === store.id ? 'border-blue-800 scale-105' : 'border-transparent'
                    }`}
                    onClick={() => setSelectedStore(store.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-blue-800" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-blue-800 mb-2">
                          {store.name}
                        </h3>

                        <div className="space-y-2 text-gray-600">
                          <p className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-1 flex-shrink-0" />
                            <span>{store.address}</span>
                          </p>

                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                            <a href={`tel:${store.phone}`} className="hover:text-blue-800 transition-colors">
                              {store.phone}
                            </a>
                          </p>

                          <p className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span>{store.hours}</span>
                          </p>
                        </div>

                        <div className="mt-4 flex space-x-3">
                          <button className="flex-1 bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-900 transition-colors">
                            Get Directions
                          </button>
                          <button className="flex-1 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition-colors">
                            Call Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-xl opacity-90">Cities Nationwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <p className="text-xl opacity-90">Store Locations</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1M+</div>
              <p className="text-xl opacity-90">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Soon Section */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-blue-800 mb-8">
            Coming Soon to Your City!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We&apos;re expanding to new locations. Be the first to know when we open near you!
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-900 transition-colors"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
