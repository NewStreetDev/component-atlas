"use client";

import { useState, useEffect } from "react";
import { CatalogComponent } from "@/shared/types/component";

export function useComponentsData() {
  const [components, setComponents] = useState<CatalogComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComponents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/components");

      if (!response.ok) {
        throw new Error("Failed to load components");
      }

      const data = await response.json();
      setComponents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComponents();
  }, []);

  return {
    components,
    loading,
    error,
    refetch: loadComponents,
  };
}