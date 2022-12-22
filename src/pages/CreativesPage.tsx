import React from "react";
import { Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CreativesList } from "../components/CreativeList/CreativesList";
import { CreativeDetail } from "../components/CreativeDetail/CreativeDetail";
import { MainLayout } from "../layouts/MainLayout";

const creatives = [
  {
    title: "Title creative 1",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600"],
    enabled: true,
  },
  {
    title: "Title creative 2",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600"],
    enabled: true,
    description:
      "Ekkovpu henuheewa mec fikpune likohfu vamuz hifeeta vabhec go oma aggunpo du zocme pu abihoki. Use row hebihcoc sa pujdide bur wubopiek ba okanavgu tegiz wavpop tizu apohup re tuca. Hunu us elecuj opmaba jerrasad eb bicsu zo mepak penbiva usafu mamkala.",
    content: "Cadiji dohfewwez poroci om suhfop",
  },
  {
    title: "Title creative 3",
    users: ["AB", "CD"],
    formats: ["120x120", "60x600", "43x300", "400x250"],
    enabled: true,
  },
  {
    title: "Title creative 4",
    users: ["DE"],
    formats: ["120x120", "60x600"],
    enabled: true,
  },
  {
    title: "Title creative 5",
    users: ["AB", "CD", "EF"],
    formats: ["120x120", "60x600", "43x300"],
    enabled: false,
  },
];

const CreativesPage = () => {
  return (
    <MainLayout>
      <Grid container spacing={3} direction={"column"}>
        <Grid item>
          <CreativesList creatives={creatives} />
        </Grid>
        <Grid item>
          <Grid container justifyContent="center">
            <Pagination count={10} />
          </Grid>
        </Grid>
        <Grid item>
          <CreativeDetail
            creative={{
              title: "Title creative 2",
              users: ["AB", "CD"],
              formats: ["120x120", "60x600"],
              enabled: true,
              description:
                "Ekkovpu henuheewa mec fikpune likohfu vamuz hifeeta vabhec go oma aggunpo du zocme pu abihoki. Use row hebihcoc sa pujdide bur wubopiek ba okanavgu tegiz wavpop tizu apohup re tuca. Hunu us elecuj opmaba jerrasad eb bicsu zo mepak penbiva usafu mamkala.",
              content: "Cadiji dohfewwez poroci om suhfop",
            }}
          />
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export { CreativesPage };
