import { Box, Container, Typography } from "@mui/material";
import DisplayableProducts from "./components/DisplayableProducts";

const ShopPage = async () => {
  const data = await fetch(`http://localhost:8080/api/v1/products/shop`);
  const shopDisplayableProducts = await data.json();

  return (
    <Container maxWidth="xl" sx={{ marginTop: "30px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Products</Typography>
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <DisplayableProducts products={shopDisplayableProducts} />
      </Box>
    </Container>
  );
};

export default ShopPage;
