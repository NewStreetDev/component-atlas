"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { CodeViewerFile } from "@/shared/types/component";
import { cn } from "@/shared/utils/cn";
import CodeViewerSkeleton from "./CodeViewerSkeleton";
import FileContentRenderer from "./FileContentRenderer";

interface CodeViewerProps {
  open: boolean;
  onClose: () => void;
  files: CodeViewerFile[];
  componentName: string;
  loading?: boolean;
}

export default function CodeViewer({
  open,
  onClose,
  files,
  componentName,
  loading = false,
}: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeTheme, setCodeTheme] = useState<"light" | "dark">("dark");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const handleCloseCopyAlert = () => {
    setCopySuccess(false);
  };

  const toggleCodeTheme = () => {
    setCodeTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const getCodeFontSize = () => {
    if (isSmall) return "10px";
    if (isLarge) return "14px";
    return "12px"; // medium screens
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            height: fullScreen ? "100%" : "80vh",
            maxHeight: fullScreen ? "100%" : "80vh",
          },
        }}
      >
        <DialogTitle className="flex! items-center! justify-between!">
          <Typography
            variant="h6"
            className="text-sm! sm:text-base! md:text-lg!"
          >
            {componentName} - Source Code
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-0 overflow-hidden">
          {loading ? (
            <CodeViewerSkeleton />
          ) : files.length === 0 ? (
            <Box className="flex! items-center! justify-center! h-64!">
              <Typography
                color="text.secondary"
                className="text-xs! sm:text-sm! md:text-base!"
              >
                No files available
              </Typography>
            </Box>
          ) : (
            <Box className="h-full! flex! flex-col!">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                className="border-b!"
              >
                {files.map((file) => (
                  <Tab
                    key={file.name}
                    label={
                      <Box className="flex! items-center! gap-1!">
                        <span className="text-xs! sm:text-sm! md:text-base!">
                          {file.name}
                        </span>
                        {file.name === "README.mdx" && (
                          <Typography
                            variant="caption"
                            className="bg-blue-100! text-blue-800! px-1! rounded! text-xs!"
                          >
                            Docs
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>

              {files[activeTab] && (
                <Box className="flex-1! relative! overflow-hidden!">
                  <Box className="absolute! top-2! right-2! z-10! flex! gap-1!">
                    <IconButton
                      onClick={toggleCodeTheme}
                      size="small"
                      className={cn(
                        "backdrop-blur-sm transition-colors",
                        codeTheme === "dark"
                          ? "bg-white/10! hover:bg-white/20! text-white!"
                          : "bg-black/10! hover:bg-black/20! text-gray-700!"
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
                          ? "bg-white/10! hover:bg-white/20! text-white!"
                          : "bg-black/10! hover:bg-black/20! text-gray-700!"
                      )}
                      title="Copy code"
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box className="absolute! top-2! left-2! z-10!">
                    <Typography
                      variant="caption"
                      className={cn(
                        "backdrop-blur-sm! px-2! py-1! rounded! text-xs! sm:text-sm! transition-colors!",
                        codeTheme === "dark"
                          ? "bg-white/10! text-white!"
                          : "bg-black/10! text-gray-700!"
                      )}
                    >
                      {files[activeTab].path}
                    </Typography>
                  </Box>

                  <Box className="h-full! overflow-auto!">
                    <FileContentRenderer
                      file={files[activeTab]}
                      isDark={codeTheme === "dark"}
                      fontSize={getCodeFontSize()}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

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
