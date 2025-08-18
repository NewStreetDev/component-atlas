'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import LogoutIcon from '@mui/icons-material/Logout';
import WarningIcon from '@mui/icons-material/Warning';

export default function ConfirmationDialogDemo() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [actionResult, setActionResult] = useState<string>('');

  const handleDeleteConfirm = () => {
    setActionResult('Item deleted successfully!');
    setDeleteDialogOpen(false);
  };

  const handleSaveConfirm = () => {
    setActionResult('Document saved successfully!');
    setSaveDialogOpen(false);
  };

  const handleLogoutConfirm = () => {
    setActionResult('Logged out successfully!');
    setLogoutDialogOpen(false);
  };

  const handleCustomConfirm = () => {
    setActionResult('Custom action completed!');
    setCustomDialogOpen(false);
  };

  const handleCancel = (action: string) => {
    setActionResult(`${action} cancelled`);
  };

  return (
    <Box className="space-y-3! mt-2! bg-none!">
      <Typography variant="h5" component="h5" className="text-xl!">
        Confirmation Dialog Component
      </Typography>
      
      <div className="space-y-4">
        {/* Action Result Display */}
        {actionResult && (
          <Paper className="p-3 bg-green-900/20 border border-green-700">
            <Typography variant="body2" className="text-green-300">
              Result: {actionResult}
            </Typography>
          </Paper>
        )}

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Delete Action (Negative)</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Confirmation dialog for destructive actions with red styling
          </Typography>
          <div className="flex items-center gap-2">
            <ConfirmationDialog
              title="Delete Item"
              content="Are you sure you want to delete this item? This action cannot be undone."
              confirmText="Delete"
              cancelText="Cancel"
              isPositiveAction={false}
              isOpen={deleteDialogOpen}
              onConfirm={handleDeleteConfirm}
              onCancel={() => {
                handleCancel('Delete');
                setDeleteDialogOpen(false);
              }}
            >
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Item
              </Button>
            </ConfirmationDialog>
            <Typography variant="body2">Destructive action with red theme</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Save Action (Positive)</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Confirmation dialog for positive actions with blue/accent styling
          </Typography>
          <div className="flex items-center gap-2">
            <ConfirmationDialog
              title="Save Document"
              content="Do you want to save your changes? All unsaved changes will be preserved."
              confirmText="Save"
              cancelText="Don't Save"
              isPositiveAction={true}
              isOpen={saveDialogOpen}
              onConfirm={handleSaveConfirm}
              onCancel={() => {
                handleCancel('Save');
                setSaveDialogOpen(false);
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={() => setSaveDialogOpen(true)}
              >
                Save Document
              </Button>
            </ConfirmationDialog>
            <Typography variant="body2">Positive action with blue theme</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Logout Action</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Neutral confirmation dialog for logout action
          </Typography>
          <div className="flex items-center gap-2">
            <ConfirmationDialog
              title="Confirm Logout"
              content="Are you sure you want to log out? You will need to sign in again to access your account."
              confirmText="Logout"
              cancelText="Stay Logged In"
              isPositiveAction={false}
              isOpen={logoutDialogOpen}
              onConfirm={handleLogoutConfirm}
              onCancel={() => {
                handleCancel('Logout');
                setLogoutDialogOpen(false);
              }}
            >
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
                onClick={() => setLogoutDialogOpen(true)}
              >
                Logout
              </Button>
            </ConfirmationDialog>
            <Typography variant="body2">Session management action</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Custom Trigger Element</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Using different elements as triggers with the &apos;as&apos; prop
          </Typography>
          <div className="flex items-center gap-2">
            <ConfirmationDialog
              title="Warning"
              content="This action requires confirmation. Please review before proceeding."
              confirmText="Proceed"
              cancelText="Cancel"
              isPositiveAction={true}
              isOpen={customDialogOpen}
              onConfirm={handleCustomConfirm}
              onCancel={() => {
                handleCancel('Custom action');
                setCustomDialogOpen(false);
              }}
              as="div"
              className="cursor-pointer"
            >
              <Chip
                icon={<WarningIcon />}
                label="Click me for confirmation"
                variant="outlined"
                color="warning"
                onClick={() => setCustomDialogOpen(true)}
                className="cursor-pointer"
              />
            </ConfirmationDialog>
            <Typography variant="body2">Custom element as trigger</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Auto-trigger Dialog</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Dialog controlled externally without click trigger
          </Typography>
          <div className="flex items-center gap-4">
            <Button
              variant="contained"
              onClick={() => setCustomDialogOpen(true)}
            >
              Open External Dialog
            </Button>
            <ConfirmationDialog
              title="External Control"
              content="This dialog is controlled externally using the isOpen prop."
              confirmText="Confirm"
              cancelText="Cancel"
              isPositiveAction={true}
              isOpen={customDialogOpen}
              onConfirm={handleCustomConfirm}
              onCancel={() => {
                handleCancel('External dialog');
                setCustomDialogOpen(false);
              }}
            >
              <span></span>
            </ConfirmationDialog>
            <Typography variant="body2">Externally controlled dialog</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Component Features</Typography>
          <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
            <li>Supports positive and negative action styling themes</li>
            <li>Flexible trigger elements using the &apos;as&apos; prop</li>
            <li>External control via isOpen prop for programmatic usage</li>
            <li>Customizable title, content, and button text</li>
            <li>Built-in accessibility with proper ARIA labels</li>
            <li>Responsive design with centered content layout</li>
            <li>Visual blur effects for enhanced UI appeal</li>
            <li>Event propagation control to prevent unwanted triggers</li>
          </ul>
        </Paper>
      </div>
    </Box>
  );
}