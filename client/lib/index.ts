import axios from 'axios';

export const proshopAPI = axios.create({
  baseURL: process.env.PRODUCTS_API_URL || 'http://localhost:4000',
});
