"use client";

import { useState, useMemo } from "react";
import { CatalogComponent } from "@/shared/types/component";

export function useComponentFilters(components: CatalogComponent[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesSearch =
        component.manifest.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        component.manifest.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        component.manifest.tags?.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        component.manifest.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [components, searchTerm, selectedCategory]);

  const availableCategories = useMemo(() => {
    const categories = new Set(components.map((c) => c.manifest.category));
    return Array.from(categories).sort();
  }, [components]);

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all";

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredComponents,
    availableCategories,
    hasActiveFilters,
    clearAllFilters,
  };
}