import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CreativesList } from "../components/CreativeList/CreativesList";
import { CreativeDetail } from "../components/CreativeDetail/CreativeDetail";
import { MainLayout } from "../layouts/MainLayout";
import { useMutation, useQuery } from "react-query";
import { Creative } from "../interfaces/creative";
import { API_PATHS } from "../constants/path";
import Box from "@mui/system/Box";

const CreativesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCreative, setSelectedCreative] = useState<Creative>();

  const {
    isLoading: isCreativesLoading,
    error: creativesError,
    data: creativesData,
    refetch,
  } = useQuery<Creative[], Error>(["creatives"], async () => {
    const LIMIT = 5;
    const url = new URL(API_PATHS.CREATIVES);
    url.searchParams.set("_sort", "lastModified");
    url.searchParams.set("_order", "desc");
    url.searchParams.set("_page", currentPage.toString());
    url.searchParams.set("_limit", LIMIT.toString());

    const res = await axios.get(url.toString());
    setTotalPages(Math.ceil(Number(res.headers["x-total-count"]) / LIMIT));
    return res.data;
  });

  interface EnableCreativeMutationPayload {
    id: string;
    enabled: boolean;
  }

  const enableCreativeMutation = useMutation(
    (payload: EnableCreativeMutationPayload) => {
      return axios.patch(`${API_PATHS.CREATIVES}/${payload.id}`, {
        enabled: payload.enabled,
      });
    }
  );

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSelectedCreative(undefined);
    setCurrentPage(page);
  };

  const handleEnableCreative = (id: string, enabled: boolean) => {
    enableCreativeMutation.mutate({
      id,
      enabled,
    });
  };

  useEffect(() => {
    refetch();
  }, [currentPage, refetch, enableCreativeMutation.isSuccess]);

  if (isCreativesLoading)
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

  if (creativesError)
    return <MainLayout>An error has occurred: {creativesError} </MainLayout>;

  return (
    <MainLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <CreativesList
          setSelectedCreative={setSelectedCreative}
          creatives={creativesData}
          selectedCreativeId={selectedCreative?.id}
          onEnable={handleEnableCreative}
        />

        <Pagination
          sx={{
            alignSelf: "center",
          }}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />

        {selectedCreative && <CreativeDetail creative={selectedCreative} />}
      </Box>
    </MainLayout>
  );
};

export { CreativesPage };
