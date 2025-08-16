'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AudioPlayer from './AudioPlayer';
import { AudioPlayerProvider } from './AudioPlayerProvider';

const sampleAudioUrl = "/sample.mp3";

export default function AudioPlayerDemo() {
  return (
    <AudioPlayerProvider>
    <Box sx={{ p: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Audio Player Component
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A customizable audio player component with modern controls and Material-UI styling.
      </Typography>

      {/* Basic Example */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Simple audio player with default settings
        </Typography>
        <AudioPlayer 
          url={sampleAudioUrl}
          title="Sample Audio Track"
        />
      </Paper>
    </Box>
    </AudioPlayerProvider>
  );
}