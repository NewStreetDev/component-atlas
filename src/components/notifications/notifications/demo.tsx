'use client';

import React from 'react';
import { Box, Typography, Paper, Button, Badge, IconButton } from '@mui/material';
import NotificationProvider, { useNotification } from './NotificationProvider';
import NotificationDrawer from './NotificationDrawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// Demo component that uses the notification system
function NotificationDemo() {
  const {
    openNotificationDrawer,
    setOpenNotificationDrawer,
    notifications,
    unreadNum,
    deleteAllNotification,
    markAllAsReadNotification,
    tabIndex
  } = useNotification();

  const toggleDrawer = () => {
    setOpenNotificationDrawer(!openNotificationDrawer);
  };

  return (
    <Box className="space-y-3! mt-2! bg-none!">
      <Typography variant="h5" component="h5" className="text-xl!">
        Notification System Component
      </Typography>
      
      <div className="space-y-4">
        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Notification Controls</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Main notification interface with drawer toggle and controls
          </Typography>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Badge badgeContent={unreadNum} color="error">
                <IconButton
                  onClick={toggleDrawer}
                  color="primary"
                  size="large"
                >
                  <NotificationsIcon />
                </IconButton>
              </Badge>
              <Typography variant="body2">
                Notification Bell ({unreadNum} unread)
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Bulk Actions</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Manage all notifications with bulk operations
          </Typography>
          <div className="flex items-center gap-2">
            <Button
              variant="contained"
              startIcon={<DoneAllIcon />}
              onClick={markAllAsReadNotification}
              size="small"
              color="primary"
            >
              Mark All Read
            </Button>
            <Button
              variant="contained"
              startIcon={<ClearAllIcon />}
              onClick={deleteAllNotification}
              size="small"
              color="error"
            >
              Delete All
            </Button>
            <Typography variant="body2">
              Current tab: {tabIndex === 0 ? 'Unread' : 'Read'} notifications
            </Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Notification Stats</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Current notification statistics and state information
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-900/20 p-3 rounded">
              <Typography variant="h6" className="text-blue-400">
                {notifications.length}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Current Tab
              </Typography>
            </div>
            <div className="bg-red-900/20 p-3 rounded">
              <Typography variant="h6" className="text-red-400">
                {unreadNum}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Unread
              </Typography>
            </div>
            <div className="bg-green-900/20 p-3 rounded">
              <Typography variant="h6" className="text-green-400">
                {tabIndex === 0 ? 'Unread' : 'Read'}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Current Tab
              </Typography>
            </div>
            <div className="bg-purple-900/20 p-3 rounded">
              <Typography variant="h6" className="text-purple-400">
                {openNotificationDrawer ? 'Open' : 'Closed'}
              </Typography>
              <Typography variant="body2" className="text-gray-300">
                Drawer State
              </Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Demo Features</Typography>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Real-time notification simulation (every 30 seconds)</li>
            <li>Complete CRUD operations (Create, Read, Update, Delete)</li>
            <li>Filtering between read and unread notifications</li>
            <li>Pagination support for large notification lists</li>
            <li>Toast notifications for user feedback</li>
            <li>Responsive drawer interface for mobile and desktop</li>
            <li>Badge counter showing unread notification count</li>
            <li>Bulk operations for marking read and deleting</li>
            <li>Skeleton loading states during operations</li>
            <li>Context provider for global state management</li>
          </ul>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Usage Instructions</Typography>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Click the notification bell to open the drawer</li>
            <li>Use tabs to switch between unread and read notifications</li>
            <li>Click individual notification actions to mark read or delete</li>
            <li>Use bulk actions to manage multiple notifications</li>
            <li>New notifications appear automatically every 30 seconds</li>
            <li>Toast messages provide feedback for all actions</li>
            <li>Drawer is responsive and adapts to screen size</li>
            <li>All operations are simulated for demo purposes</li>
          </ul>
        </Paper>
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer
        open={openNotificationDrawer}
        toggleOpen={toggleDrawer}
      />
    </Box>
  );
}

// Main demo component wrapped with provider
export default function NotificationSystemDemo() {
  return (
    <NotificationProvider>
      <NotificationDemo />
    </NotificationProvider>
  );
}