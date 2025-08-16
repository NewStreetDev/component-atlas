"use client";

import React from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search as SearchIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import ComponentCard from "@/shared/components/ComponentCard";
import CodeViewer from "@/shared/components/CodeViewer";
import EmptyState from "@/shared/components/catalog/EmptyState";
import { useComponentsData } from "@/shared/hooks/useComponentsData";
import { useComponentFilters } from "@/shared/hooks/useComponentFilters";
import { useCodeViewer } from "@/shared/hooks/useCodeViewer";

export default function ComponentCatalog() {
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

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Box className="flex items-center justify-center h-64">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const drawerWidth = 280;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            position: "relative",
          },
        }}
      >
        <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
          <Typography variant="h6" component="h1" gutterBottom>
            Component Atlas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Explore reusable components
          </Typography>

          {/* Search */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search components..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />
        </Box>

        {/* Categories */}
        <Box sx={{ overflow: "auto" }}>
          <Typography variant="subtitle2" sx={{ p: 2, pb: 1, fontWeight: 600 }}>
            Categories
          </Typography>
          <List dense>
            <ListItem disablePadding>
              <ListItemButton
                selected={selectedCategory === "all"}
                onClick={() => setSelectedCategory("all")}
                sx={{ mx: 1, borderRadius: 1 }}
              >
                <CategoryIcon fontSize="small" sx={{ mr: 1.5, opacity: 0.7 }} />
                <ListItemText
                  primary="All Components"
                  secondary={`${components.length} items`}
                />
              </ListItemButton>
            </ListItem>
            {availableCategories.map((category) => {
              const categoryCount = components.filter(
                (comp) =>
                  comp.manifest.category.toLowerCase() ===
                  category.toLowerCase()
              ).length;
              return (
                <ListItem key={category} disablePadding>
                  <ListItemButton
                    selected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                    sx={{ mx: 1, borderRadius: 1 }}
                  >
                    <ListItemText
                      primary={
                        category.charAt(0).toUpperCase() + category.slice(1)
                      }
                      secondary={`${categoryCount} items`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, paddingBottom: 6 }}>
        <Container maxWidth={false} sx={{ p: 3, height: "100%" }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {selectedCategory === "all"
                ? "All Components"
                : selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
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
            <div className="grid grid-cols-1 gap-4">
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
