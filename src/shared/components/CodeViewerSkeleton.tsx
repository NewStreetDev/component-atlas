import React from 'react';
import {
  Box,
  Skeleton,
} from '@mui/material';

export default function CodeViewerSkeleton() {
  return (
    <Box className="h-full flex flex-col">
      {/* Tabs Skeleton */}
      <Box className="border-b p-2">
        <Box className="flex gap-2">
          <Skeleton variant="rectangular" width={120} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 1 }} />
          <Skeleton variant="rectangular" width={90} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>

      {/* Code Content Skeleton */}
      <Box className="flex-1 relative p-4">
        {/* Action buttons area */}
        <Box className="absolute top-2 right-2 z-10 flex gap-1">
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>

        {/* File path skeleton */}
        <Box className="absolute top-2 left-2 z-10">
          <Skeleton variant="rectangular" width={150} height={20} sx={{ borderRadius: 1 }} />
        </Box>

        {/* Code lines skeleton */}
        <Box sx={{ mt: 4 }}>
          {[...Array(20)].map((_, index) => (
            <Box key={index} className="flex items-center mb-1">
              {/* Line number */}
              <Skeleton 
                variant="text" 
                width={30} 
                height={16} 
                sx={{ mr: 2, flexShrink: 0 }} 
              />
              {/* Code content with varying widths */}
              <Skeleton 
                variant="text" 
                width={`${Math.random() * 60 + 20}%`} 
                height={16} 
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}