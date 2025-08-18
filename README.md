# Component Atlas

Component Atlas is a comprehensive Next.js application that serves as a centralized catalog for reusable UI components. Built with TypeScript, Material-UI, and Tailwind CSS, it provides developers with a searchable, filterable, and well-documented component library.

## What is Component Atlas?

Component Atlas is designed to solve the common problem of component discoverability and reusability across projects. It provides:

- **Searchable Component Catalog**: Browse and search through components by category, tags, and functionality
- **Live Demos**: See components in action with interactive demonstrations
- **Complete Documentation**: Each component includes detailed documentation, usage examples, and API references
- **Source Code Viewer**: View and copy component source code directly from the interface
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

## Features

- 🔍 **Advanced Search & Filtering**: Find components by name, category, tags, or functionality
- 📱 **Responsive Interface**: Mobile-first design that works on all screen sizes
- 🎨 **Theme Support**: Light and dark mode support for code viewing
- 📋 **Code Copying**: One-click code copying with syntax highlighting
- 🏗️ **Component Structure**: Organized component hierarchy with clear categorization
- 🚀 **Performance Optimized**: Built with Next.js 15 and optimized for fast loading

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd component-atlas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

### Available Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Adding New Components

### Required Component Structure

Every component in the atlas must follow a specific structure to be properly indexed and displayed. Each component should be placed in the appropriate category folder under `src/components/`.

### Required Files

Each component **must** include these files:

#### 1. `component.manifest.json`
This file contains metadata about your component:

```json
{
  "name": "Component Name",
  "category": "category-name",
  "description": "Brief description of what the component does",
  "tags": [
    "tag1",
    "tag2",
    "functionality"
  ],
  "files": [
    "ComponentName.tsx",
    "demo.tsx"
  ]
}
```

**Fields:**
- `name`: Display name of the component
- `category`: Category folder name (buttons, inputs, dialogs, etc.)
- `description`: Short description for search and display
- `tags`: Array of searchable tags
- `files`: List of files to include in the code viewer

#### 2. `ComponentName.tsx`
The main component implementation:

```tsx
import React from 'react';
import { /* required imports */ } from '@mui/material';

interface ComponentNameProps {
  // Define your props interface
}

export default function ComponentName({ 
  /* props */ 
}: ComponentNameProps) {
  // Component implementation
  return (
    // JSX
  );
}
```

#### 3. `demo.tsx`
A demonstration of how to use the component:

```tsx
import React from 'react';
import ComponentName from './ComponentName';

export default function ComponentDemo() {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">Component Demo</h3>
      
      {/* Example usage */}
      <ComponentName />
      
      {/* Multiple examples if needed */}
      <ComponentName variant="outlined" />
    </div>
  );
}
```

#### 4. `README.mdx`
Comprehensive documentation in MDX format:

```mdx
# Component Name

Brief description of the component and its purpose.

## Features

- Feature 1
- Feature 2
- Feature 3

## Usage

Basic usage example:

```tsx
import ComponentName from './ComponentName';

function MyApp() {
  return (
    <ComponentName prop1="value1" />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | '' | Description of prop1 |
| prop2 | boolean | false | Description of prop2 |

## Examples

### Basic Example
```tsx
<ComponentName />
```

### Advanced Example
```tsx
<ComponentName
  prop1="advanced"
  prop2={true}
  onAction={handleAction}
/>
```

## API Reference

Detailed API documentation...
```

### Component Categories

Organize your components into these categories:

- `buttons/` - Button components and interactive elements
- `inputs/` - Form inputs and controls
- `dialogs/` - Modal dialogs and overlays
- `notifications/` - Toast notifications and alerts  
- `player/` - Media players (audio, video)
- `chats/` - Chat and messaging components

### Step-by-Step Component Addition

1. **Choose the appropriate category** folder under `src/components/`

2. **Create a new folder** for your component:
   ```
   src/components/category/your-component-name/
   ```

3. **Create the required files**:
   - `YourComponentName.tsx` (main component)
   - `demo.tsx` (demonstration)
   - `README.mdx` (documentation)
   - `component.manifest.json` (metadata)

4. **Add any additional files** your component needs (utilities, types, styles)

5. **Update the manifest** to include all relevant files in the `files` array

6. **Test your component** by running the development server and navigating to the catalog

### Best Practices

- **Follow existing patterns**: Look at similar components for consistency
- **Use TypeScript**: Ensure proper typing for all props and interfaces
- **Include comprehensive demos**: Show various use cases and configurations
- **Write clear documentation**: Include usage examples, prop descriptions, and API references
- **Add relevant tags**: Help users find your component through search
- **Test responsiveness**: Ensure components work on all screen sizes
- **Follow naming conventions**: Use PascalCase for components and kebab-case for folders

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Material-UI v7 + Tailwind CSS v4
- **Language**: TypeScript
- **Database**: Supabase (if needed)
- **Form Handling**: React Hook Form with Zod validation
- **Code Highlighting**: Prism.js with syntax highlighting
- **Documentation**: MDX for rich documentation format

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Component library organized by category
│   ├── buttons/           # Button components
│   ├── inputs/            # Input components
│   ├── dialogs/           # Dialog components
│   ├── notifications/     # Notification components
│   └── player/            # Media player components
└── shared/                # Shared utilities and components
    ├── components/        # Shared UI components
    ├── hooks/             # Custom React hooks
    ├── types/             # TypeScript type definitions
    └── utils/             # Utility functions
```

## Contributing

1. Follow the component addition guidelines above
2. Ensure all required files are present and properly formatted
3. Test your component thoroughly
4. Update documentation as needed
5. Follow the existing code style and conventions

## License

[Your License Here]
