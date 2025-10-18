"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeComplete, setMinTimeComplete] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // More reliable way to detect 404 - check if pathname exists or if it's a known route
    const knownRoutes = [
      "/",
      "/menu",
      "/our-story",
      "/gallery",
      "/contact",
      "/franchise",
      "/store-locator",
      "/admin",
    ];
    const is404 = !knownRoutes.includes(pathname) && !pathname.startsWith("/api");

    // Skip loading entirely for 404 pages
    if (is404) {
      setIsLoading(false);
      return;
    }

    // Reset loading state for new page
    setIsLoading(true);
    setMinTimeComplete(false);
    setPageLoaded(false);

    // Minimum time for GIF to play (4 seconds)
    const minTimer = setTimeout(() => {
      setMinTimeComplete(true);
    }, 4000);

    // Check if page is already loaded
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener("load", handleLoad);

      return () => {
        clearTimeout(minTimer);
        window.removeEventListener("load", handleLoad);
      };
    }

    return () => {
      clearTimeout(minTimer);
    };
  }, [pathname]);

  // Hide loading when both conditions are met
  useEffect(() => {
    if (minTimeComplete && pageLoaded) {
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 200); // Small delay for smooth transition

      return () => clearTimeout(delay);
    }
  }, [minTimeComplete, pageLoaded]);

  return (
    <div style={{ position: "relative" }}>
      {children}
      {isLoading && <LoadingSpinner />}
    </div>
  );
}
