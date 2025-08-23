import React from 'react';
import { Box, Typography } from '@mui/material';
import { Template, TemplateItem } from '@/shared/types/template';
import TemplateCard from './TemplateCard';

interface TemplateSectionProps {
  template: Template;
  onTemplateSelect: (template: TemplateItem) => void;
  icon?: string;
  title?: string;
}

const categoryIcons: Record<string, string> = {
  contact: '📞',
  about: '🏢',
  landing: '🚀',
  dashboard: '📊',
  auth: '🔐',
  ecommerce: '🛒',
  blog: '📝',
};

const categoryTitles: Record<string, string> = {
  contact: 'Contact Pages',
  about: 'About Us Pages',
  landing: 'Landing Pages',
  dashboard: 'Dashboards',
  auth: 'Authentication',
  ecommerce: 'E-commerce',
  blog: 'Blog & Content',
};

export default function TemplateSection({ 
  template, 
  onTemplateSelect, 
  icon, 
  title 
}: TemplateSectionProps) {
  const sectionIcon = icon || categoryIcons[template.manifest.category] || '📄';
  const sectionTitle = title || categoryTitles[template.manifest.category] || template.manifest.name;

  if (!template.manifest.templates || template.manifest.templates.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
        {sectionIcon} {sectionTitle}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {template.manifest.description}
      </Typography>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {template.manifest.templates.map((templateItem: TemplateItem) => (
          <TemplateCard
            key={templateItem.id}
            template={templateItem}
            onSelect={onTemplateSelect}
            category={template.manifest.category}
          />
        ))}
      </div>
    </Box>
  );
}