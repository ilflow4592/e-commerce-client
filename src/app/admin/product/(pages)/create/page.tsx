import { Box, Container, Typography } from "@mui/material";
import Wrapper from "app/admin/components/style/Wrapper";
import CreateProductClientPage from "../../components/create/page";

const CreateProductPage = () => {
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
            Create Product
          </Typography>
        </Box>

        <CreateProductClientPage />
      </Container>
    </Wrapper>
  );
};

export default CreateProductPage;
