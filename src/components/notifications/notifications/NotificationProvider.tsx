"use client";
// DEMO MODE: Commented out real API imports
// import { createSupabaseClientFrontend } from "../services/supabase/supabaseClient";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

// import axios from "axios";

//CONTEXT
// import { useSystemLayout } from "./SystemLayoutProvider";

// import { apiRequest } from "../utils/request/apiRequest";

import { Notification } from "./Notifications";
import { notifyError, notifyInformation, notifySuccess } from "@/shared/utils/toastNotify";

interface NotificationContextType {
  openNotificationDrawer: boolean;
  setOpenNotificationDrawer: Dispatch<SetStateAction<boolean>>;
  notifications: Notification[];
  setNotifications: Dispatch<SetStateAction<Notification[]>>;
  isNotificationsLoading: boolean;
  setIsNotificationsLoading: Dispatch<SetStateAction<boolean>>;
  tabIndex: number;
  setTabIndex: Dispatch<SetStateAction<number>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  getNotifications: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  deleteAllNotification: () => Promise<void>;
  markAsReadNotification: (id: string) => Promise<void>;
  markAllAsReadNotification: () => Promise<void>;
  unreadNum: number;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};

// DEMO MODE: Mock data for notifications
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    notificationId: "1",
    userId: "demo-user",
    title: "Welcome to Component Atlas",
    message: "Your account has been successfully created. Start exploring components!",
    objectType: "Projects",
    isRead: false,
    createdDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    notificationId: "2", 
    userId: "demo-user",
    title: "New Component Added",
    message: "A new DrawerButton component has been added to the library.",
    objectType: "Projects",
    isRead: false,
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    notificationId: "3",
    userId: "demo-user", 
    title: "System Update",
    message: "The component atlas has been updated with new features and improvements.",
    objectType: "Projects",
    isRead: true,
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    notificationId: "4",
    userId: "demo-user",
    title: "Documentation Updated",
    message: "Component documentation has been enhanced with new examples.",
    objectType: "Projects", 
    isRead: true,
    createdDate: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    notificationId: "5",
    userId: "demo-user",
    title: "Maintenance Scheduled",
    message: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
    objectType: "Projects",
    isRead: false,
    createdDate: new Date(Date.now() - 1000 * 60 * 10).toISOString(), // 10 minutes ago
  }
];

function NotificationProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // DEMO MODE: Mock user data
  // const { currentUserData } = useSystemLayout();
  const currentUserData = { userId: "demo-user" };
  
  const [jwt, setJwt] = useState<string | null>("demo-jwt");
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const [unreadNum, setUnreadNum] = useState(0);
  // 0 - Unread, 1 - Read
  const [tabIndex, setTabIndex] = useState(0);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ROWS_PER_PAGE = 6;

  // DEMO MODE: Initialize with mock data
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const getNotifications = async () => {
    try {
      setIsNotificationsLoading(true);
      
      // DEMO MODE: Simulate API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      
      const filteredNotifications = MOCK_NOTIFICATIONS.filter(notification => 
        Boolean(tabIndex) === Boolean(notification.isRead)
      );
      
      // Simulate pagination
      const startIndex = (page - 1) * ROWS_PER_PAGE;
      const endIndex = startIndex + ROWS_PER_PAGE;
      const paginatedNotifications = filteredNotifications.slice(startIndex, endIndex);
      const calculatedTotalPages = Math.ceil(filteredNotifications.length / ROWS_PER_PAGE);
      
      setNotifications(paginatedNotifications);
      setTotalPages(calculatedTotalPages);
      
      console.log('[DEMO] Notifications loaded:', paginatedNotifications);
    } catch (error) {
      console.error('[DEMO] Failed to load notifications:', error);
      notifyError("Failed to load notifications");
    } finally {
      setIsNotificationsLoading(false);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      // DEMO MODE: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update local state to remove notification
      setNotifications(prev => prev.filter(notification => notification.notificationId !== id));
      
      console.log('[DEMO] Notification deleted:', id);
      notifySuccess("Notification deleted successfully");
    } catch (error) {
      notifyError("Failed to delete notification");
      throw error;
    }
  };

  const markAsReadNotification = async (id: string) => {
    try {
      // DEMO MODE: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update local state to mark as read
      setNotifications(prev => prev.map(notification => 
        notification.notificationId === id 
          ? { ...notification, isRead: true }
          : notification
      ));
      
      console.log('[DEMO] Notification marked as read:', id);
      notifySuccess("Notification marked as read successfully");
    } catch (error) {
      console.error('[DEMO] Failed to mark notification as read:', error);
      notifyError("Failed to mark notification as read");
    }
  };

  const deleteAllNotification = async () => {
    try {
      // DEMO MODE: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Clear all notifications based on current tab filter
      const isReadTab = Boolean(tabIndex);
      setNotifications(prev => prev.filter(notification => 
        Boolean(notification.isRead) !== isReadTab
      ));
      
      console.log('[DEMO] All notifications deleted for tab:', tabIndex);
      notifySuccess("All notifications deleted successfully");
    } catch (error) {
      console.error('[DEMO] Failed to delete all notifications:', error);
      notifyError("Failed to delete all notifications");
    }
  };

  const markAllAsReadNotification = async () => {
    try {
      // DEMO MODE: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mark all unread notifications as read
      setNotifications(prev => prev.map(notification => 
        !notification.isRead 
          ? { ...notification, isRead: true }
          : notification
      ));
      
      console.log('[DEMO] All notifications marked as read');
      notifySuccess("All notifications marked as read successfully");
    } catch (error) {
      console.error('[DEMO] Failed to mark all notifications as read:', error);
      notifyError("Failed to mark all notifications as read");
    }
  };

  useEffect(() => {
    if (tabIndex === 0 && !isNotificationsLoading) {
      setUnreadNum(notifications.filter((n) => !n?.isRead)?.length || 0);
    }
  }, [notifications, tabIndex, isNotificationsLoading]);

  useEffect(() => {
    getNotifications();
  }, [tabIndex, page]); // Added dependencies for demo functionality

  // DEMO MODE: Comment out JWT fetching
  // useEffect(() => {
  //   const fetchJwt = async () => {
  //     try {
  //       const res = await axios.get("/api/cookieAuth");
  //       setJwt(res.data?.jwt || null);
  //     } catch (error) {
  //       console.error("Failed to fetch JWT:", error);
  //     }
  //   };

  //   fetchJwt();
  // }, []);

  // DEMO MODE: Simulate real-time notifications
  useEffect(() => {
    if (!jwt || !currentUserData?.userId) return;

    // Simulate receiving a new notification every 30 seconds
    const simulateNewNotification = () => {
      const demoNotifications = [
        {
          notificationId: `demo-${Date.now()}`,
          userId: "demo-user",
          title: "Demo Notification",
          message: "This is a simulated real-time notification for demo purposes.",
          objectType: "Projects" as const,
          isRead: false,
          createdDate: new Date().toISOString(),
        },
        {
          notificationId: `demo-${Date.now()}-2`,
          userId: "demo-user", 
          title: "Component Update",
          message: "A component has been updated in the demo environment.",
          objectType: "Projects" as const,
          isRead: false,
          createdDate: new Date().toISOString(),
        }
      ];

      const randomNotification = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
      
      console.log('[DEMO] Simulating new notification:', randomNotification);
      
      const isUnreadTab = tabIndex === 0;
      notifyInformation(randomNotification.message, {
        onClick: () => {
          setTabIndex(0);
          setOpenNotificationDrawer(true);
        },
      });
      
      if (!randomNotification.isRead) {
        setUnreadNum((prev) => prev + 1);
      }
      
      if (isUnreadTab && !randomNotification.isRead) {
        setNotifications((prev) => [randomNotification, ...prev]);
      }
    };

    // Set up interval for demo notifications (every 30 seconds)
    const interval = setInterval(simulateNewNotification, 30000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, [jwt, currentUserData?.userId, setNotifications, tabIndex]);

  return (
    <NotificationContext.Provider
      value={{
        openNotificationDrawer,
        setOpenNotificationDrawer,
        notifications,
        setNotifications,
        isNotificationsLoading,
        setIsNotificationsLoading,
        tabIndex,
        setTabIndex,
        page,
        setPage,
        totalPages,
        setTotalPages,
        getNotifications,
        deleteNotification,
        deleteAllNotification,
        markAsReadNotification,
        markAllAsReadNotification,
        unreadNum,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
