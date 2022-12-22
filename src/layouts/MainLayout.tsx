import AppBar from "@mui/material/AppBar";
import { Container } from "@mui/system";
import React, { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <AppBar
        sx={{
          padding: 1,
        }}
        position="sticky"
      >
        <img src="/mediakeys.png" width={40} alt="logo" />
      </AppBar>
      <Container sx={{ margin: "30px auto" }}>{children}</Container>
    </>
  );
};

export { MainLayout };
