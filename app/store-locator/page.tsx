'use client';

import { useMemo, useState } from 'react';
import { MapPin, Clock, Phone, Search, Navigation } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import storesGeo from './stores.json';
import * as turf from '@turf/turf';

// Define raw types matching the JSON (coordinates are number[])
type RawFeature = {
  type: 'Feature';
  geometry: { type: 'Point'; coordinates: number[] };
  properties: {
    location?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    state?: string;
    phoneFormatted?: string;
    phone?: string;
  };
};

type RawFeatureCollection = {
  type: 'FeatureCollection';
  features: RawFeature[];
};

const InteractiveMap = dynamic(() => import('@/app/components/InteractiveMap'), { ssr: false });

export default function StoreLocator() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStore, setSelectedStore] = useState<number | null>(null);
  const [searchPoint, setSearchPoint] = useState<[number, number] | null>(null);

  // Basic helper to build directions link and tel URI
  const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, '')}`;
  const directionsHref = (address: string) =>
    `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  // Map legacy GeoJSON stores to UI model
  const stores = useMemo(() => {
    const features = (storesGeo as unknown as RawFeatureCollection).features;

    return features.map((f, idx) => {
      // Normalize coordinates into a strict tuple [lng, lat]
      const coordsArray = Array.isArray(f.geometry.coordinates) ? f.geometry.coordinates : [];
      const lng = typeof coordsArray[0] === 'number' ? coordsArray[0] : 0;
      const lat = typeof coordsArray[1] === 'number' ? coordsArray[1] : 0;
      const coords: [number, number] = [lng, lat];

      return {
        id: idx + 1,
        name: f.properties.location || f.properties.address || 'Store',
        address: f.properties.address || '',
        phone: f.properties.phoneFormatted || f.properties.phone || '',
        hours: 'Mon-Sun: 10:00 AM - 10:00 PM',
        city: f.properties.city || f.properties.state || '',
        zipcode: f.properties.postalCode || '',
        distance: '',
        coordinates: coords,
      };
    });
  }, []);

  // If we have a search point, compute distance for each store (km) and sort by nearest
  const storesWithDistance = useMemo(() => {
    if (!searchPoint) return stores;
    const from = turf.point(searchPoint);
    const enriched = stores.map((s) => {
      const dKm = turf.distance(from, turf.point(s.coordinates), { units: 'kilometers' });
      const rounded = Math.round(dKm * 100) / 100; // 2 decimals
      return { ...s, distance: `${rounded} KM away`, _distanceValue: dKm };
    });
    return enriched
      .sort((a, b) => a._distanceValue - b._distanceValue)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ _distanceValue, ...rest }) => rest);
  }, [stores, searchPoint]);

  const filteredStores = useMemo(
    () =>
      storesWithDistance.filter((store) =>
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (store.city || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (store.zipcode || '').includes(searchQuery)
      ),
    [storesWithDistance, searchQuery]
  );

  // Ensure selectedStore is valid when filtering
  const selectedIsFiltered = selectedStore != null && filteredStores.some((s) => s.id === selectedStore);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b91cb]/5 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2b91cb] to-[#1e7bb8] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Nearest Store</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
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
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-[#2b91cb] focus:outline-none transition-colors text-lg"
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
              <h2 className="text-3xl font-bold text-[#2b91cb] mb-8">Our Locations ({filteredStores.length})</h2>

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
                          ? 'border-[#2b91cb] bg-[#2b91cb]/5'
                          : 'border-transparent hover:border-[#2b91cb]/20'
                      }`}
                      onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#2b91cb] mb-2">{store.name}</h3>
                          <div className="flex items-start space-x-2 text-gray-600 mb-2">
                            <MapPin className="w-5 h-5 text-[#2b91cb] mt-0.5 flex-shrink-0" />
                            <span>{store.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          {store.distance && (
                            <span className="inline-block px-3 py-1 bg-[#2b91cb]/10 text-[#2b91cb] rounded-full text-sm font-semibold">
                              {store.distance}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-[#2b91cb]" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-[#2b91cb]" />
                          <span>{store.hours}</span>
                        </div>
                      </div>

                      {selectedStore === store.id && (
                        <div className="mt-6 pt-4 border-t border-[#2b91cb]/20">
                          <div className="flex flex-wrap gap-3">
                            <a
                              href={directionsHref(store.address)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 bg-[#2b91cb] text-white px-4 py-2 rounded-full hover:bg-[#1e7bb8] transition-colors text-sm font-semibold"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Navigation className="w-4 h-4" />
                              <span>Get Directions</span>
                            </a>
                            <a
                              href={telHref(store.phone)}
                              className="flex items-center space-x-2 bg-white border-2 border-[#2b91cb] text-[#2b91cb] px-4 py-2 rounded-full hover:bg-[#2b91cb]/10 transition-colors text-sm font-semibold"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="w-4 h-4" />
                              <span>Call Store</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Map */}
            <div className="lg:sticky lg:top-8">
              <InteractiveMap
                stores={filteredStores.map((s) => ({
                  id: s.id,
                  name: s.name,
                  address: s.address,
                  phone: s.phone,
                  hours: s.hours,
                  city: s.city,
                  zipcode: s.zipcode,
                  coordinates: s.coordinates,
                }))}
                selectedStoreId={selectedIsFiltered ? selectedStore : null}
                onSelectStore={(id) => setSelectedStore(id)}
                onSearchResult={(lngLat) => setSearchPoint(lngLat)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-[#2b91cb] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Can&apos;t Find Your Location?</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            We&apos;re expanding rapidly! If we&apos;re not in your area yet, let us know where you&apos;d like to see us next.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-white text-[#2b91cb] px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-300 hover:text-[#2b91cb] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Request a Location</span>
            <MapPin className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
