//NOTE: This component is used to display text with a "see more" button if the text is too long
//NOTE: The text will be displayed with a maximum of 3 lines, if the text is longer than that, a "see more" button will be displayed
import React, { useRef, useState, useEffect } from "react";

import { Typography } from "@mui/material";
import { cn } from "@/shared/utils/cn";


interface TextDisplayerProps {
  text: string;
  className?: string;
  numClamp?: number;
}

export default function TextDisplayer({
  text,
  className,
  numClamp = 3,
}: TextDisplayerProps) {
  const typographyRef = useRef<HTMLParagraphElement | null>(null);

  const [seeMore, setSeeMore] = useState(false);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const element = typographyRef.current;
    if (element) {
      // Check if the content overflows
      const isOverflowing = element.scrollHeight > element.offsetHeight;
      setIsOverflowed(isOverflowing);
    }
  }, [text]);

  return (
    <>
      <Typography
        ref={typographyRef}
        variant="body2"
        component="p"
        className={cn(``, className)}
        sx={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: seeMore ? "none" : numClamp,
        }}
      >
        {text}
      </Typography>
      {isOverflowed && (
        <Typography
          component={"button"}
          onClick={() => setSeeMore(!seeMore)}
          className="text-accent-500! cursor-pointer"
          variant="caption"
        >
          {seeMore ? "see less..." : "see more..."}
        </Typography>
      )}
    </>
  );
}
