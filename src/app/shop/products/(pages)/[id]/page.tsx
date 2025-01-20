"use client";

import { decodeFromBase64Query } from "app/shop/utils/base64";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  return src; // Presigned URL 그대로 반환
};

const ProductDetail = () => {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get("data");

  console.log(encodedData);

  const product = encodedData
    ? decodeFromBase64Query(`data=${encodedData}`)
    : null;

  if (!product) return <Typography>상품 정보를 불러오는 중...</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          boxShadow: "none",
          borderRadius: "12px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            borderRadius: "8px",
          }}
        >
          <Image
            loader={imageLoader}
            src={product.fileUrl}
            alt={product.fileName}
            width={300}
            height={400}
            style={{
              objectFit: "contain",
            }}
          />
        </Box>

        <CardContent sx={{ padding: "20px" }}>
          {/* 카테고리 */}
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#666", mb: 1 }}
          >
            {product.category}({product.size})
          </Typography>

          {/* 상품명 */}
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.name}
          </Typography>

          {/* 설명 */}
          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
            {product.description}
          </Typography>

          {/* 재고 정보 */}
          <Typography
            variant="body2"
            sx={{ color: "#d32f2f", fontWeight: "bold", mb: 1 }}
          >
            {product.stockQuantity > 0
              ? `재고 있음 (${product.stockQuantity}개 남음)`
              : "품절"}
          </Typography>

          {/* 가격 정보 */}
          <Box
            sx={{ display: "flex", alignItems: "center", gap: "10px", mb: 2 }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#d32f2f" }}
            >
              {product.unitPrice.toLocaleString()}원
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* 버튼 영역 */}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              startIcon={<ShoppingCartIcon />}
              sx={{
                flex: 1,
                color: "#1976d2",
                borderColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1976d2",
                  color: "white",
                },
              }}
            >
              장바구니
            </Button>

            <Button
              variant="contained"
              sx={{
                flex: 2,
                backgroundColor: "#ff9800", // 오렌지색으로 변경
                color: "white",
                "&:hover": {
                  backgroundColor: "#e68900",
                },
              }}
            >
              구매하기
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductDetail;
