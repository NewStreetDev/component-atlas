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

// Format seconds to time display (mm:ss)
export const formatTimeToDisplay = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    : `${minutes}:${secs.toString().padStart(2, "0")}`;
};

interface AudioPlayerContextType {
  playerRef: React.RefObject<ReactPlayer | null>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  hoverTimeoutRef: React.RefObject<NodeJS.Timeout | null>;
  currentTime: number;
  duration: number;
  playing: boolean;
  volume: number;
  isHovering: boolean;
  title: string | undefined;
  artist: string | undefined;
  coverImage: string | undefined;
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  setArtist: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCoverImage: React.Dispatch<React.SetStateAction<string | undefined>>;
  handleProgress: (state: { playedSeconds: number }) => void;
  handleDuration: (dur: number) => void;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  setIsHovering: React.Dispatch<React.SetStateAction<boolean>>;
  handleTogglePlay: () => void;
  handleSeek: (_event: Event | null, newValue: number | number[]) => void;
  handleSound: (_event: Event, newValue: number | number[]) => void;
  handleMouseLeave: () => void;
  handleMouseMove: () => void;
  handleForward10: () => void;
  handleRewind10: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider",
    );
  }
  return context;
};

export function AudioPlayerProvider({
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
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isHovering, setIsHovering] = useState(false);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);

  const handleProgress = (state: { playedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleTogglePlay = () => {
    setPlaying((prev) => !prev);
    setIsHovering(true);
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
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 1000);
  };

  const handleMouseMove = () => {
    setIsHovering(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 3000);
  };

  const handleForward10 = useCallback(() => {
    if (playerRef.current) {
      const newTime = currentTime + 10;
      if (newTime < duration) {
        handleSeek(null, newTime);
        setPlaying(true);
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      } else {
        handleSeek(null, duration);
      }
    }
  }, [currentTime, duration]);

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
  }, [currentTime]);

  // Keyboard shortcuts
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
    <AudioPlayerContext.Provider
      value={{
        playerRef,
        wrapperRef,
        timelineRef,
        hoverTimeoutRef,
        currentTime,
        duration,
        playing,
        volume,
        isHovering,
        title,
        artist,
        coverImage,
        setTitle,
        setArtist,
        setCoverImage,
        handleProgress,
        handleDuration,
        setPlaying,
        setVolume,
        setIsHovering,
        handleTogglePlay,
        handleSeek,
        handleSound,
        handleMouseLeave,
        handleMouseMove,
        handleForward10,
        handleRewind10,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}
