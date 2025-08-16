'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Paper,
} from '@mui/material';
import {
  Code as CodeIcon,
  Category as CategoryIcon,
  PlayArrow as PlayIcon,
} from '@mui/icons-material';
import { CatalogComponent } from '@/shared/types/component';
import { cn } from '@/shared/utils/cn';

interface ComponentCardProps {
  component: CatalogComponent;
  onShowCode: (component: CatalogComponent) => void;
}

export default function ComponentCard({
  component,
  onShowCode,
}: ComponentCardProps) {
  const { manifest } = component;
  const [DemoComponent, setDemoComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const loadDemo = async () => {
    if (DemoComponent || loading) return;
    
    setLoading(true);
    try {
      const demoModule = await import(`@/components/${component.relativePath}/demo.tsx`);
      setDemoComponent(() => demoModule.default);
    } catch (error) {
      console.warn(`Failed to load demo for ${component.relativePath}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowDemo = () => {
    setShowDemo(true);
    loadDemo();
  };

  return (
    <Card elevation={0} className="flex flex-col border border-gray-200">
      <CardContent className="flex-1">
        <Box className="flex items-start justify-between mb-3">
          <Typography variant="h6" component="h3" className="font-semibold">
            {manifest.name}
          </Typography>
          <Chip
            icon={<CategoryIcon />}
            label={manifest.category}
            size="small"
            variant="outlined"
            className="ml-2"
          />
        </Box>

        {manifest.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            className="mb-3!"
          >
            {manifest.description}
          </Typography>
        )}

        {manifest.tags && manifest.tags.length > 0 && (
          <Box className="flex flex-wrap gap-1 mb-4">
            {manifest.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                className="text-xs"
              />
            ))}
          </Box>
        )}

        <Paper
          variant="outlined"
          className={cn(
            "p-4 min-h-[200px]",
            "bg-gradient-to-br from-gray-50 to-gray-100",
          )}
        >
          <Typography
            variant="caption"
            className="block mb-2 text-gray-600"
          >
            Live Preview
          </Typography>
          
          <Box className="relative">
            {!showDemo ? (
              <Box className="flex flex-col items-center justify-center h-32 gap-2">
                <Button
                  variant="outlined"
                  startIcon={<PlayIcon />}
                  onClick={handleShowDemo}
                  size="small"
                >
                  Load Preview
                </Button>
                <Typography variant="caption" color="text.secondary">
                  Click to see component in action
                </Typography>
              </Box>
            ) : loading ? (
              <Box className="flex items-center justify-center h-32">
                <Typography variant="body2" color="text.secondary">
                  Loading component...
                </Typography>
              </Box>
            ) : DemoComponent ? (
              <React.Suspense
                fallback={
                  <Box className="flex items-center justify-center h-32">
                    <Typography variant="body2" color="text.secondary">
                      Loading component...
                    </Typography>
                  </Box>
                }
              >
                <DemoComponent />
              </React.Suspense>
            ) : (
              <Box className="flex items-center justify-center h-32">
                <Typography variant="body2" color="text.secondary">
                  No preview available
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </CardContent>

      <CardActions className="justify-between">
        <Box className="flex items-center gap-1">
          <Typography variant="caption" color="text.secondary">
            {manifest.files.length} file{manifest.files.length !== 1 ? 's' : ''}
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<CodeIcon />}
          onClick={() => onShowCode(component)}
          size="small"
        >
          Show Code
        </Button>
      </CardActions>
    </Card>
  );
}