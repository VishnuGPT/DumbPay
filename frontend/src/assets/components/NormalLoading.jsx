import React from 'react';

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
