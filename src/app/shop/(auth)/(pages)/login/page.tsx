"use client";

import { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import Wrapper from "app/admin/components/style/Wrapper";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", form);
      alert(response.data.message);
    } catch (error) {
      const err = error as AxiosError;

      console.error("Axios Error:", err.message);
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
                onClick={() => router.push("/shop/register")}
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
