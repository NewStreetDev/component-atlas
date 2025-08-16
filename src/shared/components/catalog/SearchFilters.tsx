"use client";

import React from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  availableCategories: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
  hasActiveFilters,
  onClearFilters,
}: SearchFiltersProps) {
  return (
    <Card elevation={0}>
      <CardContent className="p-0! pt-4!">
        {/* Main Filter Row */}
        <Box className="p-0! pb-4!">
          <Box className="flex flex-row gap-4 items-start lg:items-center">
            {/* Search Field */}
            <Box className="flex-1 min-w-0">
              <TextField
                fullWidth
                size="medium"
                placeholder="Search components by name, description, or tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                inputProps={{
                  "aria-label": "Search components",
                  "aria-describedby": "search-help-text",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" aria-hidden="true" />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        onClick={() => onSearchChange("")}
                        sx={{ minWidth: "auto", p: 0.5 }}
                        aria-label="Clear search"
                      >
                        <ClearIcon fontSize="small" />
                      </Button>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    borderRadius: 2,
                  },
                }}
              />
            </Box>

            {/* Category Filter */}
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                label="Category"
                size="medium"
                aria-label="Filter by category"
                sx={{
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                  borderRadius: 2,
                }}
              >
                <MenuItem value="all">
                  <Box className="flex items-center gap-2">
                    <FilterIcon fontSize="small" />
                    All Categories
                  </Box>
                </MenuItem>
                {availableCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <Box className="px-0! pb-4 flex! flex-row! justify-between!">
            <Box className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Typography variant="body2" component="span">
                Active filters:
              </Typography>
              {searchTerm && (
                <Chip
                  label={`Search: "${searchTerm}"`}
                  size="small"
                  variant="outlined"
                  onDelete={() => onSearchChange("")}
                  deleteIcon={<ClearIcon fontSize="small" />}
                  sx={{ height: 24, borderRadius: 1.5 }}
                />
              )}
              {selectedCategory !== "all" && (
                <Chip
                  label={`Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`}
                  size="small"
                  variant="outlined"
                  onDelete={() => onCategoryChange("all")}
                  deleteIcon={<ClearIcon fontSize="small" />}
                  sx={{ height: 24, borderRadius: 1.5 }}
                />
              )}
            </Box>
            {/* Filter Actions */}
            <Box className="flex items-center gap-2">
              <Button
                variant="text"
                startIcon={<ClearIcon />}
                onClick={onClearFilters}
                size="medium"
                color="secondary"
                sx={{ borderRadius: 2 }}
                aria-label="Clear all active filters"
              >
                Clear
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}