"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Tooltip,
  Slider,
  Fade,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ICONS
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import Forward10Icon from "@mui/icons-material/Forward10";
import Replay10Icon from "@mui/icons-material/Replay10";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

// CONTEXT
import {
  useAudioPlayer,
  formatTimeToDisplay,
} from "./AudioPlayerProvider";

// PLAYER
import ReactPlayer from "react-player/lazy";

// UTILS
import { cn } from "@/shared/utils/cn";

const ProgressSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    display: "none",
    transition: "opacity 0.3s ease-in-out",
    opacity: 0,
    width: "12px",
    height: "12px",
  },
  "&:hover .MuiSlider-thumb": {
    display: "block",
    opacity: 1,
    boxShadow: "none",
  },
  "& .MuiSlider-track": {
    transition: "height 0.2s ease",
  },
  "&:hover .MuiSlider-track": {
    height: "6px",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "white",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    marginTop: "-2px",
    marginLeft: "-3px",
    cursor: "pointer",
    zIndex: 2,
  },
  "& .MuiSlider-markActive": {
    backgroundColor: "white",
  },
});

const VolumeSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    width: "8px",
    height: "8px",
  },
});

interface AudioPlayerProps {
  url: string;
  title?: string;
  artist?: string;
  coverImage?: string;
  onEnded?: () => void;
  onReady?: () => void;
  waveform?: number[];
  className?: string;
  marks?: { value: number; label: React.ReactNode | string }[];
}

