import { Box, Container, Typography } from "@mui/material";
import Wrapper from "app/admin/components/style/Wrapper";

const UpdateProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

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
          Current Id : {id}
        </Box>
      </Container>
    </Wrapper>
  );
};

export default UpdateProductPage;
