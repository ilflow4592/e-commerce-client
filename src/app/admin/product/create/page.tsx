"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useGlobalSnackbar } from "app/admin/components/GlobalSnackbarProvider";
import Wrapper from "app/admin/components/style/Wrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateProduct = () => {
  const router = useRouter();
  const { showMessage } = useGlobalSnackbar();

  const [name, setName] = useState("새로운 청바지");
  const [description, setDescription] = useState("레알");
  const [unitPrice, setUnitPrice] = useState<string>("30000");
  const [stockQuantity, setStockQuantity] = useState<string>("10");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      name,
      description,
      unitPrice,
      stockQuantity,
      category,
      size,
    };

    try {
      await axios.post(`http://localhost:8080/api/v1/products`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      // 토스트 알람 보여주기
      showMessage({
        message: "상품이 성공적으로 생성되었습니다!",
        severity: "success",
      });

      router.push("/admin/product");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const errors = error?.response?.data;
        console.log("error.response.", error.response);
        // 실패 시 에러용 스낵바도 가능
        showMessage({
          message: "상품 생성에 실패했습니다.",
          severity: "error",
          status,
          errors,
        });
      } else {
        console.log(error);
      }
    }
  };

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
            label="상품 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="상품 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <TextField
            label="개당 가격"
            value={unitPrice}
            type="number"
            required
            onChange={(e) => setUnitPrice(e.target.value)}
          />

          <TextField
            label="재고 수량"
            value={stockQuantity}
            type="number"
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value as string)}
            >
              <MenuItem value={"바지"}>바지</MenuItem>
              <MenuItem value={"상의"}>상의</MenuItem>
              <MenuItem value={"아우터"}>아우터</MenuItem>
              <MenuItem value={"신발"}>신발</MenuItem>
              <MenuItem value={"액세서리"}>액세서리</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">사이즈</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={size}
              label="Size"
              onChange={(e) => setSize(e.target.value as string)}
            >
              <MenuItem value={"S"}>S</MenuItem>
              <MenuItem value={"M"}>M</MenuItem>
              <MenuItem value={"L"}>L</MenuItem>
              <MenuItem value={"XL"}>XL</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
};

export default CreateProduct;
