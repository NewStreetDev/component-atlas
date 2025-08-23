import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Slide,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import { Code, Visibility, Close, ArrowBack } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { TemplateItem, TemplateFile } from '@/shared/types/template';
import { useTemplateLoader } from '@/shared/utils/templateLoader';
import CodeRenderer from '@/shared/components/CodeRenderer';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface TemplateDialogProps {
  open: boolean;
  onClose: () => void;
  template: TemplateItem | null;
  category: string;
}

export default function TemplateDialog({ open, onClose, template, category }: TemplateDialogProps) {
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [templateCode, setTemplateCode] = useState<string>('');
  const [codeLoading, setCodeLoading] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Load template component dynamically
  const { component: TemplateComponent, loading: componentLoading, error: componentError } = useTemplateLoader(
    category,
    template?.file || ''
  );

  // Load template code when template changes
  useEffect(() => {
    if (!template || !open) return;

    const fetchTemplateCode = async (): Promise<void> => {
      setCodeLoading(true);
      try {
        const response = await fetch(`/api/templates/${category}?templateId=${template.id}`);
        const files: TemplateFile[] = await response.json();
        if (files.length > 0) {
          setTemplateCode(files[0].content);
        }
      } catch (error) {
        console.error('Error fetching template code:', error);
      } finally {
        setCodeLoading(false);
      }
    };

    if (viewMode === 'code') {
      fetchTemplateCode();
    }
  }, [template, category, viewMode, open]);

  const handleClose = (): void => {
    onClose();
    setViewMode('preview');
    setTemplateCode('');
  };

  const handleViewModeChange = (mode: 'preview' | 'code'): void => {
    setViewMode(mode);
  };

  const renderTemplatePreview = (): React.ReactNode => {
    if (!template) return null;

    if (componentLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (componentError) {
      return (
        <Box sx={{ p: 4 }}>
          <Alert severity="error">
            Error loading template: {componentError}
          </Alert>
        </Box>
      );
    }

    if (!TemplateComponent) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Vista previa no disponible</Typography>
        </Box>
      );
    }

    return <TemplateComponent />;
  };

  const renderCodeView = (): React.ReactNode => {
    if (!template) return null;

    if (codeLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (!templateCode) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography>Código no disponible</Typography>
        </Box>
      );
    }

    return (
      <CodeRenderer
        files={[{
          name: template.file,
          content: templateCode,
          language: 'typescript',
          path: `templates/${category}/${template.file}`
        }]}
        showPath={true}
        initialTheme="dark"
      />
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      maxWidth="xl"
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{
        '& .MuiDialog-paper': {
          height: fullScreen ? '100vh' : '90vh',
          width: fullScreen ? '100vw' : '95vw',
          maxWidth: 'none',
          m: fullScreen ? 0 : 2
        }
      }}
    >
      <AppBar sx={{ position: 'relative', bgcolor: '#1976d2' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" component="div">
              {template?.name}
            </Typography>
          </Box>
          
          <Box>
            <Button
              color="inherit"
              startIcon={<Visibility />}
              variant={viewMode === 'preview' ? 'contained' : 'text'}
              onClick={() => handleViewModeChange('preview')}
              sx={{ 
                mr: 1,
                bgcolor: viewMode === 'preview' ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              Vista Previa
            </Button>
            <Button
              color="inherit"
              startIcon={<Code />}
              variant={viewMode === 'code' ? 'contained' : 'text'}
              onClick={() => handleViewModeChange('code')}
              sx={{ 
                mr: 2,
                bgcolor: viewMode === 'code' ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              Código
            </Button>
            <IconButton color="inherit" onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <DialogContent sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          {viewMode === 'preview' ? renderTemplatePreview() : renderCodeView()}
        </Box>
      </DialogContent>
    </Dialog>
  );
}