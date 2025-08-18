'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Chip } from '@mui/material';
import DrawerButton from './DrawerButton';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function DrawerButtonDemo() {
  const [basicDrawerOpen, setBasicDrawerOpen] = useState(false);
  const [customDrawerOpen, setCustomDrawerOpen] = useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  return (
    <Box className="space-y-3! mt-2! bg-none!">
      <Typography variant="h5" component="h5" className="text-xl!">
        Drawer Button Component
      </Typography>
      
      <div className="space-y-4">
        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Basic Drawer</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Simple drawer with title and basic content
          </Typography>
          <div className="flex items-center gap-2">
            <DrawerButton
              isOpen={basicDrawerOpen}
              setIsOpen={setBasicDrawerOpen}
              title="Basic Drawer"
              tooltip="Open basic drawer"
            >
              <Box className="p-4">
                <Typography variant="h6" className="mb-3">
                  Welcome to the Drawer!
                </Typography>
                <Typography variant="body2" className="text-gray-300 mb-4">
                  This is a basic drawer with a simple title and content.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText primary="Item 1" secondary="First item in the list" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Item 2" secondary="Second item in the list" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Item 3" secondary="Third item in the list" />
                  </ListItem>
                </List>
              </Box>
            </DrawerButton>
            <Typography variant="body2">Basic drawer with title</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Custom Icon & Width</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Drawer with custom settings icon and fixed width
          </Typography>
          <div className="flex items-center gap-2">
            <DrawerButton
              icon={<SettingsIcon />}
              isOpen={settingsDrawerOpen}
              setIsOpen={setSettingsDrawerOpen}
              title="Settings Panel"
              width="400px"
              tooltip="Open settings"
            >
              <Box className="p-4">
                <Typography variant="h6" className="mb-3">
                  Settings Panel
                </Typography>
                <div className="space-y-4">
                  <div>
                    <Typography variant="subtitle2" className="mb-2">
                      Preferences
                    </Typography>
                    <div className="flex flex-wrap gap-2">
                      <Chip label="Dark Mode" variant="outlined" />
                      <Chip label="Notifications" variant="outlined" />
                      <Chip label="Auto Save" variant="outlined" />
                    </div>
                  </div>
                  <div>
                    <Typography variant="subtitle2" className="mb-2">
                      Account Settings
                    </Typography>
                    <Typography variant="body2" className="text-gray-300">
                      Manage your account settings and preferences here.
                    </Typography>
                  </div>
                </div>
              </Box>
            </DrawerButton>
            <Typography variant="body2">Settings with 400px width</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Custom Header</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Drawer with custom header component and notification badge
          </Typography>
          <div className="flex items-center gap-2">
            <DrawerButton
              icon={<InfoIcon />}
              isOpen={customDrawerOpen}
              setIsOpen={setCustomDrawerOpen}
              tooltip="Open info panel"
              header={
                <Box className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <NotificationsIcon className="text-yellow-500" />
                    <Typography variant="h6">Information</Typography>
                    <Chip label="New" size="small" color="primary" />
                  </div>
                </Box>
              }
              onClose={() => console.log('Info drawer closed!')}
            >
              <Box className="p-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-900/20 rounded border-l-4 border-blue-500">
                    <Typography variant="subtitle2">System Status</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      All systems are operating normally.
                    </Typography>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded border-l-4 border-green-500">
                    <Typography variant="subtitle2">Last Update</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      System was updated 2 hours ago.
                    </Typography>
                  </div>
                  <div className="p-3 bg-yellow-900/20 rounded border-l-4 border-yellow-500">
                    <Typography variant="subtitle2">Maintenance</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      Scheduled maintenance tomorrow at 2 AM.
                    </Typography>
                  </div>
                </div>
              </Box>
            </DrawerButton>
            <Typography variant="body2">Custom header with badge</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Notifications Drawer</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Full-featured notification panel with custom styling
          </Typography>
          <div className="flex items-center gap-2">
            <DrawerButton
              icon={<NotificationsIcon />}
              isOpen={notificationDrawerOpen}
              setIsOpen={setNotificationDrawerOpen}
              title="Notifications"
              width="350px"
              tooltip="View notifications"
              onClose={() => console.log('Notifications closed')}
            >
              <Box className="p-4">
                <div className="space-y-3">
                  <div className="p-3 bg-red-900/20 rounded border-l-4 border-red-500">
                    <Typography variant="subtitle2">Error Alert</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      Failed to save document. Please try again.
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      2 minutes ago
                    </Typography>
                  </div>
                  <div className="p-3 bg-blue-900/20 rounded border-l-4 border-blue-500">
                    <Typography variant="subtitle2">New Message</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      You have received a new message from John Doe.
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      5 minutes ago
                    </Typography>
                  </div>
                  <div className="p-3 bg-green-900/20 rounded border-l-4 border-green-500">
                    <Typography variant="subtitle2">Task Completed</Typography>
                    <Typography variant="body2" className="text-gray-300">
                      Your backup has been completed successfully.
                    </Typography>
                    <Typography variant="caption" className="text-gray-400">
                      1 hour ago
                    </Typography>
                  </div>
                </div>
              </Box>
            </DrawerButton>
            <Typography variant="body2">Notification panel</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Usage Instructions</Typography>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Click any drawer button to open the corresponding drawer</li>
            <li>Drawers slide in from the right side of the screen</li>
            <li>On mobile devices, drawers automatically become full-width</li>
            <li>Use the close button in the header or click outside to close</li>
            <li>You can provide either a title or custom header content</li>
            <li>Custom icons and tooltips enhance user experience</li>
            <li>onClose callback is triggered when drawer closes</li>
          </ul>
        </Paper>
      </div>
    </Box>
  );
}