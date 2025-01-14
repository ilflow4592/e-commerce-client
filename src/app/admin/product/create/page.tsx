"use client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Wrapper from "app/admin/components/style/Wrapper";
import { useState } from "react";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [stockQuantity, setStockQuantity] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name,
      description,
      unitPrice,
      stockQuantity,
      category,
      size,
    };

    console.log("Form Data:", formData);

    setName("");
    setDescription("");
    setUnitPrice(0);
    setStockQuantity(0);
    setCategory("");
    setSize("");
  };
  return (
    <Wrapper>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Create Product
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "80%",
            margin: "0 auto",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            label="Unit Price"
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(Number(e.target.value))}
            required
          />

          <TextField
            label="Stock Quantity"
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
            required
          />

          <TextField
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <TextField
            label="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default CreateProduct;
