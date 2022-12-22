import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { CreativeEditionPage } from "../pages/CreativeEditionPage";
import { CreativesPage } from "../pages/CreativesPage";
import { NotFoundPage } from "../pages/NotFoundPage";

enum RouterPaths {
  ROOT = "/",
  CREATIVE = "/creative",
}

const router = createBrowserRouter([
  {
    path: RouterPaths.ROOT,
    element: <CreativesPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: RouterPaths.CREATIVE + "/:id",
    element: <CreativeEditionPage />,
    errorElement: <NotFoundPage />,
  },
]);

export { router, RouterPaths };
