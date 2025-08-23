export interface TemplateItem {
  id: string;
  name: string;
  description: string;
  file: string;
  preview: string;
}

export interface TemplateManifest {
  name: string;
  category: string;
  description: string;
  tags: string[];
  files: string[];
  preview?: string;
  type: 'page' | 'component';
  templates?: TemplateItem[];
}

export interface Template {
  id: string;
  manifest: TemplateManifest;
  relativePath: string;
}

export interface TemplateFile {
  name: string;
  content: string;
  language: string;
  path: string;
}

export type TemplateCategory = 'contact' | 'landing' | 'dashboard' | 'auth' | 'ecommerce' | 'blog';