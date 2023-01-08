import axios from "axios";
import { API_PATHS } from "../constants/path";

async function getAuthUser() {
  const res = await axios.get(API_PATHS.USER);
  return res.data;
}

export { getAuthUser };
