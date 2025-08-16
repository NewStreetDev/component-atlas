export interface ComponentManifest {
  name: string;
  category: string;
  description?: string;
  tags?: string[];
  files: string[];
}

export interface ComponentFile {
  path: string;
  content: string;
  extension: string;
}

export interface CatalogComponent {
  id: string;
  manifest: ComponentManifest;
  relativePath: string;
}

export type ComponentCategory = 'inputs' | 'buttons' | 'layout' | 'navigation' | 'display' | 'feedback' | 'data';

export interface CodeViewerFile {
  name: string;
  content: string;
  language: string;
  path: string;
}