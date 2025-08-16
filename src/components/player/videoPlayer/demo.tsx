'use client';

import React from 'react';
import { Box, Typography, Paper, Divider, Tooltip } from '@mui/material';
import VideoPlayer from './VideoPlayer';
import { VideoPlayerProvider } from './VideoPlayerProvider';
import { formatSecondToTimer } from './VideoPlayer';

const sampleVideoUrl = "/video.mp4";

export default function VideoPlayerDemo() {
  return (
    <VideoPlayerProvider>
      <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Video Player Component
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A feature-rich video player component with custom controls, fullscreen support, and progress tracking.
        </Typography>

        {/* Basic Example */}
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Basic Usage
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Video player with default settings and custom controls
          </Typography>
          <VideoPlayer 
            url={sampleVideoUrl}
          />
        </Paper>

        <Divider sx={{ my: 3 }} />

        {/* With Callbacks Example */}
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            With Event Callbacks
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Video player with onReady and onEnded callbacks
          </Typography>
          <VideoPlayer 
            url={sampleVideoUrl}
            onReady={() => console.log('Video is ready')}
            onEnded={() => console.log('Video ended')}
          />
        </Paper>

        <Divider sx={{ my: 3 }} />

        {/* With Marks Example */}
        <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            With Timeline Marks
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Video player with custom timeline marks for important moments
          </Typography>
          <VideoPlayer 
            url={sampleVideoUrl}
            marks={[
              { 
                value: 3, 
                label: (
                  <Tooltip
                    title={
                      <div>
                        <p>Comment 1</p>
                        <p>{formatSecondToTimer(3)}</p>
                      </div>
                    }
                    placement="bottom"
                  >
                    <div className="w-3 h-3 bg-blue-500 rounded-full cursor-pointer hover:bg-blue-400 transition-colors" />
                  </Tooltip>
                )
              },
              { 
                value: 5, 
                label: (
                  <Tooltip
                    title={
                      <div>
                        <p>Comment 2</p>
                        <p>{formatSecondToTimer(5)}</p>
                      </div>
                    }
                    placement="bottom"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:bg-green-400 transition-colors" />
                  </Tooltip>
                )
              },
              { 
                value: 8, 
                label: (
                  <Tooltip
                    title={
                      <div>
                        <p>Comment 3</p>
                        <p>{formatSecondToTimer(8)}</p>
                      </div>
                    }
                    placement="bottom"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors" />
                  </Tooltip>
                )
              }
            ]}
          />
        </Paper>
      </Box>
    </VideoPlayerProvider>
  );
}