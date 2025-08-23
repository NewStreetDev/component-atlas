"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { cn } from "@/shared/utils/cn";
import CodeViewerSkeleton from "./CodeViewerSkeleton";
import FileContentRenderer from "./FileContentRenderer";

export interface CodeFile {
  name: string;
  content: string;
  language: string;
  path: string;
}

interface CodeRendererProps {
  files: CodeFile[];
  loading?: boolean;
  showPath?: boolean;
  initialTheme?: "light" | "dark";
  className?: string;
}

export default function CodeRenderer({
  files,
  loading = false,
  showPath = true,
  initialTheme = "dark",
  className,
}: CodeRendererProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeTheme, setCodeTheme] = useState<"light" | "dark">(initialTheme);
  const isSmall = useMediaQuery("(max-width: 640px)");
  const isLarge = useMediaQuery("(min-width: 1024px)");

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCopy = async (content: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCloseCopyAlert = (): void => {
    setCopySuccess(false);
  };

  const toggleCodeTheme = (): void => {
    setCodeTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const getCodeFontSize = (): string => {
    if (isSmall) return "10px";
    if (isLarge) return "14px";
    return "12px"; // medium screens
  };

  if (loading) {
    return <CodeViewerSkeleton />;
  }

  if (files.length === 0) {
    return (
      <Box className="flex items-center justify-center h-64">
        <Typography color="text.secondary" className="text-xs sm:text-sm md:text-base">
          No files available
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Box className={cn("h-full flex flex-col", className)}>
        {files.length > 1 && (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className="border-b"
          >
            {files.map((file) => (
              <Tab
                key={file.name}
                label={
                  <Box className="flex items-center gap-1">
                    <span className="text-xs sm:text-sm md:text-base">
                      {file.name}
                    </span>
                    {file.name === "README.mdx" && (
                      <Typography
                        variant="caption"
                        className="bg-blue-100 text-blue-800 px-1 rounded text-xs"
                      >
                        Docs
                      </Typography>
                    )}
                  </Box>
                }
              />
            ))}
          </Tabs>
        )}

        {files[activeTab] && (
          <Box className="flex-1 relative overflow-hidden">
            <Box className="absolute top-2 right-2 z-10 flex gap-1">
              <IconButton
                onClick={toggleCodeTheme}
                size="small"
                className={cn(
                  "backdrop-blur-sm transition-colors",
                  codeTheme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-black/10 hover:bg-black/20 text-gray-700"
                )}
                title={`Switch to ${codeTheme === "dark" ? "light" : "dark"} theme`}
              >
                {codeTheme === "dark" ? (
                  <LightModeIcon fontSize="small" />
                ) : (
                  <DarkModeIcon fontSize="small" />
                )}
              </IconButton>
              <IconButton
                onClick={() => handleCopy(files[activeTab].content)}
                size="small"
                className={cn(
                  "backdrop-blur-sm transition-colors",
                  codeTheme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-black/10 hover:bg-black/20 text-gray-700"
                )}
                title="Copy code"
              >
                <CopyIcon fontSize="small" />
              </IconButton>
            </Box>

            {showPath && (
              <Box className="absolute top-2 left-2 z-10">
                <Typography
                  variant="caption"
                  className={cn(
                    "backdrop-blur-sm px-2 py-1 rounded text-xs sm:text-sm transition-colors",
                    codeTheme === "dark"
                      ? "bg-white/10 text-white"
                      : "bg-black/10 text-gray-700"
                  )}
                >
                  {files[activeTab].path}
                </Typography>
              </Box>
            )}

            <Box className="h-full overflow-auto">
              <FileContentRenderer
                file={files[activeTab]}
                isDark={codeTheme === "dark"}
                fontSize={getCodeFontSize()}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={handleCloseCopyAlert}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseCopyAlert}
          severity="success"
          variant="filled"
        >
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}