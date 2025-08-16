'use client';

import React, { useState } from 'react';
import { Box, Typography, Paper, Divider, Alert, Button } from '@mui/material';
import RichTextInput from './RichTextInput';

export default function RichTextInputDemo() {
  const [basicContent, setBasicContent] = useState('');
  const [noMenuContent, setNoMenuContent] = useState('<p>This editor has no menu bar</p>');
  const [prefilledContent, setPrefilledContent] = useState(`
    <h1>Welcome to Rich Text Editor</h1>
    <p>This is a <strong>powerful</strong> rich text editor with many features:</p>
    <ul>
      <li>Bold and <em>italic</em> text</li>
      <li><strike>Strikethrough</strike> formatting</li>
      <li>Links: <a href="https://example.com">Example Link</a></li>
    </ul>
    <blockquote>
      <p>You can also add blockquotes for important information</p>
    </blockquote>
    <pre><code>// Code blocks are supported too
function hello() {
  console.log("Hello World!");
}</code></pre>
  `);

  const handleReset = () => {
    setBasicContent('');
    setPrefilledContent(`
      <h1>Welcome to Rich Text Editor</h1>
      <p>This is a <strong>powerful</strong> rich text editor with many features:</p>
      <ul>
        <li>Bold and <em>italic</em> text</li>
        <li><strike>Strikethrough</strike> formatting</li>
        <li>Links: <a href="https://example.com">Example Link</a></li>
      </ul>
      <blockquote>
        <p>You can also add blockquotes for important information</p>
      </blockquote>
      <pre><code>// Code blocks are supported too
function hello() {
  console.log("Hello World!");
}</code></pre>
    `);
    setNoMenuContent('<p>This editor has no menu bar</p>');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Rich Text Input Component
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A powerful WYSIWYG rich text editor built with TipTap, featuring comprehensive formatting tools and link management.
      </Typography>

      {/* Basic Usage */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Basic Usage
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Full-featured rich text editor with toolbar
        </Typography>
        <RichTextInput 
          value={basicContent}
          onChange={setBasicContent}
        />
        {basicContent && (
          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>HTML Output:</strong>
              <pre style={{ fontSize: '12px', marginTop: '8px', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
                {basicContent}
              </pre>
            </Typography>
          </Alert>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Prefilled Content */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          With Prefilled Content
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Editor initialized with existing HTML content
        </Typography>
        <RichTextInput 
          value={prefilledContent}
          onChange={setPrefilledContent}
        />
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Without Menu Bar */}
      <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Without Menu Bar
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Clean editor without formatting toolbar
        </Typography>
        <RichTextInput 
          value={noMenuContent}
          onChange={setNoMenuContent}
          hasMenuBar={false}
        />
      </Paper>

      {/* Reset Button */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Button variant="outlined" onClick={handleReset}>
          Reset All Editors
        </Button>
      </Box>

      {/* Features */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Features
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Text Formatting
            </Typography>
            <Box component="ul" sx={{ pl: 2, fontSize: '14px' }}>
              <li>Bold, italic, strikethrough</li>
              <li>H1 and H2 headings</li>
              <li>Clear formatting</li>
              <li>Code blocks</li>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Structure & Layout
            </Typography>
            <Box component="ul" sx={{ pl: 2, fontSize: '14px' }}>
              <li>Text alignment (left, center, right, justify)</li>
              <li>Bullet and numbered lists</li>
              <li>Blockquotes</li>
              <li>Horizontal rules</li>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Advanced Features
            </Typography>
            <Box component="ul" sx={{ pl: 2, fontSize: '14px' }}>
              <li>Link insertion and management</li>
              <li>Undo/redo functionality</li>
              <li>URL validation and security</li>
              <li>Debounced onChange events</li>
            </Box>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Technical
            </Typography>
            <Box component="ul" sx={{ pl: 2, fontSize: '14px' }}>
              <li>Built with TipTap editor</li>
              <li>Material-UI integration</li>
              <li>Memoized for performance</li>
              <li>Custom CSS styling</li>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Toolbar Guide */}
      <Paper elevation={1} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Toolbar Guide
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Overview of available formatting tools
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 2, fontSize: '14px' }}>
          <Box>
            <strong>Text Formatting:</strong>
            <br />• Bold (B)
            <br />• Italic (I)
            <br />• Strikethrough
            <br />• Clear Format
          </Box>
          <Box>
            <strong>Headings:</strong>
            <br />• H1 (Large heading)
            <br />• H2 (Medium heading)
            <br />• Link insertion
            <br />• Code block toggle
          </Box>
          <Box>
            <strong>Structure:</strong>
            <br />• Text alignment
            <br />• Bullet lists
            <br />• Numbered lists
            <br />• Blockquotes
            <br />• Horizontal rule
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}