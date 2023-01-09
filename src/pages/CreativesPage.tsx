import React, { useEffect, useState } from 'react';
import { CircularProgress, Pagination } from '@mui/material';
import { CreativesList } from '../components/CreativeList/CreativesList';
import { CreativeDetail } from '../components/CreativeDetail/CreativeDetail';
import { MainLayout } from '../layouts/MainLayout';
import { useMutation, useQuery } from 'react-query';
import { Creative } from '../interfaces/creative';
import Box from '@mui/system/Box';
import { enableCreative, getCreatives } from '../api/creatives';

const CreativesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCreative, setSelectedCreative] = useState<Creative>();

  const {
    isLoading: isCreativesLoading,
    error: creativesError,
    data: creativesData,
    refetch,
  } = useQuery<Creative[], Error>(['creatives'], async () => {
    const { creatives, totalPages } = await getCreatives(currentPage);
    setTotalPages(totalPages);
    return creatives;
  });

  interface EnableCreativeMutationPayload {
    id: string;
    enabled: boolean;
  }

  const enableCreativeMutation = useMutation((payload: EnableCreativeMutationPayload) => {
    return enableCreative(payload.id, payload.enabled);
  });

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
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

  if (isCreativesLoading) {
    return (
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            height: '80vh',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </MainLayout>
    );
  }

  if (creativesError) {
    return <MainLayout>An error has occurred: {creativesError} </MainLayout>;
  }

  return (
    <MainLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
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
            alignSelf: 'center',
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
