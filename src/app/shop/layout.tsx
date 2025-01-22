"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { AuthProvider } from "app/admin/(auth)/provider/AuthProvider";
import GlobalSnackbarProvider from "app/GlobalSnackbarProvider";

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <Box>
      <AuthProvider>
        <GlobalSnackbarProvider>
          <ResponsiveAppBar />
          {children}
        </GlobalSnackbarProvider>
      </AuthProvider>
    </Box>
  );
}
