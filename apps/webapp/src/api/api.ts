import axios from 'axios';

const api = () => {
  const _api = axios.create({
    baseURL: '/api',
  });
  _api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      throw error.response.data;
    },
  );
  return _api;
};

const get = (url: string) => () => api().get(url);
const post =
  <T>(url: string) =>
  (body: T) =>
    api().post(url, body);

export const registerLocal = post<{ email: string; password: string }>(
  '/auth/local/register',
);
export const loginLocal =
  post<{ email: string; password: string }>('/auth/local/login');
export const getProfile = get('/auth/jwt/profile');
export const getHello = get('/hello');
