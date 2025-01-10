"use server";

import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      This is Home Page!
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Material-UI with Next.js!
        </Typography>
        <Button variant="contained" color="primary">
          Click Me
        </Button>
      </Box>
    </div>
  );
};

export default HomePage;
