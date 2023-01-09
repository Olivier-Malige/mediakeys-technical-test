import axios from 'axios';
import { API_PATHS } from '../constants/path';
import { Creative } from '../interfaces/creative';

async function getCreatives(currentPage: number, limit: number = 5) {
  const url = new URL(API_PATHS.CREATIVES);
  url.searchParams.set('_sort', 'lastModified');
  url.searchParams.set('_order', 'desc');
  url.searchParams.set('_page', currentPage.toString());
  url.searchParams.set('_limit', limit.toString());

  const res = await axios.get(url.toString());

  return {
    creatives: res.data,
    totalPages: Math.ceil(Number(res.headers['x-total-count']) / limit),
  };
}

async function getCreative(id: string) {
  const res = await axios.get(API_PATHS.CREATIVES + id);
  return res.data;
}

async function deleteCreative(id: string) {
  return await axios.delete(API_PATHS.CREATIVES + id);
}

async function updateCreative(creative: Creative) {
  return await axios.put(API_PATHS.CREATIVES + creative.id, creative);
}

async function enableCreative(id: string, enabled: boolean) {
  return await axios.patch(API_PATHS.CREATIVES + id, { enabled });
}

export { getCreatives, getCreative, deleteCreative, updateCreative, enableCreative };
