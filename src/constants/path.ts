const API_URL = 'http://localhost:3001';

const API_PATHS = {
  CREATIVES: API_URL + '/creatives/',
  USER: API_URL + '/user/',
};

enum ROUTER_PATHS {
  ROOT = '/',
  CREATIVE = '/creative',
}

export { API_PATHS, API_URL, ROUTER_PATHS };
