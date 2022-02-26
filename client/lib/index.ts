import axios from 'axios';
import { loadScript } from '@paypal/paypal-js';

export const proshopAPI = axios.create({
  baseURL: process.env.PRODUCTS_API_URL || 'http://localhost:4000',
});

// let paypal;

// try {
//     paypal = await loadScript({ "client-id": "test" });
// } catch (error) {
//     console.error("failed to load the PayPal JS SDK script", error);
// }

// if (paypal) {
//     try {
//         await paypal.Buttons().render("#your-container-element");
//     } catch (error) {
//         console.error("failed to render the PayPal Buttons", error);
//     }
// }
