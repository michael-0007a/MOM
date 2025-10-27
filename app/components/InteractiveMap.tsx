'use client';

import { useEffect, useMemo, useRef } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as turf from '@turf/turf';
import type { Feature, Geometry } from 'geojson';

// Mapbox CSS moved to app/layout.tsx
// import 'mapbox-gl/dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export type StoreLocation = {
  id: number;
  name: string;
  address: string;
  phone?: string;
  hours?: string;
  city?: string;
  zipcode?: string;
  coordinates: [number, number]; // [lng, lat]
};

interface InteractiveMapProps {
  stores: StoreLocation[];
  selectedStoreId?: number | null;
  onSelectStore?: (id: number) => void;
  onSearchResult?: (lngLat: [number, number]) => void;
}

export default function InteractiveMap({ stores, selectedStoreId, onSelectStore, onSearchResult }: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const popupRef = useRef<mapboxgl.Popup | null>(null);

  // Provide a safe default token (prefer env). Avoid throwing if missing in dev.
  const accessToken = useMemo(() => {
    // Fallback to the token used in the legacy maps demo so the map works out-of-the-box
    const legacyFallback = 'pk.eyJ1IjoiZ3V0dGFtYW5pc2giLCJhIjoiY2p2MnJ5MW0xMDdudTQ0bm1xb3cwem5qdiJ9.Ln422s_gkHRuM48W9eTs4A';
    return process.env.NEXT_PUBLIC_MAPBOX_TOKEN || legacyFallback;
  }, []);

  const initialCenter: [number, number] = useMemo(() => {
    if (stores && stores.length > 0) {
      // Average center of stores for initial view
      const avg = stores.reduce(
        (acc, s) => {
          acc[0] += s.coordinates[0];
          acc[1] += s.coordinates[1];
          return acc;
        },
        [0, 0] as [number, number]
      );
      return [avg[0] / stores.length, avg[1] / stores.length];
    }
    // NYC fallback
    return [-73.9857, 40.7484];
  }, [stores]);

  // Initialize map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // If no token provided, Mapbox still requires a string; map may error. We'll log a helpful message.
    if (!accessToken) {
      console.warn('Mapbox token missing: set NEXT_PUBLIC_MAPBOX_TOKEN to enable the map.');
    }
    mapboxgl.accessToken = accessToken;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: initialCenter,
      zoom: 11,
    });

    mapRef.current = map;

    // Controls
    map.addControl(new mapboxgl.NavigationControl({ showCompass: true }), 'top-right');

    // Geolocate (optional, improves UX)
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: false,
        showUserHeading: true,
      }),
      'top-right'
    );

    // Geocoder control
    try {
      // Local cast to satisfy geocoder's mapboxgl type expectations
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mapboxglAny: any = mapboxgl;
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxglAny,
        marker: false,
        placeholder: 'Search places…',
      });
      map.addControl(geocoder, 'top-left');

      // Optional: show the searched point and fit bounds with nearest store
      const singlePointSourceId = 'single-point';
      map.on('load', () => {
        if (!map.getSource(singlePointSourceId)) {
          map.addSource(singlePointSourceId, {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          });
          map.addLayer({
            id: 'single-point-layer',
            source: singlePointSourceId,
            type: 'circle',
            paint: {
              'circle-radius': 8,
              'circle-color': '#007cbf',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff',
            },
          });
        }
      });

      geocoder.on('result', (ev: { result: Feature<Geometry> }) => {
        const map = mapRef.current;
        if (!map) return;
        const searchGeometry = ev.result?.geometry;
        const src = map.getSource(singlePointSourceId) as mapboxgl.GeoJSONSource | undefined;
        if (src && searchGeometry) {
          const feature: Feature<Geometry> = {
            type: 'Feature',
            geometry: searchGeometry,
            properties: {},
          };
          src.setData(feature);
        }
        // Notify parent of search result point
        if (searchGeometry && searchGeometry.type === 'Point') {
          onSearchResult?.(searchGeometry.coordinates as [number, number]);
        }
        // Compute nearest store and focus it
        if (stores && stores.length && searchGeometry && searchGeometry.type === 'Point') {
          try {
            const from = turf.point(searchGeometry.coordinates as [number, number]);
            const nearest = stores
              .map((s) => ({
                store: s,
                dist: turf.distance(from, turf.point(s.coordinates), { units: 'miles' }),
              }))
              .sort((a, b) => a.dist - b.dist)[0];
            if (nearest) {
              flyToStore(nearest.store);
              openPopup(nearest.store);
              onSelectStore?.(nearest.store.id);
            }
          } catch {}
        }
      });
    } catch {
      // geocoder optional
    }

    return () => {
      // Cleanup
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      popupRef.current?.remove();
      popupRef.current = null;
      map.remove();
      mapRef.current = null;
    };
    // We intentionally avoid listing stores in deps here to not re-init map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, initialCenter]);

  // Helpers
  const flyToStore = (store: StoreLocation) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({ center: store.coordinates, zoom: 14, essential: true });
  };

  const openPopup = (store: StoreLocation) => {
    const map = mapRef.current;
    if (!map) return;
    // Close existing
    popupRef.current?.remove();

    const popupHtml = `
      <div style="font-family: ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;">
        <h3 style="margin:0;background:#2772ff;color:#fff;padding:8px 10px;border-radius:6px 6px 0 0;font-weight:700;font-size:14px;">${
          store.name || 'Location'
        }</h3>
        <div style="padding:10px;font-size:12px;color:#374151;">
          <div>${store.address}</div>
          ${store.city ? `<div>${store.city}${store.zipcode ? `, ${store.zipcode}` : ''}</div>` : ''}
        </div>
      </div>
    `;

    popupRef.current = new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(store.coordinates)
      .setHTML(popupHtml)
      .addTo(map);
  };

  // Render markers for current stores and fit bounds
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (!stores || stores.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds();

    stores.forEach((s) => {
      const marker = new mapboxgl.Marker({ color: '#2b91cb' })
        .setLngLat(s.coordinates)
        .addTo(map)
        .setPopup(
          new mapboxgl.Popup({ offset: 24 }).setHTML(
            `<div style=\"font-size:13px;font-weight:600;color:#1f2937;\">${s.name}</div><div style=\"font-size:12px;color:#4b5563;\">${s.address}</div>`
          )
        );

      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation();
        onSelectStore?.(s.id);
      });

      markersRef.current.push(marker);
      bounds.extend(s.coordinates);
    });

    // Fit bounds to markers on render
    if (!bounds.isEmpty()) {
      const padding = { top: 40, bottom: 40, left: 40, right: 40 } as mapboxgl.PaddingOptions;
      map.fitBounds(bounds, { padding, duration: 700 });
    }
  }, [stores, onSelectStore]);

  // When selected store changes, fly and open popup
  useEffect(() => {
    if (!selectedStoreId || !stores) return;
    const store = stores.find((s) => s.id === selectedStoreId);
    if (!store) return;
    flyToStore(store);
    openPopup(store);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStoreId]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '24rem' }}
      className="rounded-2xl overflow-hidden lg:h-[600px] bg-gray-100"
    />
  );
}
