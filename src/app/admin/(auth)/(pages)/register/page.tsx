"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import Wrapper from "app/admin/components/style/Wrapper";
import { useRouter } from "next/navigation";
import { useGlobalSnackbar } from "app/GlobalSnackbarProvider";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
}

export default function Register() {
  const { showMessage } = useGlobalSnackbar();
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "USER",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/users/register", form);

      showMessage({
        message: "회원가입 성공!",
        severity: "success",
      });

      router.push("/admin/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error?.response?.status;
        const errors = error?.response?.data;
        console.log("error.response.", error.response);

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
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="이름"
              name="name"
              value={form.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="이메일"
              name="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
              type="email"
            />
            <TextField
              fullWidth
              label="비밀번호"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
              type="password"
            />
            <TextField
              fullWidth
              label="전화번호"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              select
              fullWidth
              label="역할"
              name="role"
              value={form.role}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </TextField>
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Wrapper>
  );
}
