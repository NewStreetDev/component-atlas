"use client";

import React, { useState, useEffect, useCallback } from "react";
import ReactPlayer from "react-player/lazy";

//CONTEXT
import { useVideoPlayer } from "./VideoPlayerProvider";

import {
  Tooltip,
  Slider,
  Fade,
  IconButton,
  Zoom,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";

//ICONS
import Forward30Icon from "@mui/icons-material/Forward30";
import Replay10Icon from "@mui/icons-material/Replay10";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";

import { cn } from "@/shared/utils/cn";

export const formatSecondToTimer = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`
    : `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const ProgressSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    display: "none",
    transition: "opacity 0.5s ease-in-out",
    opacity: 0,
    width: "12px",
    height: "12px",
  },
  "&:hover .MuiSlider-thumb": {
    display: "block",
    opacity: 1,
    boxShadow: "none",
  },
  "& .MuiSlider-mark": {
    backgroundColor: "white", // Change the mark color
  },
  "& .MuiSlider-markActive": {
    backgroundColor: "white", // Change the active mark color
  },
});
const VolumeSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    display: "none",
    transition: "opacity 0.5s ease-in-out",
    opacity: 0,
    width: "8px",
    height: "8px",
  },
  "&:hover .MuiSlider-thumb": {
    display: "block",
    opacity: 1,
    boxShadow: "none",
  },
});

interface VideoPlayerProps {
  url: string;
  marks?: { value: number; label: React.ReactNode | string }[];
  onEnded?: () => void;
  onReady?: () => void;
}

