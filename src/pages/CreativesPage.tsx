import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CreativesList } from "../components/CreativeList/CreativesList";
import { CreativeDetail } from "../components/CreativeDetail/CreativeDetail";
import { MainLayout } from "../layouts/MainLayout";
import { useQuery } from "react-query";
import { Creative } from "../Types/creative";
import { API_PATHS } from "../constants/path";
import Box from "@mui/system/Box";

const CreativesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCreative, setSelectedCreative] = useState<Creative>();

  const { isLoading, error, data, refetch, isFetching } = useQuery<
    Creative[],
    Error
  >(["creatives"], async () => {
    const LIMIT = 5;
    const url = new URL(API_PATHS.creatives);
    url.searchParams.set("_sort", "lastModified");
    url.searchParams.set("_order", "desc");
    url.searchParams.set("_page", currentPage.toString());
    url.searchParams.set("_limit", LIMIT.toString());

    const res = await axios.get(url.toString());
    setTotalPages(Math.ceil(Number(res.headers["x-total-count"]) / LIMIT));
    return res.data;
  });

  const handlePageChange = (event: any, page: number) => {
    setSelectedCreative(undefined);
    setCurrentPage(page);
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (isLoading || isFetching)
    return (
      <MainLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            height: "80vh",
            alignItems: "center",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </MainLayout>
    );

  if (error) return <MainLayout>An error has occurred: {error} </MainLayout>;

  return (
    <MainLayout>
      <Grid container spacing={3} direction={"column"}>
        <Grid item>
          <CreativesList
            setSelectedCreative={setSelectedCreative}
            creatives={data}
            selectedCreativeId={selectedCreative?.id}
          />
        </Grid>
        <Grid item>
          <Grid container justifyContent="center">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Grid>
        </Grid>
        {selectedCreative && (
          <Grid item>
            <CreativeDetail creative={selectedCreative} />
          </Grid>
        )}
      </Grid>
    </MainLayout>
  );
};

export { CreativesPage };
