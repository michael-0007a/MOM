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
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        pointerEvents: 'auto',
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Simplified spinner with focus on milkshake */}
        <div className="relative w-28 h-28">
          {/* Single clean spinning ring */}
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style={{
              borderTopColor: '#2b91cb',
              borderRightColor: '#2b91cb',
            }}
          ></div>

          {/* Enhanced milkshake gif in center */}
          <div className="absolute inset-3 flex items-center justify-center">
            <div className="relative">
              {/* Subtle glow behind GIF */}
              <div
                className="absolute inset-0 rounded-full blur-sm opacity-30"
                style={{ backgroundColor: '#2b91cb' }}
              ></div>
              <Image
                src="/spinner-milkshake.gif"
                alt="Loading milkshake"
                width={72}
                height={72}
                className="relative z-10 rounded-full shadow-lg"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>

        {/* Clean loading text */}
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-[#2b91cb]">
            Preparing Your Milkshake...
          </p>
        </div>
      </div>
    </div>
  );
}
