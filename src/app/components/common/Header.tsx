"use client";

import Link from "next/link";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Wrapper = styled("div")({
  backgroundColor: "aliceblue",
  padding: 8,
  display: "flex",
  justifyContent: "center",
  gap: "12px",
});

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
  return (
    <Wrapper>
      <Link href={"/shop"} passHref>
        <ShopLinkButton variant="contained">Shop</ShopLinkButton>
      </Link>

      <Link href={"/admin"} passHref>
        <AdminLinkButton variant="contained">Admin</AdminLinkButton>
      </Link>
    </Wrapper>
  );
};

export default Header;
