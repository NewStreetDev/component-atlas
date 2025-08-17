import React from "react";
import {
  Box,
  Skeleton,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

export default function CatalogSkeleton() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 280;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Mobile AppBar Skeleton */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: '64px',
            zIndex: theme.zIndex.drawer + 1,
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            <Skeleton variant="circular" width={24} height={24} sx={{ mr: 2 }} />
            <Skeleton variant="text" width={150} height={32} />
          </Box>
        </Box>
      )}

      {/* Sidebar Skeleton - Desktop */}
      {!isMobile && (
        <Box
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
            <Skeleton variant="text" width={180} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={140} height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={40} sx={{ borderRadius: 1 }} />
          </Box>
          
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 2 }} />
            {[...Array(6)].map((_, index) => (
              <Box key={index} sx={{ mb: 1 }}>
                <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 1, mb: 0.5 }} />
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Main Content Skeleton */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          paddingBottom: 6,
          marginTop: isMobile ? '64px' : 0,
        }}
      >
        <Container maxWidth={false} sx={{ p: 3, height: "100%" }}>
          {/* Header Skeleton */}
          <Box sx={{ mb: 3 }}>
            <Skeleton variant="text" width={200} height={48} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={120} height={24} />
          </Box>

          {/* Component Cards Skeleton */}
          <Box className="grid grid-cols-1 gap-4">
            {[...Array(4)].map((_, index) => (
              <Box 
                key={index}
                sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 3,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width={180} height={32} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width={100} height={20} sx={{ mb: 1 }} />
                    <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="text" width="60%" height={16} />
                  </Box>
                  <Skeleton variant="rectangular" width={80} height={36} sx={{ borderRadius: 1 }} />
                </Box>
                
                {/* Preview Area Skeleton */}
                <Box sx={{ 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  mb: 2,
                  bgcolor: 'grey.50'
                }}>
                  <Skeleton variant="rectangular" width="100%" height={120} sx={{ borderRadius: 1 }} />
                </Box>
                
                {/* Buttons Skeleton */}
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                  <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}