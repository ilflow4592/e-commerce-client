"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Product } from "../entity/product/Product";
import { PaginatedResponse } from "../entity/PaginatedResponse";
import { getAllProductResponseColumns } from "../api/response/product/ProductColumns";
import DataList from "../components/DataList";
import Wrapper from "../components/style/Wrapper";

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
            Product List
          </Typography>
          <Link href={"/admin/product/create"}>
            <Button variant="contained">상품 생성</Button>
          </Link>
        </Box>

        <DataList
          rows={products.data}
          columns={getAllProductResponseColumns}
          initialState={{ pagination: { paginationModel } }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Container>
    </Wrapper>
  );
};

export default ProductPage;
