"use client";

import React from "react";
import { Box, Card, Typography, Button } from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";

interface EmptyStateProps {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function EmptyState({
  hasActiveFilters,
  onClearFilters,
}: EmptyStateProps) {
  return (
    <Card className="p-12 text-center" elevation={1}>
      <Box className="max-w-md mx-auto">
        <SearchIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
        <Typography variant="h5" color="text.secondary" className="mb-2!">
          No components found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          className="mb-4!"
        >
          {hasActiveFilters
            ? "Try adjusting your search or filter criteria"
            : "No components are available in the catalog yet"}
        </Typography>
        {hasActiveFilters && (
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={onClearFilters}
            sx={{ borderRadius: 2 }}
          >
            Clear All Filters
          </Button>
        )}
      </Box>
    </Card>
  );
}