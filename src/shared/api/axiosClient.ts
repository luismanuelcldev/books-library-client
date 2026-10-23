import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5001/api';

export const axiosClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});
