"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Product } from "../entity/product/Product";
import { PaginatedResponse } from "../entity/PaginatedResponse";
import { getAllProductResponseColumns } from "../api/response/product/ProductColumns";
import DataList from "../components/DataList";

const ProductPage = () => {
  const [products, setProducts] = useState<PaginatedResponse<Product>>();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  async function fetchData(page?: number, pageSize?: number) {
    const response = await axios.get(
      `http://localhost:8080/api/v1/products?page=${page}&pageSizew${pageSize}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setProducts(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  if (!products) return <div>Loading...</div>;

  return (
    <Paper>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Product List
        </Typography>
        <Button variant="contained">상품 생성</Button>
      </Box>

      <DataList
        rows={products.data}
        columns={getAllProductResponseColumns}
        initialState={{ pagination: { paginationModel } }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </Paper>
  );
};

export default ProductPage;
