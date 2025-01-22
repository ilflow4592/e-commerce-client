"use client";

import { ReactNode, useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConfirmProvider } from "material-ui-confirm";
import Header from "app/components/common/Header";
import { AuthProvider } from "./(auth)/provider/AuthProvider";
import GlobalSnackbarProvider from "../GlobalSnackbarProvider";

const drawerWidth = 240;

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathName = usePathname();

  // 모바일에서 Drawer 열림/닫힘 제어
  const [mobileOpen, setMobileOpen] = useState(false);

  // 테마 브레이크포인트로 현재 디바이스 구분
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // 드로어 메뉴 아이템
  const drawerItems = (
    <>
      <List>
        <ListItem
          component={Link}
          href="/admin"
          sx={{
            color: "white",
            textAlign: "center",
            backgroundColor:
              pathName === "/admin"
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
          }}
          onClick={isMobile ? handleDrawerToggle : undefined}
        >
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          component={Link}
          href="/admin/products"
          sx={{
            color: "white",
            textAlign: "center",
            backgroundColor:
              pathName === "/admin/products"
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
          }}
          onClick={isMobile ? handleDrawerToggle : undefined}
        >
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem>
          <Header />
        </ListItem>
      </List>
    </>
  );

  // Drawer 스타일(고정 폭 + 배경색)
  const drawerSx = {
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      backgroundColor: "#1976d2",
      color: "#fff",
      // 아래처럼 position 고정을 안 쓰고 기본 MUI Drawer 레이아웃을 사용하면
      // 옆에 고정되어 상단 AppBar와 함께 동작합니다.
      // position: "fixed",
    },
  };

  return (
    <Box>
      <AuthProvider>
        <CssBaseline />
        {isMobile && (
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Admin Panel
            </Typography>
          </Toolbar>
        )}

        {/* 왼쪽 Drawer (메뉴) */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          sx={{ flexShrink: 0, ...drawerSx }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawerItems}
        </Drawer>

        {/* 메인 컨텐츠 영역 */}
        <Box
          component="main"
          sx={{
            ml: isMobile ? 0 : `${drawerWidth}px`,
            backgroundColor: "#fff",
          }}
        >
          <ConfirmProvider>
            <GlobalSnackbarProvider>{children}</GlobalSnackbarProvider>
          </ConfirmProvider>
        </Box>
      </AuthProvider>
    </Box>
  );
}
