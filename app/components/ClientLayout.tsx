'use client';

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [minTimeComplete, setMinTimeComplete] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    // Minimum time for GIF to play (3 seconds)
    const minTimer = setTimeout(() => {
      setMinTimeComplete(true);
    }, 4000);

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setPageLoaded(true);
    } else {
      const handleLoad = () => setPageLoaded(true);
      window.addEventListener('load', handleLoad);

      return () => {
        clearTimeout(minTimer);
        window.removeEventListener('load', handleLoad);
      };
    }

    return () => {
      clearTimeout(minTimer);
    };
  }, []);

  // Hide loading when both conditions are met
  useEffect(() => {
    if (minTimeComplete && pageLoaded) {
      const delay = setTimeout(() => {
        setIsLoading(false);
      }, 200); // Small delay for smooth transition

      return () => clearTimeout(delay);
    }
  }, [minTimeComplete, pageLoaded]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
