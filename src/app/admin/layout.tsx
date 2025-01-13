"use client";

import { ReactNode } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathName = usePathname();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1976d2",
            color: "#fff",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Admin Panel
          </Typography>
        </Toolbar>
        <List>
          <ListItem
            component={Link}
            href="/admin"
            sx={{
              textAlign: "center",
              color: "white",
              backgroundColor:
                pathName === "/admin"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            component={Link}
            href="/admin/product"
            sx={{
              textAlign: "center",
              color: "white",
              backgroundColor:
                pathName === "/admin/product"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
            }}
          >
            <ListItemText primary="Product" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: "#f5f5f5",
          height: "90vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
