'use client';

import { useEffect, useMemo, useRef } from 'react';
import * as L from 'leaflet';

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
  className?: string; // optional height/extra classes from parent
  isVisible?: boolean; // hint for invalidating size when container becomes visible
}

export default function InteractiveMap({ stores, selectedStoreId, onSelectStore, onSearchResult, className, isVisible = true }: InteractiveMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Record<number, L.Marker>>({});
  const searchPointRef = useRef<L.Layer | null>(null);
  const mapReadyRef = useRef(false);
  const onSelectRef = useRef<((id: number) => void) | undefined>(onSelectStore);
  const onSearchRef = useRef<((lngLat: [number, number]) => void) | undefined>(onSearchResult);
  useEffect(() => { onSelectRef.current = onSelectStore; }, [onSelectStore]);
  useEffect(() => { onSearchRef.current = onSearchResult; }, [onSearchResult]);

  // Compute an initial center (avg of store coords), fallback to NYC-like coords
  const initialCenter: [number, number] = useMemo(() => {
    if (stores && stores.length > 0) {
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
    return [-73.9857, 40.7484];
  }, [stores]);

  // Initialize Leaflet map exactly once (do not depend on changing props)
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      center: L.latLng(initialCenter[1], initialCenter[0]),
      zoom: 11,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Mark map ready after first render
    map.whenReady(() => {
      mapReadyRef.current = true;
      // Ensure correct sizing if container became visible later
      setTimeout(() => map.invalidateSize(), 0);
    });

    // Invalidate size on window resize
    const onResize = () => {
      if (mapRef.current) {
        try { mapRef.current.invalidateSize(); } catch {}
      }
    };
    window.addEventListener('resize', onResize);

    // Simple "Locate Me" control that also reports onSearchResult
    const LocateControl = (L.Control as unknown as {
      extend: (props: Partial<L.Control> & { onAdd: (map: L.Map) => HTMLElement; onRemove?: (map: L.Map) => void }) => {
        new (options?: L.ControlOptions): L.Control;
      };
    }).extend({
      onAdd: (m: L.Map) => {
        const container = L.DomUtil.create('div', 'leaflet-bar');
        const a = L.DomUtil.create('a', '', container);
        a.title = 'Locate me';
        a.href = '#';
        a.innerHTML = '⌖';
        a.style.width = '32px';
        a.style.height = '32px';
        a.style.lineHeight = '32px';
        a.style.textAlign = 'center';
        a.style.fontSize = '18px';
        L.DomEvent.on(a, { click: (e: Event) => {
          L.DomEvent.stop(e);
          m.locate({ setView: true, enableHighAccuracy: true, maxZoom: 14 });
        }});
        return container;
      },
      onRemove: () => void 0,
    });

    const locate = new (LocateControl as unknown as { new (options?: L.ControlOptions): L.Control })({ position: 'topright' });
    locate.addTo(map);

    // On geolocation found: show a marker and notify parent for distance calc
    const onLocationFound = (ev: L.LocationEvent) => {
      const m = mapRef.current;
      if (!m || !mapReadyRef.current) return;
      // Remove previous search marker
      if (searchPointRef.current) {
        try { m.removeLayer(searchPointRef.current); } catch {}
        searchPointRef.current = null;
      }
      const circle = L.circleMarker(ev.latlng, {
        radius: 8,
        color: '#1e7bb8',
        weight: 2,
        fillColor: '#2b91cb',
        fillOpacity: 0.9,
      }).bindPopup('You are here');
      try {
        circle.addTo(m);
        searchPointRef.current = circle;
      } catch {}
      onSearchRef.current?.([ev.latlng.lng, ev.latlng.lat]);
    };

    map.on('locationfound', onLocationFound);
    map.on('locationerror', () => { /* user may deny */ });

    mapRef.current = map;

    return () => {
      window.removeEventListener('resize', onResize);
      map.off('locationfound', onLocationFound);
      try {
        Object.values(markersRef.current).forEach((mm) => map.removeLayer(mm));
      } catch {}
      markersRef.current = {};
      if (searchPointRef.current) {
        try { map.removeLayer(searchPointRef.current); } catch {}
        searchPointRef.current = null;
      }
      try { map.remove(); } catch {}
      mapRef.current = null;
      mapReadyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Invalidate map size when it becomes visible (e.g., mobile tab switch)
  useEffect(() => {
    if (!isVisible) return;
    const map = mapRef.current;
    if (!map || !mapReadyRef.current) return;
    const raf = requestAnimationFrame(() => {
      try { map.invalidateSize(); } catch {}
    });
    return () => cancelAnimationFrame(raf);
  }, [isVisible]);

  // Render markers for current stores and fit bounds (favor Hyderabad cluster)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReadyRef.current) return;

    // Clear existing markers
    try {
      Object.values(markersRef.current).forEach((m) => map.removeLayer(m));
    } catch {}
    markersRef.current = {} as Record<number, L.Marker>;

    if (!stores || stores.length === 0) return;

    const boundsAll = L.latLngBounds([]);
    const hydCenter: [number, number] = [78.4867, 17.3850];
    const hydBounds = L.latLngBounds([]);
    const innerHydBounds = L.latLngBounds(L.latLng(17.30, 78.35), L.latLng(17.48, 78.60));

    stores.forEach((s) => {
      const latlng = L.latLng(s.coordinates[1], s.coordinates[0]);
      const markerHtml = `
        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"filter: drop-shadow(0 4px 10px rgba(0,0,0,.25)); transition: all .25s ease\">
          <path d=\"M12 2C8.13401 2 5 5.13401 5 9C5 13.4183 10.2 19.4 11.37 20.74C11.72 21.14 12.28 21.14 12.63 20.74C13.8 19.4 19 13.4183 19 9C19 5.13401 15.866 2 12 2Z\" fill=\"#2b91cb\" stroke=\"white\" stroke-width=\"2\"/>
          <circle cx=\"12\" cy=\"9.5\" r=\"3\" fill=\"white\"/>
        </svg>`;
      const icon = L.divIcon({ className: 'custom-pin', html: markerHtml, iconSize: [24, 24], iconAnchor: [12, 22], popupAnchor: [0, -20] });

      const marker = L.marker(latlng, { icon })
        .bindPopup(
          `<div style=\"font-size:13px;font-weight:600;color:#1f2937;\">${s.name}</div><div style=\"font-size:12px;color:#4b5563;\">${s.address}</div>`
        )
        .on('click', (e) => {
          e.originalEvent.stopPropagation();
          onSelectRef.current?.(s.id);
        });

      try { marker.addTo(map); } catch {}
      markersRef.current[s.id] = marker;
      boundsAll.extend(latlng);

      const d = map.distance(latlng, L.latLng(hydCenter[1], hydCenter[0])) / 1000;
      if (d <= 150) hydBounds.extend(latlng);
    });

    // Prefer inner Hyderabad view if any markers inside
    const innerCount = Object.values(markersRef.current).filter((layer) => innerHydBounds.contains(layer.getLatLng())).length;
    if (innerCount >= 1) {
      try { map.fitBounds(innerHydBounds, { padding: [24, 24], maxZoom: 14 }); } catch {}
      return;
    }

    if (hydBounds.isValid() && hydBounds.getNorth() !== hydBounds.getSouth()) {
      const hydCount = Object.values(markersRef.current).filter((layer) => hydBounds.contains(layer.getLatLng())).length;
      if (hydCount >= 3) {
        try { map.fitBounds(hydBounds, { padding: [32, 32], maxZoom: 12 }); } catch {}
        return;
      }
    }

    if (boundsAll.isValid()) {
      try { map.fitBounds(boundsAll, { padding: [32, 32] }); } catch {}
    }
  }, [stores]);

  // Safe helpers that wait for marker element to exist
  const waitForMarkerElement = (marker: L.Marker, cb: () => void, tries = 0) => {
    const el = (marker as L.Marker & { getElement?: () => HTMLElement | null }).getElement?.() ?? null;
    if (el) {
      cb();
      return;
    }
    if (tries > 20) return; // give up after ~20 frames (~320ms)
    requestAnimationFrame(() => waitForMarkerElement(marker, cb, tries + 1));
  };

  const safeSetIcon = (marker: L.Marker, icon: L.DivIcon) => {
    waitForMarkerElement(marker, () => {
      try { marker.setIcon(icon); } catch {}
    });
  };

  const safeOpenPopup = (marker: L.Marker) => {
    waitForMarkerElement(marker, () => {
      try { marker.openPopup(); } catch {}
    });
  };

  // When selected store changes, fly and open popup + update icon
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !stores || !mapReadyRef.current) return;

    // Update icons with selection state
    stores.forEach((s) => {
      const marker = markersRef.current[s.id];
      if (!marker) return;
      const isActive = s.id === (selectedStoreId ?? -1);
      const html = `
        <svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" style=\"filter: drop-shadow(0 4px 10px rgba(0,0,0,.25)); transition: all .25s ease\">
          <path d=\"M12 2C8.13401 2 5 5.13401 5 9C5 13.4183 10.2 19.4 11.37 20.74C11.72 21.14 12.28 21.14 12.63 20.74C13.8 19.4 19 13.4183 19 9C19 5.13401 15.866 2 12 2Z\" fill=\"${isActive ? '#1e7bb8' : '#2b91cb'}\" stroke=\"white\" stroke-width=\"2\"/>
          <circle cx=\"12\" cy=\"9.5\" r=\"3\" fill=\"white\"/>
        </svg>`;
      const icon = L.divIcon({ className: 'custom-pin', html, iconSize: [24, 24], iconAnchor: [12, 22], popupAnchor: [0, -20] });
      safeSetIcon(marker, icon);
    });

    if (!selectedStoreId) return;
    const sel = stores.find((x) => x.id === selectedStoreId);
    if (!sel) return;
    const marker = markersRef.current[sel.id];
    if (!marker) return;
    const latlng = marker.getLatLng();
    try { map.setView(latlng, Math.max(map.getZoom(), 14), { animate: true }); } catch {}
    safeOpenPopup(marker);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStoreId, stores]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%' }}
      className={`rounded-2xl overflow-hidden bg-gray-100 transition-all duration-300 ${className || 'h-96 lg:h-[600px]'}`}
      data-lenis-prevent
    />
  );
}
