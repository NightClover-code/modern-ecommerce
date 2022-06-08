import axios from 'axios';

export const proshopAPI = axios.create({
  baseURL: 'https://modern-commerce.herokuapp.com',
});
