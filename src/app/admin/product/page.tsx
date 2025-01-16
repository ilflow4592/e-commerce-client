"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Product } from "../entity/product/Product";
import { PaginatedResponse } from "../entity/PaginatedResponse";
import { getAllProductResponseColumns } from "../api/response/product/ProductColumns";
import DataList from "../components/DataList";
import Wrapper from "../components/style/Wrapper";
import { GridCallbackDetails, GridSortItem } from "@mui/x-data-grid";

const ProductPage = () => {
  const [rowCount, setRowCount] = useState<number>(0);
  const [sortModel, setSortModel] = useState<GridSortItem[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(
    null
  );

  const fetchData = async (page: number, pageSize: number) => {
    try {
      const field = sortModel[0]?.field ?? "id";
      const sort = sortModel[0]?.sort ?? "asc";

      const response = await axios.get(
        `http://localhost:8080/api/v1/products?page=${page + 1}&size=${pageSize}&sort=${field},${sort}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data as PaginatedResponse<Product>;
      setProducts(data);

      // 서버에서 last = true면 "이 페이지가 마지막"
      // last = false면 "아직 다음 페이지가 있음"
      if (data.last === false) {
        // 마지막이 아님 -> rowCount를 "다음 페이지가 있다고 가정"한 값으로 설정
        // (page+2) * pageSize = 최소한 다음 페이지는 있다
        setRowCount((page + 2) * pageSize);
      } else {
        // 마지막임 -> 정확한 rowCount를 계산
        // 현재까지 가져온 아이템 개수 = page*pageSize + data.data.length
        setRowCount(page * pageSize + data.data.length);
      }
    } catch (error) {
      const err = error as AxiosError;

      console.error("Axios Error:", err.message);
    }
  };

  const handleSortModelChange = (
    model: GridSortItem[],
    details: GridCallbackDetails
  ) => {
    console.log("Sort details:", details);

    if (paginationModel.page !== 0) {
      setPaginationModel((prev) => ({
        ...prev,
        page: 0,
      }));
    }

    setSortModel(model);
    fetchData(paginationModel.page, paginationModel.pageSize);
  };

  useEffect(() => {
    fetchData(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, sortModel]);

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
          <Link href="/admin/product/create">
            <Button variant="contained">상품 생성</Button>
          </Link>
        </Box>

        <DataList
          rows={products.data}
          columns={getAllProductResponseColumns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          paginationMode="server"
          rowCount={rowCount}
          sortModel={sortModel}
          handleSortModelChange={handleSortModelChange}
          initialState={{
            pagination: { paginationModel },
          }}
        />
      </Container>
    </Wrapper>
  );
};

export default ProductPage;