export default function VideoPlayer({
  url,
  marks = [],
  onReady,
  onEnded,
}: VideoPlayerProps) {
  const {
    playerRef,
    wrapperRef,
    timelineRef,
    currentTime,
    duration,
    playing,
    volume,
    // isVideoHover,
    isFullscreen,
    setPlaying,
    handleForward30,
    handleRewind10,
    handleTogglePlay,
    handleProgress,
    setVolume,
    setIsVideoHover,
    handleDuration,
    handleSeek,
    handleSound,
    handleMouseLeave,
    handleMouseMove,
    handleFullscreen,
    hoverTimeoutRef,
  } = useVideoPlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);
  const [hasWindow, setHasWindow] = useState(false);

  // Debounced mouse move handler
  const handleSliderMouseMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      const slider = timelineRef.current;
      if (slider && duration) {
        const rect = slider.getBoundingClientRect();
        const position = (event.clientX - rect.left) / rect.width;
        const time = position * duration;
        setHoveredTime(time <= 0 ? 0 : time);
      }
    }, // Adjust delay as needed
    [duration]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
  }, []);

  return (
    <div
      onClick={() => setPlaying(!playing)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        "bg-blue-800/30 relative w-full cursor-pointer overflow-hidden rounded-lg backdrop-blur-md transition-all duration-300 ease-in-out",
        isLoading && "aspect-video animate-pulse",
        isError && "bg-blue-700/40"
      )}
      ref={wrapperRef}
    >
      {isLoading && (
        <>
          <div className="bg-blue-50/10 animate-wave h-full w-[150%] blur-3xl"></div>
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <CircularProgress
              color="primary"
              size={32}
              className="md:size-[45px]"
            />
          </div>
        </>
      )}
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
            setIsVideoHover(false);
          }}
          onEnded={() => {
            setIsVideoHover(true);
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setPlaying(false);

            //Trigger onEnded callback if provided
            if (onEnded) onEnded();
          }}
        />
      )}

      {!isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          {isError ? (
            <VideocamOffIcon className="text-blue-300 h-8! w-8! md:h-12! md:w-12!" />
          ) : (
            <Fade
              // in={isVideoHover}
              in={true}
              timeout={300}
            >
              <div
                className="flex items-center gap-2 md:gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <IconButton
                  className="z-50! p-1 md:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRewind10();
                  }}
                >
                  <Replay10Icon
                    fontSize="medium"
                    className="h-6! w-6! md:h-8! md:w-8!"
                  />
                </IconButton>
                <Zoom
                  // in={isVideoHover}
                  in={true}
                  timeout={600}
                >
                  <IconButton
                    onClick={handleTogglePlay}
                    className="text-blue-300! rounded-xl! bg-neutral-800/80! p-2 backdrop-blur-sm transition! hover:bg-neutral-800/70! md:rounded-2xl! md:p-3"
                    size="medium"
                  >
                    {playing ? (
                      <PauseIcon
                        fontSize="medium"
                        className="h-6! w-6! md:h-8! md:w-8!"
                      />
                    ) : (
                      <PlayArrowIcon
                        fontSize="medium"
                        className="h-6! w-6! md:h-8! md:w-8!"
                      />
                    )}
                  </IconButton>
                </Zoom>
                <IconButton
                  className="z-50! p-1 md:p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleForward30();
                  }}
                >
                  <Forward30Icon
                    fontSize="medium"
                    className="h-6! w-6! md:h-8! md:w-8!"
                  />
                </IconButton>
              </div>
            </Fade>
          )}
        </div>
      )}
      {/* Toolbar */}
      <Fade
        // in={isVideoHover}
        in={true}
        timeout={300}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={cn(
            "inset-shadow-blue-800 absolute bottom-0 left-0 z-20 h-fit w-full cursor-default! rounded-t-md bg-neutral-800/90 p-1 inset-shadow-sm md:p-2",
            ""
          )}
        >
          <div className="flex flex-col">
            <Tooltip
              placement="top"
              title={formatSecondToTimer(hoveredTime || 0)}
              followCursor
              arrow
            >
              <ProgressSlider
                onMouseMove={handleSliderMouseMove}
                ref={timelineRef}
                className="w-full pb-0! hover:h-2!"
                aria-label="Time"
                min={0}
                max={duration}
                step={0.01}
                value={currentTime}
                onChange={handleSeek}
                marks={marks}
              />
            </Tooltip>

            <div className="flex items-center justify-between gap-1 md:gap-2">
              <div className="flex items-center gap-1 md:gap-2">
                <IconButton
                  onClick={handleTogglePlay}
                  className="p-1 text-white! md:p-2"
                >
                  {playing ? (
                    <PauseIcon
                      fontSize="small"
                      className="h-5! w-5! md:h-6! md:w-6!"
                    />
                  ) : (
                    <PlayArrowIcon
                      fontSize="small"
                      className="h-5! w-5! md:h-6! md:w-6!"
                    />
                  )}
                </IconButton>

                <div className="flex w-full items-center gap-1 md:gap-2">
                  {volume === 0 ? (
                    <VolumeMuteIcon className="text-white" fontSize="small" />
                  ) : (
                    <VolumeDownRounded
                      className="cursor-pointer! text-white"
                      fontSize="small"
                      onClick={() => setVolume(0)}
                    />
                  )}

                  <Tooltip
                    title={(volume * 100).toFixed(0) + "%"}
                    placement="bottom"
                    followCursor
                  >
                    <VolumeSlider
                      className="min-w-6! text-white! md:min-w-8! lg:min-w-12!"
                      aria-label="Volume"
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={handleSound}
                    />
                  </Tooltip>
                  <VolumeUpRounded className="text-white!" fontSize="small" />
                </div>

                <div className="text-xs text-nowrap text-white md:text-sm">
                  {formatSecondToTimer(currentTime)} /{" "}
                  {formatSecondToTimer(duration)}
                </div>
              </div>
              <div>
                <IconButton
                  className="p-1 text-white! md:p-2"
                  onClick={handleFullscreen}
                >
                  {isFullscreen ? (
                    <FullscreenExitIcon
                      fontSize="small"
                      className="h-5! w-5! md:h-6! md:w-6!"
                    />
                  ) : (
                    <FullscreenIcon
                      fontSize="small"
                      className="h-5! w-5! md:h-6! md:w-6!"
                    />
                  )}
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}
