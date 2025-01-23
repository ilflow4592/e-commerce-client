"use client";

import { Box, Button, Container, styled, TextField } from "@mui/material";
import DisplayableProducts from "./components/DisplayableProducts";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "app/admin/entity/product/Product";

const ShopPage = () => {
  const [shopDisplayableProducts, setShopDisplayableProducts] = useState<
    Product[]
  >([]);
  const [keyword, setKeyword] = useState<string>("");

  const fetchData = async (keyword?: string) => {
    try {
      let response;

      if (keyword) {
        response = await axios.get(
          `http://localhost:8080/api/v1/products/search?keyword=${keyword}&entryPoint=shop&page=1&size=10`
        );
      } else {
        response = await axios.get(
          `http://localhost:8080/api/v1/products/shop?page=1&size=10`
        );
      }

      setShopDisplayableProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    fetchData(keyword);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "30px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Form onSubmit={handleSubmit}>
          <TextField
            placeholder="Search"
            sx={{ width: "300px" }}
            onChange={onSearchKeywordChange}
          />
          <Button type="submit" variant="contained">
            Search
          </Button>
        </Form>
      </Box>
      <Box sx={{ marginTop: "30px" }}>
        <DisplayableProducts products={shopDisplayableProducts} />
      </Box>
    </Container>
  );
};

export default ShopPage;

const Form = styled("form")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "20px",
});
