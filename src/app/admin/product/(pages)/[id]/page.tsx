import { Box, Container, Typography } from "@mui/material";
import Wrapper from "app/admin/components/style/Wrapper";
import UpdateProduct from "./UpdateProduct";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = Number((await params).id);

  const data = await fetch(`http://localhost:8080/api/v1/products/${id}`);
  const product = await data.json();

  return (
    <Wrapper>
      <Container maxWidth="xl">
        <Box
          sx={{
            padding: "10px 0",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            Update Product
          </Typography>

          <UpdateProduct id={id} product={product} />
        </Box>
      </Container>
    </Wrapper>
  );
};

export default UpdateProductPage;
