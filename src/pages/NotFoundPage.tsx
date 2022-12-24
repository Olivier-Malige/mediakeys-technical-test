import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ROUTER_PATHS } from "../constants/path";
import { MainLayout } from "../layouts/MainLayout";

const NotFoundPage = () => {
  return (
    <MainLayout>
      <Grid
        container
        sx={{ margin: 10 }}
        direction="column"
        justifyContent="center"
        spacing={2}
      >
        <Grid item>
          <Typography align="center" variant="h3">
            404 - Page not Found
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent={"center"}>
            <Link to={ROUTER_PATHS.ROOT}>Return to home</Link>
          </Grid>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export { NotFoundPage };
