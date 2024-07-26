import axios from 'axios';

const BASE_URL = 'https://your-medusa-backend.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
