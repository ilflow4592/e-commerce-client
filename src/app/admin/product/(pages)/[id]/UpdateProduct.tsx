"use client";

import { Product } from "app/admin/entity/product/Product";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useGlobalSnackbar } from "app/admin/components/GlobalSnackbarProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";
import Image from "next/image";

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
  const [image, setImage] = useState<File | null>(null);
  const [shopDisplayable, setShopDisplayable] = useState(
    product.shopDisplayable
  );

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShopDisplayable(event.target.checked);
  };

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

    const productDto = {
      name,
      description,
      unitPrice,
      stockQuantity,
      category,
      size,
      shopDisplayable,
    };

    if (!image) {
      alert("파일이 없습니다.");
      return;
    }

    const formData = new FormData();

    formData.append(
      "productDto",
      new Blob([JSON.stringify(productDto)], { type: "application/json" })
    );

    formData.append("file", image);

    try {
      await axios.put(`http://localhost:8080/api/v1/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0]);
      setImage(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (value.length === 1 && value === "0") {
      return;
    }

    // 숫자만 허용 (특수문자 및 하이픈 "-" 차단)
    const numericValue = value.replace(/[^0-9]/g, "");

    if (name === "unitPrice") {
      setUnitPrice(numericValue);
    } else if (name === "stockQuantity") {
      setStockQuantity(numericValue);
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

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {product?.fileUrl && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "200px",
              height: "200px",
              border: "1px dashed gray",
              borderRadius: "10px",
              marginRight: "30px",
            }}
          >
            <Image
              src={(image && URL.createObjectURL(image)) ?? product?.fileUrl}
              alt="Product Image"
              width={150}
              height={150}
              unoptimized
            />
          </Box>
        )}

        <Button variant="contained" component="label">
          사진 업로드
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            accept="image/png"
          />
        </Button>
      </Box>

      {product?.fileName && (
        <Typography variant="body1">
          image name : {image ? image.name : product?.fileName}
        </Typography>
      )}

      <TextField
        label="개당 가격"
        name="unitPrice"
        value={unitPrice}
        type="text"
        required
        slotProps={{ htmlInput: { min: 0 } }}
        onChange={handleChange}
      />

      <TextField
        label="재고 수량"
        name="stockQuantity"
        value={stockQuantity}
        type="text"
        slotProps={{ htmlInput: { min: 0 } }}
        required
        onChange={handleChange}
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

      <FormControlLabel
        control={<Switch checked={shopDisplayable} onChange={handleToggle} />}
        label="쇼핑몰에 노출"
      />

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
