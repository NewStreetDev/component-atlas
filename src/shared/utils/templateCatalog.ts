import path from 'path';
import fs from 'fs/promises';
import { Template, TemplateFile } from '@/shared/types/template';

const TEMPLATES_BASE_PATH = path.join(process.cwd(), 'src', 'components', 'templates');

export async function getAllTemplates(): Promise<Template[]> {
  try {
    const templates: Template[] = [];
    
    // Read all categories
    const categories = await fs.readdir(TEMPLATES_BASE_PATH);
    
    for (const category of categories) {
      const categoryPath = path.join(TEMPLATES_BASE_PATH, category);
      const stat = await fs.stat(categoryPath);
      
      if (!stat.isDirectory()) continue;
      
      try {
        // Read template manifest
        const manifestPath = path.join(categoryPath, 'template.manifest.json');
        const manifestContent = await fs.readFile(manifestPath, 'utf-8');
        const manifest = JSON.parse(manifestContent);
        
        templates.push({
          id: `template-${category}`,
          manifest,
          relativePath: category,
        });
      } catch (error) {
        console.warn(`Failed to load template ${category}:`, error);
      }
    }
    
    return templates;
  } catch (error) {
    console.error('Failed to load templates:', error);
    return [];
  }
}

export async function getTemplateFiles(relativePath: string, templateId?: string): Promise<TemplateFile[]> {
  try {
    // Security: Validate path is within templates directory
    const normalizedPath = path.normalize(relativePath);
    if (normalizedPath.includes('..') || path.isAbsolute(normalizedPath)) {
      throw new Error('Invalid template path');
    }
    
    const templatePath = path.join(TEMPLATES_BASE_PATH, normalizedPath);
    
    // Verify path is within templates directory
    const resolvedTemplatePath = path.resolve(templatePath);
    const resolvedBasePath = path.resolve(TEMPLATES_BASE_PATH);
    
    if (!resolvedTemplatePath.startsWith(resolvedBasePath)) {
      throw new Error('Path is outside templates directory');
    }
    
    // Read manifest to get template list
    const manifestPath = path.join(templatePath, 'template.manifest.json');
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);
    
    const files: TemplateFile[] = [];
    
    // If templateId is specified, return only that template file
    if (templateId) {
      const template = manifest.templates?.find((t: { id: string; file: string }) => t.id === templateId);
      if (!template) {
        throw new Error('Template not found');
      }
      
      const filePath = path.join(templatePath, template.file);
      const content = await fs.readFile(filePath, 'utf-8');
      const extension = path.extname(template.file).slice(1);
      
      files.push({
        name: template.file,
        content,
        language: getLanguageFromExtension(extension),
        path: `${relativePath}/${template.file}`,
      });
    } else {
      // Return all template files
      if (manifest.templates) {
        for (const template of manifest.templates) {
          try {
            const filePath = path.join(templatePath, template.file);
            const content = await fs.readFile(filePath, 'utf-8');
            const extension = path.extname(template.file).slice(1);
            
            files.push({
              name: template.file,
              content,
              language: getLanguageFromExtension(extension),
              path: `${relativePath}/${template.file}`,
            });
          } catch (error) {
            console.warn(`Failed to read template file ${template.file}:`, error);
          }
        }
      }
    }
    
    return files;
  } catch (error) {
    console.error('Failed to load template files:', error);
    throw error;
  }
}

function getLanguageFromExtension(extension: string): string {
  const languageMap: Record<string, string> = {
    'tsx': 'typescript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'js': 'javascript',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'md': 'markdown',
    'mdx': 'markdown',
    'html': 'html',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
  };
  
  return languageMap[extension.toLowerCase()] || 'text';
}