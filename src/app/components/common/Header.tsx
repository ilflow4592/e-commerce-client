"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { Box, Button, Container } from "@mui/material";

const ShopLinkButton = styled(Button)({
  backgroundColor: "green",
  color: "white",
  "&:hover": {
    backgroundColor: "darkgreen",
  },
});

const AdminLinkButton = styled(Button)({
  backgroundColor: "skyblue",
  color: "white",
  "&:hover": {
    backgroundColor: "deepskyblue",
  },
});

const Header = () => {
  const pathname = usePathname();
  const isShopPage = pathname.includes("/shop");
  const isAdminPage = pathname.includes("/admin");

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: isShopPage ? "flex-end" : "center",
          alignItems: "center",
          padding: "10px 0",
          zIndex: 1,
        }}
      >
        {isShopPage && (
          <Link href="/admin">
            <AdminLinkButton variant="contained">To Admin</AdminLinkButton>
          </Link>
        )}

        {isAdminPage && (
          <Link href="/shop">
            <ShopLinkButton variant="contained">To Shop</ShopLinkButton>
          </Link>
        )}
      </Box>
    </Container>
  );
};

export default Header;
