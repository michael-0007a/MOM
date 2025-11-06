import Image from 'next/image';
import { useEffect } from 'react';

export default function LoadingSpinner() {
  useEffect(() => {
    // Prevent scrolling when spinner is active
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      // Restore scrolling when component unmounts
      document.body.style.overflow = originalStyle;
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className="loading-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: '#fbf9fa',
        backgroundColor: '#fbf9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Just the milkshake GIF, bigger on desktops */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-60 md:h-60 lg:w-72 lg:h-72 xl:w-80 xl:h-80">
          <Image
            src="/spinner-milkshake.gif"
            alt="Loading milkshake"
            fill
            className="object-contain"
            unoptimized
            priority
          />
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
