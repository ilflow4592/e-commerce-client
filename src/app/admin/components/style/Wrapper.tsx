"use client";

import { styled } from "@mui/material";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

const Container = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundColor: "#fff",
});
