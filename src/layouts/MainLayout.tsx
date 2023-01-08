import { Box, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/auth/auth.context";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppBar
        sx={{
          padding: 1,
        }}
        position="sticky"
      >
        <Toolbar>
          <img src="/mediakeys.png" width={40} alt="logo" />
          <Box sx={{ flexGrow: 1 }} />
          {user && <Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>}
        </Toolbar>
      </AppBar>
      <Container sx={{ margin: "30px auto" }}>{children}</Container>
    </>
  );
};

export { MainLayout };
