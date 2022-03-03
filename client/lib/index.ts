import axios from 'axios';
import { loadScript } from '@paypal/paypal-js';

export const proshopAPI = axios.create({
  baseURL: process.env.PRODUCTS_API_URL || 'http://localhost:4000',
});
