"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
} from "@mui/material";
import DisplayableProducts from "./components/DisplayableProducts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "app/admin/entity/product/Product";
import { useDebounce } from "app/hooks/useDebounce";

const ShopPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shopDisplayableProducts, setShopDisplayableProducts] = useState<
    Product[]
  >([]);

  const keywordFromUrl = searchParams.get("keyword") || "";
  const categoryFromUrl = searchParams.get("category") || "";
  const productSizeFromUrl = searchParams.get("productSize") || "";

  const [keyword, setKeyword] = useState<string>(keywordFromUrl);
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        const params = new URLSearchParams();

        if (debouncedKeyword) params.append("keyword", debouncedKeyword);
        if (categoryFromUrl) params.append("category", categoryFromUrl);
        if (productSizeFromUrl)
          params.append("productSize", productSizeFromUrl);

        params.append("entryPoint", "shop");
        params.append("page", "1");
        params.append("size", "10");

        if (debouncedKeyword || categoryFromUrl || productSizeFromUrl) {
          response = await axios.get(
            `http://localhost:8080/api/v1/products/search?${params.toString()}`
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

    fetchData();
  }, [debouncedKeyword, categoryFromUrl, productSizeFromUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (categoryFromUrl) params.append("category", categoryFromUrl);
    if (productSizeFromUrl) params.append("productSize", productSizeFromUrl);

    router.push(`?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/shop");
  };

  return (
    <Container maxWidth="xl" sx={{ marginTop: "30px" }}>
      <Box sx={{ textAlign: "center" }}>
        <Form onSubmit={handleSubmit}>
          <TextField
            placeholder="Search"
            sx={{ width: "300px" }}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <FormControl sx={{ width: "300px" }}>
            <InputLabel id="category-select-label">카테고리</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={categoryFromUrl || ""}
              label="Category"
              onChange={(e) =>
                router.push(
                  `?keyword=${debouncedKeyword}&category=${e.target.value}&productSize=${productSizeFromUrl}`
                )
              }
            >
              <MenuItem value={""}>카테고리(초기화)</MenuItem>
              <MenuItem value={"PANTS"}>바지</MenuItem>
              <MenuItem value={"TOPS"}>상의</MenuItem>
              <MenuItem value={"OUTER"}>아우터</MenuItem>
              <MenuItem value={"SHOES"}>신발</MenuItem>
              <MenuItem value={"ACCESSORY"}>액세서리</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: "300px" }}>
            <InputLabel id="product-size-select-label">사이즈</InputLabel>
            <Select
              labelId="product-size-select-label"
              id="product-size-select"
              value={productSizeFromUrl || ""}
              label="Size"
              onChange={(e) =>
                router.push(
                  `?keyword=${debouncedKeyword}&category=${categoryFromUrl}&productSize=${e.target.value}`
                )
              }
            >
              <MenuItem value={""}>사이즈(초기화)</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"S"}>S</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{ marginLeft: "10px" }}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Box>
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
