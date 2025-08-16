'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
  Box,
  IconButton,
  Typography,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Close as CloseIcon,
  ContentCopy as CopyIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CodeViewerFile } from '@/shared/types/component';
import { cn } from '@/shared/utils/cn';

interface CodeViewerProps {
  open: boolean;
  onClose: () => void;
  files: CodeViewerFile[];
  componentName: string;
  loading?: boolean;
}

export default function CodeViewer({
  open,
  onClose,
  files,
  componentName,
  loading = false,
}: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [codeTheme, setCodeTheme] = useState<'light' | 'dark'>('dark');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleCloseCopyAlert = () => {
    setCopySuccess(false);
  };

  const toggleCodeTheme = () => {
    setCodeTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        fullScreen={fullScreen}
        PaperProps={{
          sx: {
            height: fullScreen ? '100%' : '80vh',
            maxHeight: fullScreen ? '100%' : '80vh',
          },
        }}
      >
        <DialogTitle className="flex items-center justify-between">
          <Typography variant="h6">
            {componentName} - Source Code
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="p-0">
          {loading ? (
            <Box className="flex items-center justify-center h-64">
              <Typography>Loading files...</Typography>
            </Box>
          ) : files.length === 0 ? (
            <Box className="flex items-center justify-center h-64">
              <Typography color="text.secondary">
                No files available
              </Typography>
            </Box>
          ) : (
            <Box className="h-full flex flex-col">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                className="border-b"
              >
                {files.map((file, index) => (
                  <Tab
                    key={file.name}
                    label={
                      <Box className="flex items-center gap-1">
                        <span>{file.name}</span>
                        {file.name === 'README.mdx' && (
                          <Typography
                            variant="caption"
                            className="bg-blue-100 text-blue-800 px-1 rounded text-xs"
                          >
                            Docs
                          </Typography>
                        )}
                      </Box>
                    }
                  />
                ))}
              </Tabs>

              {files[activeTab] && (
                <Box className="flex-1 relative">
                  <Box className="absolute top-2 right-2 z-10 flex gap-1">
                    <IconButton
                      onClick={toggleCodeTheme}
                      size="small"
                      className={cn(
                        "backdrop-blur-sm transition-colors",
                        codeTheme === 'dark' 
                          ? "bg-white/10! hover:bg-white/20! text-white!" 
                          : "bg-black/10! hover:bg-black/20! text-gray-700!"
                      )}
                      title={`Switch to ${codeTheme === 'dark' ? 'light' : 'dark'} theme`}
                    >
                      {codeTheme === 'dark' ? (
                        <LightModeIcon fontSize="small" />
                      ) : (
                        <DarkModeIcon fontSize="small" />
                      )}
                    </IconButton>
                    <IconButton
                      onClick={() => handleCopy(files[activeTab].content)}
                      size="small"
                      className={cn(
                        "backdrop-blur-sm transition-colors",
                        codeTheme === 'dark' 
                          ? "bg-white/10! hover:bg-white/20! text-white!" 
                          : "bg-black/10! hover:bg-black/20! text-gray-700!"
                      )}
                      title="Copy code"
                    >
                      <CopyIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box className="absolute top-2 left-2 z-10">
                    <Typography
                      variant="caption"
                      className={cn(
                        "backdrop-blur-sm px-2 py-1 rounded text-xs transition-colors",
                        codeTheme === 'dark' 
                          ? "bg-white/10 text-white" 
                          : "bg-black/10 text-gray-700"
                      )}
                    >
                      {files[activeTab].path}
                    </Typography>
                  </Box>

                  <SyntaxHighlighter
                    language={files[activeTab].language}
                    style={codeTheme === 'dark' ? vscDarkPlus : vs}
                    showLineNumbers
                    wrapLines
                    customStyle={{
                      margin: 0,
                      height: '100%',
                      paddingTop: '3rem',
                      fontSize: '14px',
                    }}
                  >
                    {files[activeTab].content}
                  </SyntaxHighlighter>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={handleCloseCopyAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseCopyAlert}
          severity="success"
          variant="filled"
        >
          Code copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}