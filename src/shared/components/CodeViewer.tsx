"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Close as CloseIcon,
} from "@mui/icons-material";
import { CodeViewerFile } from "@/shared/types/component";
import CodeRenderer from "./CodeRenderer";

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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
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
      <DialogTitle className="flex items-center justify-between">
        <Typography
          variant="h6"
          className="text-sm sm:text-base md:text-lg"
        >
          {componentName} - Source Code
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="p-0 overflow-hidden">
        <CodeRenderer
          files={files}
          loading={loading}
          showPath={true}
          initialTheme="dark"
          className="h-full"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
