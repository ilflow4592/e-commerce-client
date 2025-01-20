import { styled } from "@mui/material";
import Link from "next/link";

interface ProductLinkIdCellProps {
  id: number;
}

const ProductLinkIdCell = ({ id }: ProductLinkIdCellProps) => {
  return (
    <Link href={`/admin/products/${id}`} legacyBehavior>
      <StyledLink>{id}</StyledLink>
    </Link>
  );
};

export default ProductLinkIdCell;

const StyledLink = styled("a")({
  textDecorationLine: "none",
  color: "blue",
  fontWeight: "bold",
  cursor: "pointer",
});
