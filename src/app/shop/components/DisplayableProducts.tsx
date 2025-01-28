"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Product } from "app/admin/entity/product/Product";
import { formatNumber } from "../utils/formatNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";
import { encodeToBase64Query } from "../utils/base64";
import ImageWithSkeleton from "./ImageWithSceleton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

interface DisplayableProductsProps {
  products: Product[];
}

const DisplayableProducts = ({ products }: DisplayableProductsProps) => {
  const router = useRouter();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  const handlePush = (product: Product) => {
    const data = { ...product };
    const query = encodeToBase64Query(data);
    router.push(`/shop/products/${product.id}${query}`);
  };

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cartProducts") || "[]");
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      cart.push(product);
    }
    localStorage.setItem("cartProducts", JSON.stringify(cart));
    window.dispatchEvent(new Event("localStorageChanged"));
  };

  const handleIncrease = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1,
    }));
  };

  const handleDecrease = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "center" }}>
        Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products?.map((product: Product) => (
          <Card
            key={product.id}
            sx={{
              width: 350,
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              onClick={() => handlePush(product)}
              sx={{
                ":hover": { cursor: "pointer" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "140px",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <ImageWithSkeleton
                  src={product.fileUrl}
                  alt={product.fileName}
                  width={100}
                  height={100}
                />
              </Box>

              <CardContent sx={{ textAlign: "center", padding: "12px" }}>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "bold",
                    color: "#d32f2f",
                    fontSize: "1.1rem",
                    marginTop: "4px",
                  }}
                >
                  {formatNumber(product.unitPrice)}원
                </Typography>
              </CardContent>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderTop: "1px solid #e0e0e0",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "40px",
                  padding: "6px",
                  borderRadius: "8px",
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": { backgroundColor: "#1976d2", color: "white" },
                }}
                onClick={() => handleAddToCart(product)}
              >
                <AddShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
              </Button>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Button onClick={() => handleDecrease(product.id)}>
                  <RemoveIcon sx={{ color: "red" }} />
                </Button>
                <Button onClick={() => handleIncrease(product.id)}>
                  <AddIcon sx={{ color: "green" }} />
                </Button>
                <Box
                  sx={{ border: "3px solid powderblue", borderRadius: "5px" }}
                >
                  <Typography sx={{ fontWeight: "bold", padding: "5px 10px" }}>
                    {quantities[product.id] || 1}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                sx={{
                  flex: 2,
                  marginLeft: "8px",
                  padding: "6px",
                  borderRadius: "8px",
                  backgroundColor: "#ff9800",
                  border: "2px solid #ff9800",
                  color: "white",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e68900",
                    border: "2px solid #e68900",
                  },
                }}
              >
                구매하기
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default DisplayableProducts;
