import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { CreativeForm } from '../components/CreativeForm/CreativeForm';
import { MainLayout } from '../layouts/MainLayout';
import { Creative } from '../interfaces/creative';
import { useMutation, useQuery } from 'react-query';
import { ROUTER_PATHS } from '../constants/path';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { deleteCreative, getCreative, updateCreative } from '../api/creatives';

const CreativeEditionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isCreativeLoading,
    error: creativeError,
    data: creativeData,
  } = useQuery<Creative, Error>(['creative'], async () => {
    if (!id) {
      return;
    }
    return getCreative(id);
  });

  const { mutate: deleteCreativeMutation } = useMutation((id: string) => {
    return deleteCreative(id);
  });

  const { mutate: updateCreativeMutation } = useMutation((creative: Creative) => {
    return updateCreative(creative);
  });

  const handleSave = (creative: Creative) => {
    updateCreativeMutation(creative, {
      onSuccess: () => {
        navigate(ROUTER_PATHS.ROOT);
      },
    });
  };

  const handleDelete = (creativeId: string) => {
    deleteCreativeMutation(creativeId, {
      onSuccess: () => {
        navigate(ROUTER_PATHS.ROOT);
      },
    });
  };

  const handleCancel = () => {
    navigate(ROUTER_PATHS.ROOT);
  };

  if (isCreativeLoading) {
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

  if (creativeError || !creativeData) {
    return <Navigate to={ROUTER_PATHS.ROOT} />;
  }

  return (
    <MainLayout>
      <CreativeForm creative={creativeData} onCancel={handleCancel} onDelete={handleDelete} onSave={handleSave} />
    </MainLayout>
  );
};

export { CreativeEditionPage };
