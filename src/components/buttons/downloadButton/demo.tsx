'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import DownloadButton from './DownloadButton';

export default function DownloadButtonDemo() {
  // Create sample blob for demo
  const createSampleFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    return window.URL.createObjectURL(blob);
  };

  const sampleTextContent = `This is a sample text file created for demonstration purposes.
It contains multiple lines of text to show the download functionality.
You can download this file to test the DownloadButton component.

Features demonstrated:
- File download with progress tracking
- Pause and resume functionality
- Cancel download option
- State management during download process

This file is generated dynamically using Blob API for demo purposes.`;

  const sampleBlobUrl = createSampleFile(sampleTextContent, 'sample.txt');

  return (
    <Box className="space-y-3! mt-2! bg-none!">
      <Typography variant="h5" component="h5" className="text-xl!">
        Download Button Component
      </Typography>
      
      <div className="space-y-4">
        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Sample Text File Download</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Download a sample text file to test the download functionality
          </Typography>
          <div className="flex items-center gap-2">
            <DownloadButton
              url={sampleBlobUrl}
              name="sample-text-file.txt"
              tooltip="Download sample text file"
            />
            <Typography variant="body2">sample-text-file.txt</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>External File Download</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Example with external URL (requires API endpoint)
          </Typography>
          <div className="flex items-center gap-2">
            <DownloadButton
              url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
              name="sample-document.pdf"
              tooltip="Download PDF document"
            />
            <Typography variant="body2">sample-document.pdf</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Large File Example</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Simulates downloading a larger file to demonstrate progress tracking
          </Typography>
          <div className="flex items-center gap-2">
            <DownloadButton
              url="https://file-examples.com/storage/fec1abbed26b71a5ea0bc3c/2017/04/file_example_MP4_1920_18MG.mp4"
              name="sample-video.mp4"
              tooltip="Download large video file"
            />
            <Typography variant="body2">sample-video.mp4 (~18MB)</Typography>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Multiple Downloads</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            Multiple download buttons to test concurrent downloads
          </Typography>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <DownloadButton
                url={createSampleFile('File 1 content', 'file1.txt')}
                name="file-1.txt"
                tooltip="Download file 1"
              />
              <Typography variant="body2">file-1.txt</Typography>
            </div>
            <div className="flex items-center gap-2">
              <DownloadButton
                url={createSampleFile('File 2 content', 'file2.txt')}
                name="file-2.txt"
                tooltip="Download file 2"
              />
              <Typography variant="body2">file-2.txt</Typography>
            </div>
            <div className="flex items-center gap-2">
              <DownloadButton
                url={createSampleFile('File 3 content', 'file3.txt')}
                name="file-3.txt"
                tooltip="Download file 3"
              />
              <Typography variant="body2">file-3.txt</Typography>
            </div>
          </div>
        </Paper>

        <Paper className="p-4 space-y-2!">
          <Typography variant="h6" className='text-base!'>Usage Instructions</Typography>
          <Typography variant="body2" color="text.secondary" className='text-xs!'>
            • Click the download icon to start downloading
            • Use the pause button to temporarily stop the download
            • Use the play button to resume a paused download
            • Use the stop button to cancel the download
            • Progress is shown as a percentage in the circular indicator
            • Hover over buttons to see detailed progress information
          </Typography>
        </Paper>
      </div>
    </Box>
  );
}