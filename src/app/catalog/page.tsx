"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ComponentCard from "@/shared/components/ComponentCard";
import CodeViewer from "@/shared/components/CodeViewer";
import EmptyState from "@/shared/components/catalog/EmptyState";
import SidebarDrawer from "@/shared/components/catalog/SidebarDrawer";
import CatalogSkeleton from "@/shared/components/catalog/CatalogSkeleton";
import { useComponentsData } from "@/shared/hooks/useComponentsData";
import { useComponentFilters } from "@/shared/hooks/useComponentFilters";
import { useCodeViewer } from "@/shared/hooks/useCodeViewer";

export default function ComponentCatalog() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { components, loading, error } = useComponentsData();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredComponents,
    availableCategories,
    hasActiveFilters,
    clearAllFilters,
  } = useComponentFilters(components);
  const {
    codeViewerOpen,
    selectedComponent,
    componentFiles,
    loadingFiles,
    handleShowCode,
    handleCloseCodeViewer,
  } = useCodeViewer();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (loading) {
    return <CatalogSkeleton />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }


  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SidebarDrawer
        components={components}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        availableCategories={availableCategories}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      {/* Main Content */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          paddingBottom: 6,
          marginTop: isMobile ? '64px' : 0, // Account for AppBar height on mobile
        }}
      >
        <Container maxWidth={false} sx={{ p: 3, height: "100%" }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant="h4" 
              component="h1" 
              gutterBottom
              className="text-lg! sm:text-xl! md:text-2xl! lg:text-3xl!"
            >
              {selectedCategory === "all"
                ? "All Components"
                : selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              className="text-xs! sm:text-sm! md:text-base!"
            >
              {filteredComponents.length} component
              {filteredComponents.length !== 1 ? "s" : ""} found
            </Typography>
          </Box>

          {/* Components List */}
          {filteredComponents.length === 0 ? (
            <EmptyState
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearAllFilters}
            />
          ) : (
            <div className="grid! grid-cols-1! gap-4!">
              {filteredComponents.map((component) => (
                <ComponentCard
                  key={component.id}
                  component={component}
                  onShowCode={handleShowCode}
                />
              ))}
            </div>
          )}

          {/* Code Viewer Dialog */}
          <CodeViewer
            open={codeViewerOpen}
            onClose={handleCloseCodeViewer}
            files={componentFiles}
            componentName={selectedComponent?.manifest.name || ""}
            loading={loadingFiles}
          />
        </Container>
      </Box>
    </Box>
  );
}
