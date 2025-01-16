"use client";

import { Product } from "app/admin/entity/product/Product";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useGlobalSnackbar } from "app/admin/components/GlobalSnackbarProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";

interface UpdateProducProps {
  id: number;
  product: Product;
}

const UpdateProduct = ({ id, product }: UpdateProducProps) => {
  const confirm = useConfirm();
  const router = useRouter();
  const { showMessage } = useGlobalSnackbar();

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [unitPrice, setUnitPrice] = useState<number | string>(
    product.unitPrice
  );
  const [stockQuantity, setStockQuantity] = useState<number | string>(
    product.stockQuantity
  );
  const [category, setCategory] = useState(product.category);
  const [size, setSize] = useState(product.size);

  const handleConfirm = () => {
    confirm({ title: "정말로 삭제하시겠습니까?" })
      .then(async () => {
        await axios.delete(`http://localhost:8080/api/v1/products/${id}`, {
          headers: { "Content-Type": "application/json" },
        });

        // 토스트 알람 보여주기
        showMessage({
          message: "상품이 성공적으로 삭제되었습니다!",
          severity: "success",
        });

        router.push("/admin/product");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const status = error?.response?.status;
          const errors = error?.response?.data;
          console.log("error.response.", error.response);

          showMessage({
            message: "상품 삭제에 실패했습니다.",
            severity: "error",
            status,
            errors,
          });
        } else {
          console.log(error);
        }
      });
  };

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
      await axios.patch(
        `http://localhost:8080/api/v1/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // 토스트 알람 보여주기
      showMessage({
        message: "상품이 성공적으로 갱신되었습니다!",
        severity: "success",
      });

      router.push("/admin/product");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const errors = error?.response?.data;
        console.log("error.response.", error.response);

        showMessage({
          message: "상품 갱신에 실패했습니다.",
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
        onChange={(e) =>
          setUnitPrice(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

      <TextField
        label="재고 수량"
        value={stockQuantity}
        type="number"
        onChange={(e) =>
          setStockQuantity(e.target.value === "" ? "" : Number(e.target.value))
        }
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

      <Button variant="contained" color="error" onClick={handleConfirm}>
        Delete
      </Button>
    </Box>
  );
};

export default UpdateProduct;
