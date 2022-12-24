const API_URL = "http://localhost:3001";

const API_PATHS = {
  creatives: API_URL + "/creatives",
};

enum ROUTER_PATHS {
  ROOT = "/",
  CREATIVE = "/creative",
}

export { API_PATHS, API_URL, ROUTER_PATHS };
