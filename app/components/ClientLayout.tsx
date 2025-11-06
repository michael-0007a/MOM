"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const firstHomeDoneRef = useRef(false); // tracks if initial home splash already happened

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exiting, setExiting] = useState<boolean>(false);
  const [videoDone, setVideoDone] = useState<boolean>(false);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);

  // Kick off spinner cycle on every route change
  useEffect(() => {
    // Reset states
    setIsLoading(true);
    setExiting(false);
    setVideoDone(false);
    setPageLoaded(false);

    // Listen for page load (if not already complete)
    const handleLoad = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      setPageLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => window.removeEventListener("load", handleLoad);
  }, [pathname]);

  // Decide exit conditions
  useEffect(() => {
    if (!isLoading) return;

    const isMandatoryHomeSplash = isHome && !firstHomeDoneRef.current; // Only first home visit

    // Mandatory home splash: wait for BOTH video + page
    if (isMandatoryHomeSplash) {
      if (videoDone && pageLoaded) {
        setExiting(true);
        const t = setTimeout(() => {
          setIsLoading(false);
          setExiting(false);
          firstHomeDoneRef.current = true; // lock in that home splash occurred
        }, 560);
        return () => clearTimeout(t);
      }
      return; // still waiting
    }

    // Non-mandatory spinner (all other routes including 404): exit when EITHER is ready
    if (videoDone || pageLoaded) {
      setExiting(true);
      const t = setTimeout(() => {
        setIsLoading(false);
        setExiting(false);
      }, 400); // shorter exit since non-mandatory
      return () => clearTimeout(t);
    }
  }, [videoDone, pageLoaded, isLoading, isHome]);

  return (
    <div style={{ position: "relative" }}>
      {children}
      {isLoading && (
        <LoadingSpinner
          exiting={exiting}
          // Lock scroll only during mandatory first home splash
          disableScroll={isHome && !firstHomeDoneRef.current}
          exitAnimation={isHome && !firstHomeDoneRef.current ? "slide-up" : "fade"}
          onComplete={() => setVideoDone(true)}
        />
      )}
    </div>
  );
}
