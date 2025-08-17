import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeRendererProps {
  content: string;
  language: string;
  isDark: boolean;
  fontSize: string;
  showLineNumbers?: boolean;
}

export default function CodeRenderer({ 
  content, 
  language, 
  isDark, 
  fontSize, 
  showLineNumbers = true 
}: CodeRendererProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={isDark ? vscDarkPlus : vs}
      showLineNumbers={showLineNumbers}
      wrapLines
      customStyle={{
        margin: 0,
        height: '100%',
        paddingTop: '3rem',
        fontSize,
      }}
    >
      {content}
    </SyntaxHighlighter>
  );
}