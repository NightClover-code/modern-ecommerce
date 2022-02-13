// import { Dispatch } from 'redux';
// import { proshopAPI } from '../../lib';
// import { ActionTypes } from './order.action-types';
// import { ProductsAction } from './order.actions';

// export const fetchProduct =
//   (id: string) => async (dispatch: Dispatch<ProductsAction>) => {
//     try {
//       dispatch({
//         type: ActionTypes.FETCH_PRODUCT_START,
//       });

//       const { data } = await proshopAPI.get(`/products/${id}`);

//       dispatch({
//         type: ActionTypes.FETCH_PRODUCT_SUCCESS,
//         payload: data,
//       });
//     } catch (error: any) {
//       dispatch({
//         type: ActionTypes.FETCH_PRODUCT_ERROR,
//         payload: error.response.data.message,
//       });
//     }
//   };
