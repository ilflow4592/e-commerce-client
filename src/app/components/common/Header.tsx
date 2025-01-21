"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";

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

const CartProductCount = styled("span")({
  position: "absolute",
  top: 0,
  right: 0,
  backgroundColor: "red",
  color: "white",
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Header = () => {
  const pathname = usePathname();
  const isShopPage = pathname.includes("/shop");
  const isAdminPage = pathname.includes("/admin");

  const [count, setCount] = useState(0);

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
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Box sx={{ position: "relative" }}>
              {/*장바구니에 아이템 */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <ShoppingCartIcon />
              </IconButton>
              <CartProductCount>{count}</CartProductCount>
            </Box>
            <Link href="/admin">
              <AdminLinkButton variant="contained">To Admin</AdminLinkButton>
            </Link>
          </Box>
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
