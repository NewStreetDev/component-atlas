import React from 'react';
import MarkdownRenderer from './markdown/MarkdownRenderer';
import CodeRenderer from './code/CodeRenderer';
import { CodeViewerFile } from '@/shared/types/component';

interface FileContentRendererProps {
  file: CodeViewerFile;
  isDark: boolean;
  fontSize: string;
}

const isMarkdownFile = (fileName: string) => {
  return fileName.endsWith('.mdx') || fileName.endsWith('.md');
};

export default function FileContentRenderer({ file, isDark, fontSize }: FileContentRendererProps) {
  if (isMarkdownFile(file.name)) {
    return (
      <MarkdownRenderer 
        content={file.content} 
        isDark={isDark} 
        fontSize={fontSize} 
      />
    );
  }

  return (
    <CodeRenderer
      content={file.content}
      language={file.language}
      isDark={isDark}
      fontSize={fontSize}
    />
  );
}