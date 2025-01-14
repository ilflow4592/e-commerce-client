import { styled } from "@mui/material";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

const Container = styled("div")({
  marginTop: "120px",
  height: "1000vh",
});
