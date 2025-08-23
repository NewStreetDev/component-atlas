'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Template, TemplateItem } from '@/shared/types/template';
import TemplateSection from '@/shared/components/templates/TemplateSection';
import TemplateDialog from '@/shared/components/templates/TemplateDialog';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTemplates = async (): Promise<void> => {
      try {
        const response = await fetch('/api/templates');
        const data: Template[] = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateSelect = (template: TemplateItem, category?: string): void => {
    setSelectedTemplate(template);
    // Find the category from templates if not provided
    if (!category) {
      const templateGroup = templates.find((t: Template) => 
        t.manifest.templates?.some((item: TemplateItem) => item.id === template.id)
      );
      setSelectedCategory(templateGroup?.manifest.category || '');
    } else {
      setSelectedCategory(category);
    }
  };

  const handleDialogClose = (): void => {
    setSelectedTemplate(null);
    setSelectedCategory('');
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading templates...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Page Templates
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Complete designs ready to use in your projects
        </Typography>
      </Box>

      {/* Render all template categories dynamically */}
      {templates.map((template: Template) => (
        <TemplateSection
          key={template.id}
          template={template}
          onTemplateSelect={handleTemplateSelect}
        />
      ))}

      {/* Template Dialog */}
      <TemplateDialog
        open={!!selectedTemplate}
        onClose={handleDialogClose}
        template={selectedTemplate}
        category={selectedCategory}
      />
    </Container>
  );
}