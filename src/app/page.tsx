import Link from "next/link";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import { Code as CodeIcon, Description, ViewModule as ViewModuleIcon, Web } from "@mui/icons-material";

export default function Home() {
  return (
    <Container maxWidth="lg" className="py-16">
      <Box className="text-center!">
        <Typography variant="h1" component="h1" className="mb-4! font-semibold! text-4xl! sm:text-6xl! md:text-7xl! lg:text-8xl!">
          Component Atlas
        </Typography>
        <Typography variant="h2" component="h2" className="mb-8! text-gray-600! text-xl! sm:text-2xl! md:text-3xl! lg:text-4xl!">
          Discover, explore, and understand our UI component library
        </Typography>
        
        <Paper className="p-8! mb-8! bg-gradient-to-br! from-blue-50! to-indigo-50!">
          <Typography variant="h6" component="div" className="mb-4! text-sm! sm:text-base! md:text-lg!">
            Browse our comprehensive collection of reusable components
          </Typography>
          <Typography variant="body1" className="mb-6! text-gray-700! text-xs! sm:text-sm! md:text-base!">
            Each component comes with live previews, complete source code, documentation,
            and practical examples to help you integrate them into your projects.
          </Typography>
          
          <Box className="flex! gap-4! justify-center! flex-col! sm:flex-row!">
            <Button
              component={Link}
              href="/catalog"
              variant="contained"
              size="large"
              startIcon={<ViewModuleIcon />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Browse Components
            </Button>
            <Button
              component={Link}
              href="/templates"
              variant="contained"
              size="large"
              startIcon={<Web />}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Page Templates
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<CodeIcon />}
              href="/catalog"
              component={Link}
            >
              View Source Code
            </Button>
          </Box>
        </Paper>

        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Paper className="p-6 text-center">
            <ViewModuleIcon className="text-blue-600 mb-4" sx={{ fontSize: 48 }} />
            <Typography variant="h6" className="mb-2">
              Live Previews
            </Typography>
            <Typography variant="body2" color="text.secondary">
              See components in action with interactive demos and examples
            </Typography>
          </Paper>
          
          <Paper className="p-6 text-center">
            <Web className="text-purple-600 mb-4" sx={{ fontSize: 48 }} />
            <Typography variant="h6" className="mb-2">
              Page Templates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete page designs ready to use in your projects
            </Typography>
          </Paper>
          
          <Paper className="p-6 text-center">
            <CodeIcon className="text-green-600 mb-4" sx={{ fontSize: 48 }} />
            <Typography variant="h6" className="mb-2">
              Full Source Code
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access complete source code with syntax highlighting and copy functionality
            </Typography>
          </Paper>
          
          <Paper className="p-6 text-center">
            <Description className="text-blue-600 mb-4" sx={{ fontSize: 48 }} />
            <Typography variant="h6" className="mb-2">
              Documentation
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Comprehensive docs with usage examples and API references
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
