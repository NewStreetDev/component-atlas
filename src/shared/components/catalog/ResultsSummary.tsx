"use client";

import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { CatalogComponent } from "@/shared/types/component";

interface ResultsSummaryProps {
  totalComponents: number;
  filteredComponents: number;
  availableCategories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  components: CatalogComponent[];
}

export default function ResultsSummary({
  totalComponents,
  filteredComponents,
  availableCategories,
  selectedCategory,
  onCategoryChange,
  components,
}: ResultsSummaryProps) {
  return (
    <Box className="mb-6">
      <Box className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Box className="flex items-center gap-3">
          <Typography variant="h6" className="text-lg font-medium">
            {filteredComponents === totalComponents
              ? `${totalComponents} Components`
              : `${filteredComponents} of ${totalComponents} Components`}
          </Typography>
          {filteredComponents !== totalComponents && (
            <Chip
              label="Filtered"
              size="small"
              color="primary"
              variant="outlined"
              sx={{ borderRadius: 1.5 }}
            />
          )}
        </Box>

        {availableCategories.length > 0 && (
          <Box className="flex flex-wrap gap-2">
            {availableCategories.map((category) => {
              const count = components.filter(
                (c) => c.manifest.category === category
              ).length;
              const isSelected = selectedCategory === category;
              return (
                <Chip
                  key={category}
                  label={`${category.charAt(0).toUpperCase() + category.slice(1)} (${count})`}
                  variant={isSelected ? "filled" : "outlined"}
                  color={isSelected ? "primary" : "default"}
                  size="small"
                  onClick={() =>
                    onCategoryChange(isSelected ? "all" : category)
                  }
                  sx={{
                    borderRadius: 1.5,
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: 1,
                    },
                  }}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
}