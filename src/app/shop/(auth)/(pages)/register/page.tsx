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
import axios, { AxiosError } from "axios";
import Wrapper from "app/admin/components/style/Wrapper";

interface FormData {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: "USER" | "ADMIN";
}

export default function Register() {
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
      const response = await axios.post("/api/register", form);
      alert(response.data.message);
    } catch (error) {
      const err = error as AxiosError;

      console.error("Axios Error:", err.message);
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
