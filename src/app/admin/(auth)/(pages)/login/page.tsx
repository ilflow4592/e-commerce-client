"use client";

import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios from "axios";
import Wrapper from "app/admin/components/style/Wrapper";
import { useRouter } from "next/navigation";
import { useAuth } from "../../provider/AuthProvider";
import { useGlobalSnackbar } from "app/GlobalSnackbarProvider";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const { showMessage } = useGlobalSnackbar();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const { setIsLogin } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/v1/users/login", form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      showMessage({
        message: "로그인 성공!",
        severity: "success",
      });

      setIsLogin(true);

      const userCheck = await axios.get(
        "http://localhost:8080/api/v1/users/me",
        { withCredentials: true }
      );
      if (userCheck.data) {
        router.push("/admin/products");
      } else {
        showMessage({
          message: "로그인 상태를 확인할 수 없습니다.",
          severity: "error",
        });
      }
    } catch (error) {
      showMessage({
        message: "로그인에 실패했습니다.",
        severity: "error",
      });
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{}}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                로그인
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => router.push("/admin/register")}
              >
                회원가입
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Wrapper>
  );
}
