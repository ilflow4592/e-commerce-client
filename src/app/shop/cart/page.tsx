"use client";

import { Product } from "app/admin/entity/product/Product";
import useLocalStorageWithEvent from "app/hooks/useLocalStorageWithEvent";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageWithSkeleton from "../components/ImageWithSceleton";

const groupCartItems = (cartProducts: Product[]) => {
  const groupedItems: {
    [key: number]: { product: Product; quantity: number };
  } = {};

  cartProducts.forEach((product) => {
    if (groupedItems[product.id]) {
      groupedItems[product.id].quantity += 1;
    } else {
      groupedItems[product.id] = { product, quantity: 1 };
    }
  });

  return Object.values(groupedItems);
};

const CartPage = () => {
  const [cartProducts, setCartProducts] =
    useLocalStorageWithEvent("cartProducts");

  // 동일한 상품 묶어서 개수 계산
  const groupedCart = groupCartItems(cartProducts);

  // 상품 추가 (개수를 1 증가)
  const addItem = (product: Product) => {
    setCartProducts([...cartProducts, product]);
  };

  // 특정 상품 개수 1 감소 (만약 1개만 남아 있으면 제거)
  const removeOneItem = (id: number) => {
    const index = cartProducts.findIndex(
      (product: Product) => product.id === id
    );
    if (index !== -1) {
      const updatedCart = [...cartProducts];
      updatedCart.splice(index, 1); // 첫 번째 발견된 항목 삭제
      setCartProducts(updatedCart);
    }
  };

  // 특정 상품 완전히 제거
  const removeItem = (id: number) => {
    const updatedCart = cartProducts.filter(
      (product: Product) => product.id !== id
    );
    setCartProducts(updatedCart);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "30px" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}
      >
        Cart
      </Typography>

      {groupedCart.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", color: "#666" }}>
          Cart is empty.
        </Typography>
      ) : (
        groupedCart.map(({ product, quantity }) => (
          <Card
            key={product.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginBottom: "15px",
            }}
          >
            <ImageWithSkeleton
              src={product.fileUrl}
              alt={product.fileName}
              width={100}
              height={100}
            />

            {/* 상품 정보 */}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {product.name} ({quantity}개)
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                {product.description}
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", color: "#d32f2f" }}
              >
                {(product.unitPrice * quantity).toLocaleString()}원
              </Typography>

              {/* 수량 조절 버튼 */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <IconButton
                  onClick={() => removeOneItem(product.id)}
                  sx={{ color: "#d32f2f" }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1">{quantity}</Typography>
                <IconButton
                  onClick={() => addItem(product)}
                  sx={{ color: "#1976d2" }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>

            {/* 삭제 버튼 */}
            <IconButton
              onClick={() => removeItem(product.id)}
              sx={{ color: "#d32f2f" }}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
        ))
      )}

      {/* 장바구니 비우기 버튼 */}
      {groupedCart.length > 0 && (
        <Button
          variant="contained"
          sx={{
            marginTop: "20px",
            backgroundColor: "#ff9800",
            color: "white",
            fontWeight: "bold",
            width: "100%",
          }}
          onClick={() => setCartProducts([])}
        >
          장바구니 비우기
        </Button>
      )}
    </Container>
  );
};

export default CartPage;
