"use client";
import { useState, useRef } from "react";
import {
  CircularProgress,
  IconButton,
  Tooltip,
  Box,
  Typography,
  ButtonGroup,
} from "@mui/material";

//UTILS
import { cn } from "@/shared/utils/cn";

// Icons
import DownloadIcon from "@mui/icons-material/Download";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { notifyError, notifySuccess } from "@/shared/utils/toastNotify";

// Download states
type DownloadState =
  | "idle"
  | "downloading"
  | "paused"
  | "cancelled"
  | "completed";

// Props
interface DownloadButtonProps {
  url: string;
  name: string; // Used as a base name for multiple files
  tooltip?: string;
}

export default function DownloadButton({
  url,
  name,
  tooltip = "Download",
}: DownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedBytes, setDownloadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);
  const chunksRef = useRef<Uint8Array[]>([]);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null,
  );
  const isPausedRef = useRef<boolean>(false);

  const sanitizeFilename = (filename: string): string => {
    return filename.replace(/[^a-zA-Z0-9-_\.]/g, "_");
  };

  const startDownload = async () => {
    try {
      setDownloadState("downloading");

      // Only reset if starting fresh download
      if (downloadState === "idle") {
        setDownloadProgress(0);
        setDownloadedBytes(0);
        chunksRef.current = [];
      }

      // Reset pause flag when starting/resuming
      isPausedRef.current = false;

      if (url.startsWith("blob:")) {
        // Handle blob URLs directly
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = sanitizeFilename(name);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        setDownloadState("completed");
        setTimeout(() => setDownloadState("idle"), 2000);
        notifySuccess("File downloaded successfully");
        return;
      }

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      const headers: Record<string, string> = {};

      // Add range header for resume functionality
      if (downloadedBytes > 0) {
        headers.Range = `bytes=${downloadedBytes}-`;
      }

      const response = await fetch(
        `/api/download?${new URLSearchParams({
          url,
          name: sanitizeFilename(name),
        })}`,
        {
          signal: abortControllerRef.current.signal,
          headers,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentLength = response.headers.get("content-length");
      const contentRange = response.headers.get("content-range");

      // Calculate total size
      let total = 0;
      if (contentRange) {
        // Parse "bytes start-end/total" format
        const match = contentRange.match(/bytes \d+-\d+\/(\d+)/);
        if (match) {
          total = parseInt(match[1], 10);
        }
      } else if (contentLength) {
        total = parseInt(contentLength, 10) + downloadedBytes;
      }

      setTotalBytes(total);

      if (!response.body) {
        throw new Error("ReadableStream not supported");
      }

      const reader = response.body.getReader();
      readerRef.current = reader;

      await readStream(reader, total);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Check if this was a pause or a cancel
        if (isPausedRef.current) {
          // This was a pause, state already set to "paused"
          return;
        } else {
          // Download was cancelled
          setDownloadState("cancelled");
          setTimeout(() => {
            setDownloadState("idle");
            resetDownload();
          }, 2000);
        }
      } else {
        console.error("Download error:", error);
        notifyError("Error downloading file");
        setDownloadState("idle");
        resetDownload();
      }
    }
  };

  const readStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    total: number,
  ) => {
    try {
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunksRef.current.push(value);
        setDownloadedBytes((prev) => {
          const newBytes = prev + value.length;
          if (total > 0) {
            setDownloadProgress((newBytes / total) * 100);
          }
          return newBytes;
        });
      }

      // Download completed successfully
      await completeDownload();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw error; // Re-throw abort errors
      }
      throw new Error("Stream reading failed");
    }
  };

  const completeDownload = async () => {
    // Combine all chunks into a single array
    const totalLength = chunksRef.current.reduce(
      (sum, chunk) => sum + chunk.length,
      0,
    );
    const allChunks = new Uint8Array(totalLength);
    let position = 0;

    for (const chunk of chunksRef.current) {
      allChunks.set(chunk, position);
      position += chunk.length;
    }

    const blob = new Blob([allChunks]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.download = sanitizeFilename(name);
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(downloadUrl);

    setDownloadState("completed");
    setTimeout(() => {
      setDownloadState("idle");
      resetDownload();
    }, 2000);
    notifySuccess("File downloaded successfully");
  };

  const pauseDownload = () => {
    isPausedRef.current = true;
    setDownloadState("paused");
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const resumeDownload = () => {
    startDownload();
  };

  const cancelDownload = () => {
    isPausedRef.current = false; // Ensure this is not treated as a pause
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setDownloadState("cancelled");
    setTimeout(() => {
      setDownloadState("idle");
      resetDownload();
    }, 1000);
  };

  const resetDownload = () => {
    setDownloadProgress(0);
    setDownloadedBytes(0);
    setTotalBytes(0);
    chunksRef.current = [];
    abortControllerRef.current = null;
    readerRef.current = null;
    isPausedRef.current = false;
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getTooltipText = () => {
    if (downloadState === "downloading" || downloadState === "paused") {
      const progressText =
        totalBytes > 0
          ? `${formatBytes(downloadedBytes)} / ${formatBytes(totalBytes)} (${Math.round(downloadProgress)}%)`
          : `${formatBytes(downloadedBytes)}`;
      return `${downloadState === "paused" ? "Paused" : "Downloading"}: ${progressText}`;
    }
    return tooltip;
  };

  return (
    <Tooltip title={getTooltipText()}>
      <Box position="relative" display="inline-flex">
        {downloadState === "idle" ? (
          <IconButton onClick={startDownload} size="small">
            <DownloadIcon fontSize="small" />
          </IconButton>
        ) : downloadState === "completed" ? (
          <IconButton disabled size="small">
            <DownloadDoneIcon fontSize="small" />
          </IconButton>
        ) : downloadState === "cancelled" ? (
          <IconButton disabled size="small">
            <StopIcon fontSize="small" color="error" />
          </IconButton>
        ) : (
          <ButtonGroup size="small" variant="outlined">
            {downloadState === "downloading" && (
              <Tooltip title="Pause download" placement="top">
                <IconButton onClick={pauseDownload} size="small">
                  <PauseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
            {downloadState === "paused" && (
              <Tooltip title="Resume download" placement="top">
                <IconButton onClick={resumeDownload} size="small">
                  <PlayArrowIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            <Tooltip title="Cancel download" placement="top">
              <IconButton onClick={cancelDownload} size="small">
                <StopIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ px: 1 }}
            >
              <CircularProgress
                size={16}
                color={downloadState === "downloading" ? "primary" : "inherit"}
                variant={downloadProgress > 0 ? "determinate" : "indeterminate"}
                value={downloadProgress}
                className={cn(
                  downloadState === "downloading" && "animate-pulse-fast",
                )}
              />
              {downloadProgress > 0 && (
                <Box
                  position="absolute"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{ fontSize: "6px", fontWeight: "bold" }}
                    className={cn(
                      downloadState === "downloading" && "animate-pulse",
                    )}
                  >
                    {Math.round(downloadProgress)}%
                  </Typography>
                </Box>
              )}
            </Box>
          </ButtonGroup>
        )}
      </Box>
    </Tooltip>
  );
}
