import React, { useState } from "react";
import Link from "next/link";
import TextDisplayer from "./TextDisplayer";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import {
  AccountCircle,
  WorkOutline,
  Close,
  DoneAll,
  Done,
} from "@mui/icons-material";

import { useNotification } from "./NotificationProvider";

//UTILS
import { Notification } from "./Notifications";
import ConfirmationDialog from "@/components/dialogs/confirmationDialog/ConfirmationDialog";

const LOCALE = "en-US";

const timeAgo = (isoDate: string): string => {
  const now = new Date().getTime(); // Convert to timestamp
  const past = new Date(isoDate).getTime(); // Convert to timestamp (UTC)
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds <= 0) return "Just now"; // If the date is in the future

  if (diffInSeconds < 60)
    return `${diffInSeconds} second${diffInSeconds !== 1 ? "s" : ""} ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60)
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24)
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7)
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;

  // If more than 7 days, format the date as "Feb 4, 2024"
  return formatDatetime(isoDate);
};

const formatDatetime = (
  isoDate: string,
  showSeconds = false,
  hour12 = true,
): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: showSeconds ? "2-digit" : undefined,
    hour12: hour12,
  };

  return date.toLocaleString(LOCALE, options);
};

interface NotificationCardProps extends Notification {
  index: number;
}

export default function NotificationCard(
  props: Readonly<NotificationCardProps>,
) {
  const { deleteNotification, markAsReadNotification, setNotifications } =
    useNotification();
  const {
    index,
    title,
    message,
    objectType,
    createdDate,
    notificationId,
    isRead,
    objectId,
  } = props;
  const [isDeleting, setIsDeleting] = useState(false);
  const typeIcons: Record<Notification["objectType"], React.JSX.Element> = {
    ProjectCreators: <AccountCircle />,
    Projects: <WorkOutline />,
  };

  const typeByUrl = {
    Projects: "/projects/",
    Project: "/projects/",
    ProjectCreators: "/projects/",
  };
  const baseUrl = typeByUrl?.[objectType];
  const urlAction = baseUrl + objectId;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteNotification(notificationId);
      setNotifications((prev) => {
        prev.splice(index, 1);
        return [...prev];
      });
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMarkRead = async () => {
    try {
      setIsDeleting(true);
      if (!isRead) {
        await markAsReadNotification(notificationId);
        setNotifications((prev) => {
          prev.splice(index, 1);
          return [...prev];
        });
      }
    } catch {
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Card
      variant="outlined"
      className={`${isDeleting && "animate-pulse-fast"} bg-gray-50! relative h-fit min-h-20 rounded-lg p-0! text-black shadow-md transition-all`}
    >
      <CardContent className="flex min-h-16 flex-col gap-3 px-3!">
        <div className="flex flex-1 items-center gap-2">
          {/* Notification Icon */}
          <div className="mr-1">{typeIcons[objectType]}</div>
          {/* Notification Content */}
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full gap-1">
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Typography
                    variant="subtitle2"
                    className={`z-10 font-semibold text-black ${baseUrl && "hover:underline"}`}
                    component={baseUrl ? Link : "span"}
                    href={baseUrl ? urlAction : undefined}
                  >
                    {title}{" "}
                  </Typography>
                </div>
                <TextDisplayer
                  numClamp={2}
                  className="!text-gray-600 text-xs! break-words"
                  text={message}
                />
              </div>
              <div className="flex h-full items-center justify-center">
                <ConfirmationDialog
                  title="Delete Notification"
                  content="Are you sure you want to delete this notification?"
                  cancelText="Cancel"
                  confirmText="Delete"
                  onCancel={() => {}}
                  onConfirm={handleDelete}
                >
                  <Tooltip title="Delete">
                    <IconButton size="small">
                      <Close fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </ConfirmationDialog>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2">
              <Tooltip title={formatDatetime(createdDate, true, true)}>
                <Typography
                  variant="caption"
                  component={"span"}
                  className="text-gray-400! m-0! text-xs!"
                >
                  {timeAgo(createdDate)}
                </Typography>
              </Tooltip>

              {(() => {
                if (!isRead) {
                  if (isDeleting) {
                    return <CircularProgress size={20} color="inherit" />;
                  } else {
                    return (
                      <Tooltip title="Mark as read">
                        <IconButton
                          onClick={handleMarkRead}
                          className="text-blue-500! m-0! p-0! text-xs!"
                        >
                          <Done fontSize="small" className="text-blue-500!" />
                        </IconButton>
                      </Tooltip>
                    );
                  }
                } else {
                  return (
                    <Tooltip title="Read">
                      <DoneAll fontSize="small" className="text-blue-500!" />
                    </Tooltip>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
