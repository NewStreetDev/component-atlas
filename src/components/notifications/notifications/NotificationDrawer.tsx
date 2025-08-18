"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Typography,
  IconButton,
  Tabs,
  Tab,
  List,
  Pagination,
  CircularProgress,
  Button,
  Tooltip,
} from "@mui/material";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import NotificationCard from "./NotificationCard";
import NotificationCardSkeleton from "./NotificationCardSkeleton";

//CONTEXT
import { useNotification } from "./NotificationProvider";

//ICONS
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import ConfirmationDialog from "@/components/dialogs/confirmationDialog/ConfirmationDialog";

const mainDrawerWidth = 0;

interface NotificationDrawerProps {
  open: boolean;
  toggleOpen: () => void;
}

export default function NotificationDrawer({
  open,
  toggleOpen,
}: Readonly<NotificationDrawerProps>) {
  const pathname = usePathname();
  const {
    notifications,
    setNotifications,
    isNotificationsLoading,
    setOpenNotificationDrawer,
    tabIndex,
    setTabIndex,
    page,
    setPage,
    totalPages,
    deleteAllNotification,
    markAllAsReadNotification,
    getNotifications,
  } = useNotification();
  const [isAllMarking, setIsAllMarking] = useState(false);
  const [isAllDeleting, setIsAllDeleting] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  function handleExpand() {
    setIsExpanded((prev) => !prev);
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("lg"));

  const tadLabels = ["Unread", "Read"];

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newTadIndex: number,
  ): void => {
    setPage(1);
    setTabIndex(newTadIndex);
  };

  const handleDeleteAll = async () => {
    try {
      setIsAllDeleting(true);
      await deleteAllNotification();
      setNotifications([]);
    } catch {
    } finally {
      setIsAllDeleting(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      setIsAllMarking(true);
      await markAllAsReadNotification();
      setNotifications([]);
    } catch {
    } finally {
      setIsAllMarking(false);
    }
  };

  useEffect(() => {
    setOpenNotificationDrawer(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      getNotifications();
    }
  }, [tabIndex, page, open]);

  return (
    <Drawer
      variant="temporary"
      anchor={"left"}
      open={open}
      onClose={toggleOpen}
      keepMounted={false}
      elevation={0}
      PaperProps={{
        className: "bg-gray-200!",
      }}
      sx={{
        zIndex: (theme) =>
          isExpanded ? theme.zIndex.drawer + 1 : theme.zIndex.drawer,
        position: "absolute",
        [`& .${drawerClasses.paper}`]: {
          width: isExpanded
            ? "100vw"
            : isTablet
              ? isMobile
                ? "100%"
                : "75%"
              : "300px",
          height: "100%",
          left: isExpanded ? 0 : isTablet ? 0 : mainDrawerWidth, // Anchored to the main drawer's width
          borderRight: "1px solid #404040",
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          boxShadow: "16px 10px 12px rgba(0, 0, 0, 0.1)", // Added shadow
        },
      }}
    >
      {/* Header Section with Close Button */}
      <div className="border-gray-300 bg-gray-50! flex flex-col gap-2 border-b">
        <div className="relative flex items-center justify-center px-1 py-3">
          {!isExpanded && (
            <IconButton className="absolute! left-1" onClick={toggleOpen}>
              <KeyboardDoubleArrowLeftIcon />
            </IconButton>
          )}

          <Typography variant="h6" className="text-center text-lg! text-black">
            Notifications
          </Typography>

          {/* Expand Button (top right, only if not mobile) */}
          {!isMobile && (
            <Tooltip title={isExpanded ? "Collapse Drawer" : "Expand Drawer"}>
              <IconButton
                className="absolute! right-1"
                aria-label={isExpanded ? "Collapse Drawer" : "Expand Drawer"}
                onClick={handleExpand}
                size="small"
              >
                {isExpanded ? (
                  <CloseFullscreenIcon fontSize="small" />
                ) : (
                  <OpenInFullIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </div>
        {notifications.length > 0 && (
          <div className="px-2">
            <ConfirmationDialog
              className="p-0!"
              title={"Are you sure you want to delete all notifications?"}
              content={
                "This action cannot be undone. This will delete all unread and read notifications."
              }
              cancelText={"Cancel"}
              confirmText={"Delete all"}
              onConfirm={handleDeleteAll}
              onCancel={() => {}}
              isPositiveAction={false}
            >
              <Button
                size="small"
                variant="outlined"
                color="error"
                disabled={isAllDeleting}
                className="text-xs!"
              >
                {isAllDeleting ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Delete all"
                )}
              </Button>
            </ConfirmationDialog>
          </div>
        )}
        <div>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            variant="fullWidth"
            className="border-gray-300 border-t"
            sx={{
              minHeight: "auto",
            }}
          >
            {tadLabels.map((label, index) => (
              <Tab
                key={index}
                label={<Typography variant="caption">{label}</Typography>}
                sx={{
                  "&.MuiButtonBase-root": {
                    padding: 1,
                    minHeight: "auto",
                  },
                }}
              />
            ))}
          </Tabs>
        </div>
      </div>
      {/* DRAWER CONTENT */}
      <List
        sx={{ px: 1, flexGrow: 1, overflowY: "auto", pb: 3 }}
        className="bg-gray-200! relative"
      >
        {/* BLUR */}
        <div className="bg-gray-300 absolute -top-16 left-1/2 h-[200px] w-[150px] -translate-x-1/2 rounded-full blur-3xl" />
        {/* FUTURE FEATURES */}
        {/* <div className="flex items-center gap-1 bg-gray-200! mb-3">
          <NotificationFilter /> <NotificationOrder />
        </div> */}
        <div className="mb-4 flex w-full items-center gap-2">
          {tabIndex === 0 &&
            notifications.length > 0 &&
            !isNotificationsLoading && (
              <ConfirmationDialog
                className="w-full! p-0!"
                title={"Mark all as read"}
                content={
                  "Are you sure you want to mark all notifications as read?"
                }
                cancelText={"Cancel"}
                confirmText={"Mark all"}
                onConfirm={handleMarkAllAsRead}
                onCancel={() => {}}
              >
                <Button
                  size="small"
                  fullWidth
                  variant="outlined"
                  disabled={isAllMarking}
                  className="text-blue-800! m-0! p-1! text-xs!"
                >
                  {isAllMarking ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Mark all as read"
                  )}
                </Button>
              </ConfirmationDialog>
            )}
        </div>

        {isNotificationsLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <NotificationCardSkeleton key={index} />
            ))
          : notifications.map((notification, index) => (
              <div key={index} className="mb-2">
                <NotificationCard index={index} {...notification} />
              </div>
            ))}
        {notifications.length === 0 && !isNotificationsLoading && (
          <Typography
            variant="body2"
            className="text-gray-600! z-20! p-3 text-center! italic"
          >
            No notifications
          </Typography>
        )}
        <div className="mt-auto flex w-full items-end justify-center">
          {totalPages > 1 && notifications.length > 0 && (
            <Pagination
              page={page}
              onChange={(e, val) => {
                setPage(val);
              }}
              size="small"
              count={totalPages}
              variant="outlined"
              color="primary"
            />
          )}
        </div>
      </List>
    </Drawer>
  );
}
