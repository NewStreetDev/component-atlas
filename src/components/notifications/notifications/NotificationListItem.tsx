"use client";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Badge,
} from "@mui/material";
import NotificationDrawer from "./NotificationDrawer";

//UTIL
import { cn } from "@/shared/utils/cn";

//CONTEXT
import { useNotification } from "./NotificationProvider";

//ICONS
import { Notifications as BellIcon } from "@mui/icons-material";

export default function NotificationListItem() {
  const { unreadNum, openNotificationDrawer, setOpenNotificationDrawer } =
    useNotification();

  const handleToggleNotificationDrawer = () => {
    setOpenNotificationDrawer((prev) => !prev);
  };

  return (
    <>
      <ListItem
        className={`${openNotificationDrawer && "from-blue-100 to-blue-200 text-blue-700! bg-linear-to-r!"} group hover:text-blue-700! relative cursor-pointer p-1! px-3! text-black transition-all duration-200 ease-in-out hover:opacity-80`}
        sx={{ borderRadius: 1 }}
        onClick={handleToggleNotificationDrawer}
      >
        <ListItemIcon sx={{ color: "inherit", minWidth: 30 }}>
          <Badge
            variant="dot"
            badgeContent={unreadNum}
            color="primary"
            max={99}
          >
            <BellIcon
              fontSize="small"
              className={cn(unreadNum > 0 && "animate-swing text-base!")}
            />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant="body2"
              className="group-hover:text-blue-700! text-xs! transition-all duration-200 ease-in-out"
            >
              Notifications
            </Typography>
          }
        />
      </ListItem>
      <NotificationDrawer
        open={openNotificationDrawer}
        toggleOpen={handleToggleNotificationDrawer}
      />
    </>
  );
}
