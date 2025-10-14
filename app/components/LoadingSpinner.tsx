export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative">
        {/* Milkshake cup */}
        <div className="w-24 h-32 bg-blue-800 rounded-b-3xl animate-pulse">
          {/* Straw */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-2 h-16 bg-white rounded-full"></div>
          {/* Swirl */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-center mt-4 text-blue-800 font-semibold">Loading...</p>
      </div>
    </div>
  );
}

