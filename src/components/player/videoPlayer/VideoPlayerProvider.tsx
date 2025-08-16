"use client";
import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";

interface VideoPlayerContextType {
  playerRef: React.RefObject<ReactPlayer | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  hoverTimeoutRef: React.RefObject<NodeJS.Timeout | null>;
  currentTime: number;
  duration: number;
  playing: boolean;
  volume: number;
  isVideoHover: boolean;
  isFullscreen: boolean;
  watermarkText: string;
  handleForward30: () => void;
  handleRewind10: () => void;
  handleProgress: (state: { playedSeconds: number }) => void;
  handleDuration: (dur: number) => void;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setIsVideoHover: React.Dispatch<React.SetStateAction<boolean>>;
  setWatermarkText: React.Dispatch<React.SetStateAction<string>>;
  handleTogglePlay: () => void;
  handleSeek: (_event: Event | null, newValue: number | number[]) => void;
  handleSound: (_event: Event, newValue: number | number[]) => void;
  handleMouseLeave: () => void;
  handleMouseMove: () => void;
  handleFullscreen: () => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

export const useVideoPlayer = () => {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
};

export function VideoPlayerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const playerRef = useRef<ReactPlayer>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isVideoHover, setIsVideoHover] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [watermarkText, setWatermarkText] = useState(
    "VICTORY CLUB - CONFIDENTIAL",
  );

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleTogglePlay = () => {
    setPlaying((prev) => !prev);
    setIsVideoHover(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleSeek = (_event: Event | null, newValue: number | number[]) => {
    if (playerRef.current) {
      playerRef.current.seekTo(newValue as number);
    }
  };

  const handleSound = (_event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  const handleMouseLeave = () => {
    //IF THE VIDEO END, DONOT HIDE ANY
    if (currentTime >= duration) return;

    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setTimeout(() => setIsVideoHover(false), 500);
  };

  const handleMouseMove = () => {
    //IF THE VIDEO END, DONOT HIDE ANY
    if (currentTime >= duration) return;

    setIsVideoHover(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (wrapperRef.current) wrapperRef.current.style.cursor = "auto";

    hoverTimeoutRef.current = setTimeout(() => {
      setIsVideoHover(false);
      if (wrapperRef.current) wrapperRef.current.style.cursor = "none";
    }, 3000);
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled && wrapperRef.current) {
      screenfull.toggle(wrapperRef.current);
    }
  };

  const handleForward30 = useCallback(() => {
    if (playerRef.current) {
      const newTime = currentTime + 30;
      if (newTime < duration) {
        handleSeek(null, newTime);
        setPlaying(true);
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      } else {
        handleSeek(null, duration);
      }
    }
  }, [currentTime, duration, handleSeek, playerRef]);

  const handleRewind10 = useCallback(() => {
    if (playerRef.current) {
      const newTime = currentTime - 10;
      if (newTime > 0) {
        handleSeek(null, newTime);
        setPlaying(true);
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      } else {
        handleSeek(null, 0);
      }
    }
  }, [currentTime, duration, handleSeek, playerRef]);

  // Listen for fullscreen changes
  useEffect(() => {
    if (screenfull.isEnabled) {
      const changeHandler = () => setIsFullscreen(screenfull.isFullscreen);
      screenfull.on("change", changeHandler);
      return () => screenfull.off("change", changeHandler);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore spacebar when typing in input fields or textareas
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return;
      }

      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        handleTogglePlay();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <VideoPlayerContext.Provider
      value={{
        playerRef,
        wrapperRef,
        timelineRef,
        hoverTimeoutRef,
        currentTime,
        duration,
        playing,
        volume,
        isVideoHover,
        isFullscreen,
        watermarkText,
        setPlaying,
        setVolume,
        setIsVideoHover,
        setWatermarkText,
        handleForward30,
        handleRewind10,
        handleProgress,
        handleDuration,
        handleTogglePlay,
        handleSeek,
        handleSound,
        handleMouseLeave,
        handleMouseMove,
        handleFullscreen,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
}
