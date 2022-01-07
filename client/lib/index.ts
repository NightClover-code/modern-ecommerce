import axios from 'axios';

export const productsAPI = axios.create({
  baseURL: process.env.PRODUCTS_API_URL || 'http://localhost:4000',
});
