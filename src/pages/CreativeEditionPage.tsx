import { useParams, Navigate, useNavigate } from "react-router-dom";
import { CreativeForm } from "../components/CreativeForm/CreativeForm";
import { MainLayout } from "../layouts/MainLayout";
import { Creative } from "../types/creative";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { API_PATHS, ROUTER_PATHS } from "../constants/path";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CreativeEditionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    isLoading: isCreativeLoading,
    error: creativeError,
    data: creativeData,
  } = useQuery<Creative, Error>(["creative"], async () => {
    const url = new URL(API_PATHS.creatives + "/" + id);
    const res = await axios.get(url.toString());
    return res.data;
  });

  const { mutate: deleteCreativeMutation } = useMutation((id: string) => {
    const url = new URL(API_PATHS.creatives + "/" + id);
    return axios.delete(url.toString());
  });

  const { mutate: saveCreativeMutation } = useMutation((creative: Creative) => {
    const url = new URL(API_PATHS.creatives + "/" + creative.id);
    return axios.put(url.toString(), creative);
  });

  const handleSave = (creative: Creative) => {
    saveCreativeMutation(creative, {
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
  }

  if (creativeError || !creativeData) {
    return <Navigate to={ROUTER_PATHS.ROOT} />;
  }

  return (
    <MainLayout>
      <CreativeForm
        creative={creativeData}
        onCancel={handleCancel}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </MainLayout>
  );
};

export { CreativeEditionPage };
