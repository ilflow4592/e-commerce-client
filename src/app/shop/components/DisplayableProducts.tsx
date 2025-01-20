"use client";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Product } from "app/admin/entity/product/Product";
import Image from "next/image";
import { formatNumber } from "../utils/formatNumber";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/navigation";

interface DisplayableProductsProps {
  products: Product[];
}

const imageLoader = ({ src }: { src: string }) => {
  return src; // Presigned URL 그대로 반환
};

const DisplayableProducts = ({ products }: DisplayableProductsProps) => {
  const router = useRouter();
  return (
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
      {products.map((product: Product) => (
        <Card
          key={product.id}
          sx={{
            width: 220,
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            onClick={() => router.push(`/shop/products/${product.id}`)}
            sx={{
              ":hover": {
                cursor: "pointer",
              },
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
              <Image
                loader={imageLoader}
                src={product.fileUrl}
                width={100}
                height={100}
                alt={product.fileName}
                style={{ objectFit: "contain" }}
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
                "&:hover": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
            >
              <AddShoppingCartIcon sx={{ fontSize: "1.2rem" }} />
            </Button>

            <Button
              variant="contained"
              sx={{
                flex: 2,
                marginLeft: "8px",
                padding: "6px",
                borderRadius: "8px",
                borderColor: "#1976d2",
                "&:hover": {
                  borderColor: "#1976d2",
                },
              }}
            >
              구매하기
            </Button>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default DisplayableProducts;
