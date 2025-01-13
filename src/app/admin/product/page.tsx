"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Paper, Typography } from "@mui/material";
import { Product } from "../entity/product/Product";
import { PaginatedResponse } from "../entity/PaginatedResponse";
import { DataGrid } from "@mui/x-data-grid";
import { getAllProductResponseColumns } from "../api/response/product/ProductColumns";

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
    console.log(paginationModel);
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel]);

  if (!products) return <div>Loading...</div>;

  return (
    <Paper sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", padding: "16px" }}>
        Product List
      </Typography>
      <DataGrid
        rows={products.data}
        columns={getAllProductResponseColumns.map((col) => ({
          ...col,
          flex: 1,
          headerAlign: "center",
          align: "center",
        }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
        sx={{
          height: "84vh", // 높이 고정
          // overflow: "auto", // 스크롤 활성화
        }}
      />
    </Paper>
  );
};

export default ProductPage;
