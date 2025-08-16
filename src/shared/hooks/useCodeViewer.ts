"use client";

import { useState } from "react";
import { CatalogComponent, CodeViewerFile } from "@/shared/types/component";

export function useCodeViewer() {
  const [codeViewerOpen, setCodeViewerOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] =
    useState<CatalogComponent | null>(null);
  const [componentFiles, setComponentFiles] = useState<CodeViewerFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

  const handleShowCode = async (component: CatalogComponent) => {
    setSelectedComponent(component);
    setCodeViewerOpen(true);
    setLoadingFiles(true);

    try {
      const response = await fetch(`/api/components/${component.relativePath}`);
      if (!response.ok) {
        throw new Error("Failed to load component files");
      }

      const files = await response.json();
      setComponentFiles(files);
    } catch (err) {
      console.error("Failed to load component files:", err);
      setComponentFiles([]);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleCloseCodeViewer = () => {
    setCodeViewerOpen(false);
    setSelectedComponent(null);
    setComponentFiles([]);
  };

  return {
    codeViewerOpen,
    selectedComponent,
    componentFiles,
    loadingFiles,
    handleShowCode,
    handleCloseCodeViewer,
  };
}