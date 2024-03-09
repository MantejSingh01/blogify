import React from 'react';

const ShimmerGrid = ({ columns, rows }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(4 * 4)].map((_, index) => (
        <div key={index} className="shimmer bg-white rounded-lg p-4 shadow-md animate-pulse">
          <div className="h-8 w-3/4 mb-2 bg-gray-300"></div>
          <div className="h-4 w-1/2 bg-gray-300"></div>
          <div className="h-4 w-full mt-2 bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerGrid;
