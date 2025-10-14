'use client';

import { useState } from 'react';
import { MapPin, Clock, Phone, Search, Navigation } from 'lucide-react';
import Link from 'next/link';

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
      distance: '2.3 miles',
    },
    {
      id: 2,
      name: 'Brooklyn Heights',
      address: '456 Montague Street, Brooklyn, NY 11201',
      phone: '+1 (555) 234-5678',
      hours: 'Mon-Sun: 8:00 AM - 11:00 PM',
      city: 'Brooklyn',
      zipcode: '11201',
      distance: '4.7 miles',
    },
    {
      id: 3,
      name: 'Central Park West',
      address: '789 Columbus Avenue, New York, NY 10024',
      phone: '+1 (555) 345-6789',
      hours: 'Mon-Sun: 10:00 AM - 9:00 PM',
      city: 'New York',
      zipcode: '10024',
      distance: '1.8 miles',
    },
    {
      id: 4,
      name: 'Queens Plaza',
      address: '321 Northern Blvd, Long Island City, NY 11101',
      phone: '+1 (555) 456-7890',
      hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
      city: 'Queens',
      zipcode: '11101',
      distance: '6.2 miles',
    },
    {
      id: 5,
      name: 'Staten Island Mall',
      address: '2655 Richmond Avenue, Staten Island, NY 10314',
      phone: '+1 (555) 567-8901',
      hours: 'Mon-Sat: 10:00 AM - 9:00 PM, Sun: 11:00 AM - 7:00 PM',
      city: 'Staten Island',
      zipcode: '10314',
      distance: '12.4 miles',
    },
    {
      id: 6,
      name: 'Bronx Concourse',
      address: '1234 Grand Concourse, Bronx, NY 10456',
      phone: '+1 (555) 678-9012',
      hours: 'Mon-Sun: 9:00 AM - 10:00 PM',
      city: 'Bronx',
      zipcode: '10456',
      distance: '8.9 miles',
    }
  ];

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.zipcode.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Nearest Store
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            Find your nearest Makers of Milkshakes outlet and visit us today!
            Fresh shakes made with love are just around the corner.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by city, address, or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Store Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Store List */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-blue-500 mb-8">
                Our Locations ({filteredStores.length})
              </h2>

              {filteredStores.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-600">No stores found matching your search.</p>
                  <p className="text-gray-500">Try searching by city name or zip code.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredStores.map((store) => (
                    <div
                      key={store.id}
                      className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                        selectedStore === store.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-transparent hover:border-blue-200'
                      }`}
                      onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-blue-500 mb-2">
                            {store.name}
                          </h3>
                          <div className="flex items-start space-x-2 text-gray-600 mb-2">
                            <MapPin className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{store.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-500 rounded-full text-sm font-semibold">
                            {store.distance}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-blue-500" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span>{store.hours}</span>
                        </div>
                      </div>

                      {selectedStore === store.id && (
                        <div className="mt-6 pt-4 border-t border-blue-200">
                          <div className="flex flex-wrap gap-3">
                            <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors text-sm font-semibold">
                              <Navigation className="w-4 h-4" />
                              <span>Get Directions</span>
                            </button>
                            <button className="flex items-center space-x-2 bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors text-sm font-semibold">
                              <Phone className="w-4 h-4" />
                              <span>Call Store</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Map Placeholder */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gray-100 rounded-2xl h-96 lg:h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-600 mb-2">Interactive Map</h3>
                  <p className="text-gray-500">
                    Map integration coming soon!<br />
                    Click on any store to see more details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can&apos;t Find Your Location?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            We&apos;re expanding rapidly! If we&apos;re not in your area yet, let us know where you&apos;d like to see us next.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white text-blue-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Request a Location</span>
            <MapPin className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
