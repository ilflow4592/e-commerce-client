"use client";

import { ReactNode } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

interface ShopLayoutProps {
  children: ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <Box>
      <ResponsiveAppBar />
      {children}
    </Box>
  );
}