// Inner component that uses the context
export default function AudioPlayer({
  url,
  title: initialTitle,
  artist: initialArtist,
  coverImage: initialCoverImage,
  onReady,
  onEnded,
  className,
  marks = [],
}: AudioPlayerProps) {
  const {
    playerRef,
    wrapperRef,
    timelineRef,
    currentTime,
    duration,
    playing,
    volume,
    isHovering,
    setPlaying,
    handleProgress,
    handleDuration,
    handleTogglePlay,
    handleSeek,
    handleSound,
    handleMouseLeave,
    handleMouseMove,
    handleForward10,
    handleRewind10,
    setTitle,
    setArtist,
    setCoverImage,
    title,
    artist,
    coverImage,
  } = useAudioPlayer();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [hasWindow, setHasWindow] = useState(false);

  // Handle mouse hover for timeline
  const handleSliderMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const slider = timelineRef.current;
    if (slider && duration) {
      const rect = slider.getBoundingClientRect();
      const position = (event.clientX - rect.left) / rect.width;
      const time = position * duration;
      setHoveredTime(time <= 0 ? 0 : time);
    }
  };

  // Set initial metadata
  useEffect(() => {
    if (initialTitle) setTitle(initialTitle);
    if (initialArtist) setArtist(initialArtist);
    if (initialCoverImage) setCoverImage(initialCoverImage);
  }, [
    initialTitle,
    initialArtist,
    initialCoverImage,
    setTitle,
    setArtist,
    setCoverImage,
  ]);

  // Check if window is available (for SSR compatibility)
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "bg-primary-800/70 relative flex flex-col overflow-hidden rounded-lg backdrop-blur-xl transition-all duration-300",
        "shadow-primary-900/30 border-primary-700 border shadow-lg",
        isLoading && "animate-pulse",
        isError && "bg-primary-700/40",
        className,
      )}
    >
      {/* Hidden ReactPlayer */}
      <div className="absolute top-0 left-0 h-0 w-0 overflow-hidden">
        {hasWindow && (
          <ReactPlayer
            ref={playerRef}
            url={url}
            width="100%"
            height="100%"
            controls={false}
            onProgress={handleProgress}
            onDuration={handleDuration}
            volume={volume}
            playing={playing}
            onReady={() => {
              setIsLoading(false);
              if (onReady) onReady();
            }}
            onError={() => {
              setIsLoading(false);
              setIsError(true);
            }}
            onEnded={() => {
              setPlaying(false);
              if (onEnded) onEnded();
            }}
          />
        )}
      </div>

      {/* Audio Player UI */}
      <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Cover Image or Icon */}
        <div
          className={cn(
            "bg-primary-700 mx-auto flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-md sm:h-12 sm:w-12 md:mr-1",
            isLoading && "animate-pulse",
          )}
        >
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title || "Audio"}
              className="h-full w-full object-cover"
              fill
              sizes="(max-width: 640px) 40px, 48px"
            />
          ) : (
            <MusicNoteIcon className="text-primary-300 h-6 w-6 sm:h-8 sm:w-8" />
          )}
        </div>

        {/* Info and Controls */}
        <div className="flex min-w-0 flex-grow flex-col">
          {/* Track Info */}
          {(title || artist) && (
            <div className="mb-2 sm:mb-1">
              {title && (
                <Typography
                  variant="subtitle2"
                  className="text-primary-100 truncate text-sm font-medium sm:text-base"
                >
                  {title}
                </Typography>
              )}
              {artist && (
                <Typography
                  variant="caption"
                  className="text-primary-400 truncate text-xs sm:text-sm"
                >
                  {artist}
                </Typography>
              )}
            </div>
          )}
          {/* Mobile Time and Volume */}
          <div className="flex items-center justify-between md:hidden">
            <div className="text-primary-300 text-xs">
              {formatTimeToDisplay(currentTime)} /{" "}
              {formatTimeToDisplay(duration)}
            </div>

            <div className="flex w-1/2 items-center gap-1">
              <IconButton
                onClick={() =>
                  handleSound(null as unknown as Event, volume === 0 ? 0.5 : 0)
                }
                className="text-primary-300 hover:text-accent-500 p-1"
              >
                {volume === 0 ? (
                  <VolumeMuteIcon fontSize="small" />
                ) : volume < 0.5 ? (
                  <VolumeDownRounded fontSize="small" />
                ) : (
                  <VolumeUpRounded fontSize="small" />
                )}
              </IconButton>

              <VolumeSlider
                className="w-16"
                aria-label="Volume"
                max={1}
                step={0.01}
                value={volume}
                onChange={handleSound}
                sx={{ color: "var(--primary-500)" }}
              />
            </div>
          </div>
          {/* Progress and Controls */}
          <div className="flex flex-col gap-2">
            {/* Progress Bar */}
            <div className="flex items-center">
              <Tooltip
                placement="top"
                title={formatTimeToDisplay(hoveredTime || 0)}
                followCursor
                arrow
              >
                <ProgressSlider
                  ref={timelineRef}
                  onMouseMove={handleSliderMouseMove}
                  className="w-full"
                  aria-label="Time"
                  min={0}
                  max={duration}
                  step={0.01}
                  value={currentTime}
                  onChange={handleSeek}
                  marks={marks}
                  sx={{
                    color: playing ? "var(--accent-500)" : "var(--primary-500)",
                  }}
                />
              </Tooltip>
            </div>

            {/* Controls and Time - Mobile Layout */}
            <div className="flex flex-col gap-2 sm:hidden">
              {/* Mobile Controls */}
              <div className="flex items-center justify-center gap-2">
                <IconButton
                  onClick={handleRewind10}
                  className="text-primary-300 hover:text-accent-500 p-2"
                >
                  <Replay10Icon fontSize="medium" />
                </IconButton>

                <IconButton
                  onClick={handleTogglePlay}
                  className="text-primary-100 hover:text-accent-500 p-2"
                >
                  {playing ? (
                    <PauseIcon fontSize="large" />
                  ) : (
                    <PlayArrowIcon fontSize="large" />
                  )}
                </IconButton>

                <IconButton
                  onClick={handleForward10}
                  className="text-primary-300 hover:text-accent-500 p-2"
                >
                  <Forward10Icon fontSize="medium" />
                </IconButton>
              </div>

              {/* Desktop Time and Volume */}
              <div className="hidden items-center justify-between md:flex">
                <div className="text-primary-300 text-xs">
                  {formatTimeToDisplay(currentTime)} /{" "}
                  {formatTimeToDisplay(duration)}
                </div>

                <div className="flex items-center gap-1">
                  <IconButton
                    onClick={() =>
                      handleSound(
                        null as unknown as Event,
                        volume === 0 ? 0.5 : 0,
                      )
                    }
                    className="text-primary-300 hover:text-accent-500 p-1"
                  >
                    {volume === 0 ? (
                      <VolumeMuteIcon fontSize="small" />
                    ) : volume < 0.5 ? (
                      <VolumeDownRounded fontSize="small" />
                    ) : (
                      <VolumeUpRounded fontSize="small" />
                    )}
                  </IconButton>

                  <VolumeSlider
                    className="w-16"
                    aria-label="Volume"
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleSound}
                    sx={{ color: "var(--primary-500)" }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden items-center justify-between sm:flex">
              <div className="flex items-center gap-1">
                {/* Play/Pause Button */}
                <IconButton
                  onClick={handleTogglePlay}
                  className="text-primary-100 hover:text-accent-500 p-1"
                >
                  {playing ? (
                    <PauseIcon fontSize="small" />
                  ) : (
                    <PlayArrowIcon fontSize="small" />
                  )}
                </IconButton>

                {/* Skip Buttons */}
                <IconButton
                  onClick={handleRewind10}
                  className="text-primary-300 hover:text-accent-500 p-1"
                >
                  <Replay10Icon fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={handleForward10}
                  className="text-primary-300 hover:text-accent-500 p-1"
                >
                  <Forward10Icon fontSize="small" />
                </IconButton>
              </div>

              {/* Time Display */}
              <div className="text-primary-300 mr-2 text-xs">
                {formatTimeToDisplay(currentTime)} /{" "}
                {formatTimeToDisplay(duration)}
              </div>

              {/* Volume Control */}
              <div className="ml-auto flex items-center gap-1">
                <IconButton
                  onClick={() =>
                    handleSound(
                      null as unknown as Event,
                      volume === 0 ? 0.5 : 0,
                    )
                  }
                  className="text-primary-300 hover:text-accent-500 p-1"
                >
                  {volume === 0 ? (
                    <VolumeMuteIcon fontSize="small" />
                  ) : volume < 0.5 ? (
                    <VolumeDownRounded fontSize="small" />
                  ) : (
                    <VolumeUpRounded fontSize="small" />
                  )}
                </IconButton>

                <Fade in={isHovering}>
                  <div>
                    <VolumeSlider
                      className="max-w-20 min-w-16"
                      aria-label="Volume"
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleSound}
                      sx={{ color: "var(--primary-500)" }}
                    />
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-primary-800/50 absolute inset-0 flex items-center justify-center">
          <CircularProgress size={28} className="text-accent-500" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-primary-800/70 absolute inset-0 flex flex-col items-center justify-center">
          <AudioFileIcon className="text-primary-300 mb-2" />
          <Typography variant="caption" className="text-primary-400">
            Unable to load audio
          </Typography>
        </div>
      )}
    </div>
  );
}
