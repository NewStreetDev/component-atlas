"use client";

import React from "react";
import {
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search as SearchIcon,
  Category as CategoryIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

interface Component {
  id: string;
  manifest: {
    name: string;
    category: string;
  };
}

interface SidebarDrawerProps {
  components: Component[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  availableCategories: string[];
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export default function SidebarDrawer({
  components,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  availableCategories,
  mobileOpen,
  handleDrawerToggle,
}: SidebarDrawerProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 280;

  const drawerContent = (
    <>
      <Box sx={{ p: 3, borderBottom: "1px solid", borderColor: "divider" }}>
        {!isMobile && (
          <Typography 
            variant="h6" 
            component="h1" 
            gutterBottom
            className="text-sm! sm:text-base! md:text-lg!"
          >
            Component Atlas
          </Typography>
        )}
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 2 }}
          className="text-xs! sm:text-sm!"
        >
          Explore reusable components
        </Typography>

        {/* Search */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Categories */}
      <Box sx={{ overflow: "auto" }}>
        <Typography 
          variant="subtitle2" 
          sx={{ p: 2, pb: 1, fontWeight: 600 }}
          className="text-xs! sm:text-sm!"
        >
          Categories
        </Typography>
        <List dense>
          <ListItem disablePadding>
            <ListItemButton
              selected={selectedCategory === "all"}
              onClick={() => {
                setSelectedCategory("all");
                if (isMobile) handleDrawerToggle();
              }}
              sx={{ mx: 1, borderRadius: 1 }}
            >
              <CategoryIcon fontSize="small" sx={{ mr: 1.5, opacity: 0.7 }} />
              <ListItemText
                primary="All Components"
                secondary={`${components.length} items`}
              />
            </ListItemButton>
          </ListItem>
          {availableCategories.map((category) => {
            const categoryCount = components.filter(
              (comp) =>
                comp.manifest.category.toLowerCase() ===
                category.toLowerCase()
            ).length;
            return (
              <ListItem key={category} disablePadding>
                <ListItemButton
                  selected={selectedCategory === category}
                  onClick={() => {
                    setSelectedCategory(category);
                    if (isMobile) handleDrawerToggle();
                  }}
                  sx={{ mx: 1, borderRadius: 1 }}
                >
                  <ListItemText
                    primary={
                      category.charAt(0).toUpperCase() + category.slice(1)
                    }
                    secondary={`${categoryCount} items`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );

  return (
    <>
      {/* Mobile AppBar */}
      {isMobile && (
        <AppBar
          position="fixed"
          sx={{
            width: '100%',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              className="text-sm! sm:text-base! md:text-lg!"
            >
              Component Atlas
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Sidebar - Desktop (permanent) */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              position: "relative",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Sidebar - Mobile (temporary) */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              paddingTop: '60px'
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}