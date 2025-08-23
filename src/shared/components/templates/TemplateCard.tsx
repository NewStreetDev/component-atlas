import React from 'react';
import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { TemplateItem } from '@/shared/types/template';

interface TemplateCardProps {
  template: TemplateItem;
  onSelect: (template: TemplateItem) => void;
  category?: string;
}

export default function TemplateCard({ template, onSelect, category }: TemplateCardProps) {
  const handleClick = (): void => {
    onSelect(template);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
        }
      }}
      onClick={handleClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          {template.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
          {template.description}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          {template.preview}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip 
            label="React + MUI" 
            size="small" 
            sx={{ bgcolor: '#e3f2fd', color: '#1976d2' }} 
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            sx={{ ml: 1 }}
          >
            Ver
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}