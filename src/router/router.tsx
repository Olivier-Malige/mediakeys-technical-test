import { createBrowserRouter } from "react-router-dom";
import { ROUTER_PATHS } from "../constants/path";
import { CreativeEditionPage } from "../pages/CreativeEditionPage";
import { CreativesPage } from "../pages/CreativesPage";
import { NotFoundPage } from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.ROOT,
    element: <CreativesPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: ROUTER_PATHS.CREATIVE + "/:id",
    element: <CreativeEditionPage />,
    errorElement: <NotFoundPage />,
  },
]);

export { router };
