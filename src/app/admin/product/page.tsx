"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export interface PaginatedResponse {
  data: Product[];
  last: boolean;
  page: number;
  size: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
  category: string;
  size: string;
}

const ProductPage = () => {
  const [products, setProducts] = useState<PaginatedResponse>();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/v1/products",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setProducts(response.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (!products) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>name</TableCell>
            <TableCell>description</TableCell>
            <TableCell>unit_price(원)</TableCell>
            <TableCell>stock_quantity</TableCell>
            <TableCell>category</TableCell>
            <TableCell>size</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products?.data?.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.unitPrice}</TableCell>
              <TableCell>{product.stockQuantity}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.size}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductPage;
