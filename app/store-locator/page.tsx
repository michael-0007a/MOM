'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { useLenis } from '@/app/components/SmoothScrollProvider';
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
  const [visibleCount, setVisibleCount] = useState(3);
  const [pendingScrollTo, setPendingScrollTo] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'list' | 'map'>('list');
  const [cityFilter, setCityFilter] = useState<string | null>(null); // now used as region filter
  const [sortOption, setSortOption] = useState<'nearest' | 'az'>('nearest');
  const [isLocating, setIsLocating] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const lenis = useLenis();
  const listRef = useRef<HTMLDivElement | null>(null);

  // Fixed region chips
  const regions = ['Telangana', 'Andhra', 'Chennai', 'Bangalore'] as const;

  // Determine a store's region from its city/address with precedence to avoid false matches (e.g., Bangalore Hwy in Hyderabad)
  const deduceRegion = (store: { city?: string; address: string }): 'Telangana' | 'Andhra' | 'Chennai' | 'Bangalore' | null => {
    const hay = `${store.city || ''} ${store.address || ''}`.toLowerCase();

    const telangana = [
      'telangana','hyderabad','secunderabad','warangal','nizamabad','karimnagar','khammam','nalgonda','siddipet','medchal','malkajgiri','rangareddy',
      // Hyderabad localities to avoid misclassification
      'balanagar','ayyappa society','madhapur','miyapur','somajiguda','shaikpet','kompally','gandipet','narapally','kokapet','raj bhavan road','gachibowli','hitech city','kukatpally','ameerpet','jubilee hills','banjara hills'
    ];
    const andhra = ['andhra pradesh', 'andhra', 'ap', 'vijayawada', 'vizag', 'visakhapatnam', 'guntur', 'tirupati', 'nellore', 'kurnool', 'rajahmundry', 'rajamahendravaram', 'ongole', 'ananthapur', 'anantapur'];
    const tamilnadu = ['tamil nadu', 'chennai', 'tn'];
    const karnataka = ['karnataka', 'bangalore', 'bengaluru', 'blr'];

    if (telangana.some((k) => hay.includes(k))) return 'Telangana';
    if (andhra.some((k) => hay.includes(k))) return 'Andhra';
    if (tamilnadu.some((k) => hay.includes(k))) return 'Chennai';
    if (karnataka.some((k) => hay.includes(k))) return 'Bangalore';
    return null;
  };

  // Map legacy GeoJSON stores to UI model (move before uniqueCities)
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

  // Distance enrichment (kept)
  const storesWithDistance = useMemo(() => {
    if (!searchPoint) return stores;
    const from = turf.point(searchPoint);
    const enriched = stores.map((s) => {
      const dKm = turf.distance(from, turf.point(s.coordinates), { units: 'kilometers' });
      const rounded = Math.round(dKm * 100) / 100;
      return { ...s, distance: `${rounded} KM away`, _distanceValue: dKm } as any;
    });
    return enriched
      .sort((a: any, b: any) => a._distanceValue - b._distanceValue)
      .map(({ _distanceValue, ...rest }: any) => rest);
  }, [stores, searchPoint]);

  // Apply search + region filter (use deduced region)
  const baseFiltered = useMemo(
    () =>
      storesWithDistance.filter((store) => {
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          store.name.toLowerCase().includes(q) ||
          store.address.toLowerCase().includes(q) ||
          (store.city || '').toLowerCase().includes(q) ||
          (store.zipcode || '').includes(searchQuery);
        const storeRegion = deduceRegion(store);
        const matchesRegion = !cityFilter || storeRegion === cityFilter;
        return matchesQuery && matchesRegion;
      }),
    [storesWithDistance, searchQuery, cityFilter]
  );

  // Apply chosen ordering (nearest already applied above; otherwise A–Z)
  const orderedStores = useMemo(() => {
    if (sortOption === 'az') {
      return [...baseFiltered].sort((a, b) => a.name.localeCompare(b.name));
    }
    return baseFiltered; // nearest or original order
  }, [baseFiltered, sortOption]);

  // Ensure selectedStore is valid when filtering
  const selectedIsFiltered = selectedStore != null && orderedStores.some((s) => s.id === selectedStore);

  // Items to render (pagination)
  const visibleStores = orderedStores.slice(0, visibleCount);

  // Smoothly ensure selected store is visible (auto-expand if needed), then scroll/highlight
  useEffect(() => {
    if (!selectedStore) return;

    // Find the selected store index within the current filtered list
    const index = orderedStores.findIndex((s) => s.id === selectedStore);
    if (index === -1) return; // Not in filtered list (edge-case)

    const desiredWithTail = index + 5; // selected + next 4
    const canHaveTail = desiredWithTail <= orderedStores.length;

    // If not yet visible, expand list to include it (+ next 4 if available) and set a pending scroll
    if (index >= visibleCount) {
      const targetVisible = canHaveTail ? desiredWithTail : index + 1;
      setVisibleCount(targetVisible);
      setPendingScrollTo(selectedStore);
      return;
    }

    // If visible but we don't have enough items after it to allow top alignment, expand if possible
    if (visibleCount < desiredWithTail && canHaveTail) {
      setVisibleCount(desiredWithTail);
      setPendingScrollTo(selectedStore);
      return;
    }

    // If visible, scroll now (align to top below header)
    const el = document.getElementById(`store-card-${selectedStore}`);
    if (!el) {
      // Not rendered yet; set pending to retry next render
      setPendingScrollTo(selectedStore);
      return;
    }

    const scrollNow = () => {
      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollBy({ top: -120, behavior: 'auto' });
      }
      el.classList.add('ring-2', 'ring-[#2b91cb]');
      const t = setTimeout(() => el.classList.remove('ring-2', 'ring-[#2b91cb]'), 1200);
      return () => clearTimeout(t);
    };

    // Wait a tick to ensure layout has settled
    let raf1 = requestAnimationFrame(() => {
      let raf2 = requestAnimationFrame(() => { scrollNow(); });
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStore, orderedStores, visibleCount, lenis]);

  // Retry pending scroll after expanding list or on next paint
  useEffect(() => {
    if (!pendingScrollTo) return;
    const el = document.getElementById(`store-card-${pendingScrollTo}`);
    if (!el) return; // wait for DOM

    const run = () => {
      if (lenis) {
        lenis.scrollTo(el, { offset: -120, duration: 0.9 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollBy({ top: -120, behavior: 'auto' });
      }
      el.classList.add('ring-2', 'ring-[#2b91cb]');
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#2b91cb]'), 1200);
      setPendingScrollTo(null);
    };

    // Ensure layout is ready before measuring and scrolling
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(run);
      const cleanup2 = () => cancelAnimationFrame(raf2);
      return cleanup2;
    });
    return () => cancelAnimationFrame(raf1);
  }, [pendingScrollTo, visibleCount, lenis]);

  // Try to detect user location once for nearest stores
  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation && !searchPoint) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setSearchPoint([pos.coords.longitude, pos.coords.latitude]),
        () => {/* ignore errors */},
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 5000 }
      );
    }
  }, [searchPoint]);

  // One-tap geolocation action for toolbar/button
  const useMyLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSearchPoint([pos.coords.longitude, pos.coords.latitude]);
        setSortOption('nearest');
        setIsLocating(false);
        // On small screens, jump to Map and scroll to it
        if (window.innerWidth < 640) {
          setActiveTab('map');
          const el = document.getElementById('store-map-container');
          if (el) {
            if (lenis) lenis.scrollTo(el, { offset: -80, duration: 0.7 });
            else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      },
      () => setIsLocating(false),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 7000 }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b91cb]/5 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2b91cb] to-[#1e7bb8] text-white py-6 sm:py-10 md:py-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-2 sm:mb-3">Find Your Nearest Store</h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            Find your nearest Makers of Milkshakes outlet and visit us today!
            <span className="hidden sm:inline"> Fresh shakes made with love are just around the corner.</span>
          </p>
        </div>
      </section>

      {/* Sticky Search + Mobile Tabs */}
      <section className="sticky top-0 z-20 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by city, address, or zip code..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(3); }}
                className="w-full pl-10 pr-3 py-2.5 sm:py-3 rounded-full border-2 border-gray-200 focus:border-[#2b91cb] focus:outline-none transition-all duration-200 text-sm sm:text-base"
              />
            </div>
          </div>
          {/* Mobile tabs + Filters toggle */}
          <div className="mt-2 flex sm:hidden items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('list')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === 'list' ? 'bg-[#2b91cb] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                List
              </button>
              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${activeTab === 'map' ? 'bg-[#2b91cb] text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Map
              </button>
            </div>
            <button
              onClick={() => setFiltersOpen((v) => !v)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-300 text-gray-700"
            >
              {filtersOpen ? 'Hide filters' : 'Filters'}
            </button>
          </div>

          {/* Filters row (collapsed on mobile) */}
          <div className={`${filtersOpen ? 'block' : 'hidden'} sm:block mt-2 sm:mt-3`}>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {/* Region chips */}
              <div className="-mx-1 flex items-center gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => { setCityFilter(null); setVisibleCount(3); }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                    cityFilter === null ? 'bg-[#2b91cb] text-white border-[#2b91cb]' : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  All
                </button>
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => { setCityFilter(r); setVisibleCount(3); }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                      cityFilter === r ? 'bg-[#2b91cb] text-white border-[#2b91cb]' : 'bg-white text-gray-700 border-gray-200'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Sort + Locate */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <div className="inline-flex rounded-full border border-gray-200 p-0.5 bg-white">
                  <button
                    onClick={() => setSortOption('nearest')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${sortOption === 'nearest' ? 'bg-[#2b91cb] text-white' : 'text-gray-700'}`}
                  >
                    Nearest
                  </button>
                  <button
                    onClick={() => setSortOption('az')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full ${sortOption === 'az' ? 'bg-[#2b91cb] text-white' : 'text-gray-700'}`}
                  >
                    A–Z
                  </button>
                </div>
                <button
                  onClick={useMyLocation}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border-2 border-[#2b91cb] text-[#2b91cb] hover:bg-[#2b91cb]/10 transition-all"
                  disabled={isLocating}
                >
                  {isLocating ? 'Locating…' : 'Use my location'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {/* Store List */}
            <div className={`${activeTab === 'map' ? 'hidden sm:block' : ''} space-y-3 sm:space-y-4 transition-all duration-300`}>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2b91cb] mb-2 sm:mb-4">Our Locations ({orderedStores.length})</h2>

              {orderedStores.length === 0 ? (
                <div className="text-center py-10">
                  <MapPin className="w-14 h-14 text-gray-300 mx-auto mb-3" />
                  <p className="text-lg text-gray-600">No stores found matching your search.</p>
                  <p className="text-gray-500">Try searching by city name or zip code.</p>
                </div>
              ) : (
                <>
                  <div ref={listRef} className="space-y-2.5 sm:space-y-3">
                    {visibleStores.map((store) => (
                      <div
                        id={`store-card-${store.id}`}
                        key={store.id}
                        className={`w-full overflow-hidden bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border min-h-[116px] sm:min-h-[124px] ${
                          selectedStore === store.id
                            ? 'border-[#2b91cb] bg-[#2b91cb]/5'
                            : 'border-gray-100 hover:border-[#2b91cb]/30'
                        }`}
                        onClick={() => setSelectedStore(selectedStore === store.id ? null : store.id)}
                      >
                        {/* Header: title/address + distance chip, consistent height */}
                        <div className="flex items-start justify-between gap-2 sm:gap-3 mb-2">
                          <div className="flex-1 min-h-[48px] min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-[#2b91cb] leading-tight truncate">{store.name}</h3>
                            <div className="mt-1 flex items-start gap-2 text-gray-600 leading-snug min-w-0">
                              <MapPin className="w-4 h-4 text-[#2b91cb] mt-0.5 flex-shrink-0" />
                              <span className="text-sm overflow-hidden max-h-10 whitespace-normal break-words pr-1">{store.address}</span>
                            </div>
                          </div>
                          <div className="text-right h-5 flex justify-end items-start flex-shrink-0 min-w-[72px] sm:min-w-[96px]">
                            {store.distance ? (
                              <span className="inline-block px-2 py-0.5 bg-[#2b91cb]/10 text-[#2b91cb] rounded-full text-xs font-semibold whitespace-nowrap">
                                {store.distance}
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap opacity-0 select-none">0 KM</span>
                            )}
                          </div>
                        </div>

                        {/* Meta row: always single-line, truncate */}
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2 min-w-0">
                            <Phone className="w-4 h-4 text-[#2b91cb] flex-shrink-0" />
                            <span className="truncate">{store.phone || '—'}</span>
                          </div>
                          <div className="flex items-center gap-2 min-w-0">
                            <Clock className="w-4 h-4 text-[#2b91cb] flex-shrink-0" />
                            <span className="truncate">{store.hours || '—'}</span>
                          </div>
                        </div>

                        {selectedStore === store.id && (
                          <div className="mt-3 pt-2 border-t border-[#2b91cb]/20">
                            <div className="flex flex-wrap gap-2.5">
                              <a
                                href={directionsHref(store.address)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-[#2b91cb] text-white px-3 py-1.5 rounded-full hover:bg-[#1e7bb8] transition-colors text-xs font-semibold"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Navigation className="w-4 h-4" />
                                <span>Get Directions</span>
                              </a>
                              <a
                                href={telHref(store.phone)}
                                className="flex items-center gap-2 bg-white border-2 border-[#2b91cb] text-[#2b91cb] px-3 py-1.5 rounded-full hover:bg-[#2b91cb]/10 transition-colors text-xs font-semibold"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone className="w-4 h-4" />
                                <span>Call Store</span>
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Mobile quick actions */}
                        <div className="mt-3 flex sm:hidden items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStore(store.id);
                              if (window.innerWidth < 640) {
                                setActiveTab('map');
                                const el = document.getElementById('store-map-container');
                                if (el) {
                                  if (lenis) lenis.scrollTo(el, { offset: -80, duration: 0.7 });
                                  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }
                            }}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2b91cb] text-white hover:bg-[#1e7bb8] transition-all flex-1 mr-2"
                          >
                            View on Map
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(directionsHref(store.address), '_blank');
                            }}
                            className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border-2 border-[#2b91cb] text-[#2b91cb] hover:bg-[#2b91cb]/10 transition-all flex-1"
                          >
                            Directions
                          </button>
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* Load more button */}
                  {visibleCount < orderedStores.length && (
                    <div className="mt-4">
                      <button
                        onClick={() => setVisibleCount(visibleCount + 3)}
                        className="w-full px-4 py-2 rounded-full bg-[#2b91cb] text-white font-semibold hover:bg-[#1e7bb8] transition-all flex items-center justify-center gap-2"
                      >
                        <span>Load more stores</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" strokeWidth="4" />
                          <path className="opacity-75" fill="none" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Map */}
            <div id="store-map-container" className={`${activeTab === 'list' ? 'hidden sm:block' : ''} sm:block sticky sm:static top-[4.5rem] h-[55vh] sm:h-[60vh] lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]`}>
              <InteractiveMap
                className="h-full"
                isVisible={activeTab === 'map' || typeof window === 'undefined' ? true : false}
                stores={orderedStores.map((s) => ({
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
    </div>
  );
}

// Helper links (tel/directions)
const telHref = (phone: string) => `tel:${phone.replace(/[^0-9]/g, '')}`;
const directionsHref = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
