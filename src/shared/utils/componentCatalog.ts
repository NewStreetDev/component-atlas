import path from 'path';
import fs from 'fs/promises';
import { ComponentManifest, CatalogComponent, CodeViewerFile } from '@/shared/types/component';

const COMPONENTS_BASE_PATH = path.join(process.cwd(), 'src', 'components');

function parseManifestContent(content: string): ComponentManifest {
  // Remove imports and extract the manifest object
  const lines = content.split('\n');
  let manifestStart = -1;
  let manifestEnd = -1;
  let braceCount = 0;
  let inManifest = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip import lines and comments
    if (line.startsWith('import ') || line.startsWith('//') || line.startsWith('/*') || line === '') {
      continue;
    }
    
    // Look for manifest declaration
    if (line.includes('export const manifest') && line.includes('=')) {
      manifestStart = i;
      inManifest = true;
      // Count opening braces in this line
      for (const char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
      continue;
    }
    
    if (inManifest) {
      // Count braces to find the end of the object
      for (const char of line) {
        if (char === '{') braceCount++;
        if (char === '}') braceCount--;
      }
      
      if (braceCount === 0) {
        manifestEnd = i;
        break;
      }
    }
  }
  
  if (manifestStart === -1 || manifestEnd === -1) {
    throw new Error('Could not parse manifest object');
  }
  
  // Extract the object literal part
  const manifestLines = lines.slice(manifestStart, manifestEnd + 1);
  let manifestContent = manifestLines.join('\n');
  
  // Clean up the content to extract just the object literal
  manifestContent = manifestContent
    .replace(/export\s+const\s+manifest\s*:\s*ComponentManifest\s*=\s*/, '')
    .replace(/;\s*$/, '')
    .trim();
  
  // Use Function constructor to safely evaluate the object literal
  const manifest = new Function('return ' + manifestContent)();
  return manifest;
}

export async function getAllComponents(): Promise<CatalogComponent[]> {
  try {
    const components: CatalogComponent[] = [];
    
    // Read all categories
    const categories = await fs.readdir(COMPONENTS_BASE_PATH);
    
    for (const category of categories) {
      const categoryPath = path.join(COMPONENTS_BASE_PATH, category);
      const stat = await fs.stat(categoryPath);
      
      if (!stat.isDirectory()) continue;
      
      // Read all components in category
      const componentNames = await fs.readdir(categoryPath);
      
      for (const componentName of componentNames) {
        const componentPath = path.join(categoryPath, componentName);
        const componentStat = await fs.stat(componentPath);
        
        if (!componentStat.isDirectory()) continue;
        
        try {
          // Try JSON manifest first, then fall back to TS
          let manifest: ComponentManifest;
          const jsonManifestPath = path.join(componentPath, 'component.manifest.json');
          const tsManifestPath = path.join(componentPath, 'component.manifest.ts');
          
          const jsonExists = await fs.access(jsonManifestPath).then(() => true).catch(() => false);
          const tsExists = await fs.access(tsManifestPath).then(() => true).catch(() => false);
          
          if (jsonExists) {
            const manifestContent = await fs.readFile(jsonManifestPath, 'utf-8');
            manifest = JSON.parse(manifestContent);
          } else if (tsExists) {
            const manifestContent = await fs.readFile(tsManifestPath, 'utf-8');
            manifest = parseManifestContent(manifestContent);
          } else {
            continue;
          }
          
          components.push({
            id: `${category}-${componentName}`,
            manifest,
            relativePath: `${category}/${componentName}`,
          });
        } catch (error) {
          console.warn(`Failed to load component ${category}/${componentName}:`, error);
        }
      }
    }
    
    return components;
  } catch (error) {
    console.error('Failed to load components:', error);
    return [];
  }
}

export async function getComponentFiles(relativePath: string): Promise<CodeViewerFile[]> {
  try {
    // Security: Validate path is within components directory
    const normalizedPath = path.normalize(relativePath);
    if (normalizedPath.includes('..') || path.isAbsolute(normalizedPath)) {
      throw new Error('Invalid component path');
    }
    
    const componentPath = path.join(COMPONENTS_BASE_PATH, normalizedPath);
    
    // Verify path is within components directory
    const resolvedComponentPath = path.resolve(componentPath);
    const resolvedBasePath = path.resolve(COMPONENTS_BASE_PATH);
    
    if (!resolvedComponentPath.startsWith(resolvedBasePath)) {
      throw new Error('Path is outside components directory');
    }
    
    // Read manifest to get file list
    let manifest: ComponentManifest;
    const jsonManifestPath = path.join(componentPath, 'component.manifest.json');
    const tsManifestPath = path.join(componentPath, 'component.manifest.ts');
    
    const jsonExists = await fs.access(jsonManifestPath).then(() => true).catch(() => false);
    const tsExists = await fs.access(tsManifestPath).then(() => true).catch(() => false);
    
    if (jsonExists) {
      const manifestContent = await fs.readFile(jsonManifestPath, 'utf-8');
      manifest = JSON.parse(manifestContent);
    } else if (tsExists) {
      const manifestContent = await fs.readFile(tsManifestPath, 'utf-8');
      manifest = parseManifestContent(manifestContent);
    } else {
      throw new Error('No manifest file found');
    }
    
    const files: CodeViewerFile[] = [];
    
    for (const fileName of manifest.files) {
      // Security: Validate filename
      if (fileName.includes('..') || path.isAbsolute(fileName)) {
        continue;
      }
      
      const filePath = path.join(componentPath, fileName);
      
      // Verify file is within component directory
      const resolvedFilePath = path.resolve(filePath);
      if (!resolvedFilePath.startsWith(resolvedComponentPath)) {
        continue;
      }
      
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        const extension = path.extname(fileName).slice(1);
        
        files.push({
          name: fileName,
          content,
          language: getLanguageFromExtension(extension),
          path: `${relativePath}/${fileName}`,
        });
      } catch (error) {
        console.warn(`Failed to read file ${fileName}:`, error);
      }
    }
    
    // Check for README.mdx
    const readmePath = path.join(componentPath, 'README.mdx');
    try {
      const readmeContent = await fs.readFile(readmePath, 'utf-8');
      files.push({
        name: 'README.mdx',
        content: readmeContent,
        language: 'markdown',
        path: `${relativePath}/README.mdx`,
      });
    } catch {
      // README is optional
    }
    
    return files;
  } catch (error) {
    console.error('Failed to load component files:', error);
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