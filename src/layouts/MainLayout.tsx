import { Box, Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import { Container } from "@mui/system";
import { ReactNode, useContext } from "react";
import { Link } from "react-router-dom";
import { ROUTER_PATHS } from "../constants/path";
import { AuthContext } from "../contexts/auth/auth.context";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link to={ROUTER_PATHS.ROOT}>
            <img src="/mediakeys.png" width={40} alt="logo" />
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {user && <Avatar>{`${user.firstName[0]}${user.lastName[0]}`}</Avatar>}
        </Toolbar>
      </AppBar>
      <Container sx={{ margin: "30px auto" }}>{children}</Container>
    </>
  );
};

export { MainLayout };
