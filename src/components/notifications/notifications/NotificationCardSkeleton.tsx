import { useState, useEffect } from "react";
import { Card, CardContent, Skeleton } from "@mui/material";

interface NotificationCardSkeletonProps {
  delay?: number;
}

export default function NotificationCardSkeleton({
  delay = 0,
}: NotificationCardSkeletonProps) {
  const [showSkeletons, setShowSkeletons] = useState(delay === 0);

  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShowSkeletons(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  if (!showSkeletons) return null;
  return (
    <Card
      variant="outlined"
      className={`animate-fade-in bg-gray-300! relative mb-2 h-fit min-h-20 rounded-lg p-0! text-black shadow-md transition-all`}
    >
      <CardContent className="flex min-h-8 flex-col gap-3 px-3!">
        <div className="flex flex-1 items-center gap-2">
          {/* Skeleton for Notification Icon */}
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            className="mr-1 max-h-8! max-w-8!"
          />

          {/* Skeleton for Notification Content */}
          <div className="flex w-full flex-col items-start">
            <Skeleton variant="text" width="60%" height={20} />
            <Skeleton variant="text" width="80%" height={16} />

            <div className="mt-2 flex w-full items-center justify-between gap-2">
              <Skeleton variant="text" width={100} height={14} />
              <Skeleton variant="rectangular" width={50} height={20} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
