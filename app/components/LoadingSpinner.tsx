import { useEffect, useRef, useMemo, useState } from 'react';

interface LoadingSpinnerProps {
  exiting?: boolean; // when true, fade out
  disableScroll?: boolean; // when true, lock scroll (use for home only)
  videoPlaybackRate?: number; // playback rate to use for video
  onComplete?: () => void; // called when the video finishes or errors
  exitAnimation?: 'fade' | 'slide-up' | 'scale-down' | 'wipe-up';
}

export default function LoadingSpinner({
  exiting = false,
  disableScroll = true,
  videoPlaybackRate = 1.5,
  onComplete,
  exitAnimation = 'slide-up',
}: LoadingSpinnerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [toWhite, setToWhite] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setToWhite(true), 3530);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!disableScroll) return;
    // Prevent scrolling when spinner is active
    const originalBody = document.body.style.overflow;
    const originalDoc = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = originalBody;
      document.documentElement.style.overflow = originalDoc || 'auto';
    };
  }, [disableScroll]);

  const handleLoadedData = () => {
    const v = videoRef.current;
    if (v) {
      try {
        v.playbackRate = videoPlaybackRate;
        const playPromise = v.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {});
        }
      } catch {}
    }
  };

  const handleEnded = () => {
    if (onComplete) onComplete();
  };

  const handleError = () => {
    // If video can't play, don't block the app
    if (onComplete) onComplete();
  };

  const overlayClass = useMemo(() => {
    const base = 'loading-overlay';
    if (!exiting) return base;
    switch (exitAnimation) {
      case 'fade':
        return base + ' exit-fade';
      case 'slide-up':
        return base + ' exit-slide-up';
      case 'scale-down':
        return base + ' exit-scale-down';
      case 'wipe-up':
        return base + ' exit-wipe-up';
      default:
        return base + ' exit-fade';
    }
  }, [exiting, exitAnimation]);

  return (
    <div
      className={overlayClass}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: toWhite ? '#FFFFFF' : '#FBFBFB', // updated initial color
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Milkshake animation video plays once at 1.5x speed (MP4 only) */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
          <video
            ref={videoRef}
            onLoadedData={handleLoadedData}
            onEnded={handleEnded}
            onError={handleError}
            muted
            playsInline
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          >
            <source src="/spinner-milkshake.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Loading text */}
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-[#2b91cb]">
            Preparing Your Milkshake...
          </p>
        </div>
      </div>
    </div>
  );
}
