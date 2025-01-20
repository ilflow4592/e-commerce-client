"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { Product } from "app/admin/entity/product/Product";
import Image from "next/image";

interface DisplayableProductsProps {
  products: Product[];
}

const imageLoader = ({ src }: { src: string }) => {
  return src; // Presigned URL 그대로 반환
};

const DisplayableProducts = ({ products }: DisplayableProductsProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px",
      }}
    >
      {products.map((product: Product) => (
        <Card
          key={product.id}
          sx={{
            width: 200,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Image
              loader={imageLoader}
              src={product.fileUrl}
              width={100}
              height={100}
              alt={product.fileName}
            />
          </Box>
          <CardContent>
            <Typography gutterBottom variant="body1">
              {product.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold", color: "red" }}
            >
              {product.unitPrice}원
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default DisplayableProducts;
