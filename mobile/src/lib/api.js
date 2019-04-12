import axios from 'axios';

import { apiServerUri } from '../../config';

const options = {
  baseURL: apiServerUri,
  headers: {
    Accept: 'application/json',
    Cache: 'no-cache',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const instance = axios.create(options);

export const getTest = () => instance.get('/api/test');

// ====== 회원가입
export const registUser = ({ email, password }) => instance.post('/api/auth/register', { email, password });
// ====== login
export const login = ({ email, password }) => instance.post('/api/auth/local-login', { email, password });
// ====== 토큰 유효성 검사
export const tokenCheck = (token) => (
  axios.get('/api/auth/check', {
    baseURL: apiServerUri,
    headers: {
      ...options.headers,
      'x-access-token': token,
    },
    withCredentials: true,
  })
);
// ====== 악세스 토큰 재발급
export const refreshToken = (token) => (
  axios.get('/api/auth/refresh-token', {
    baseURL: apiServerUri,
    headers: {
      ...options.headers,
      'x-refresh-token': token,
    },
    withCredentials: true,
  })
);
