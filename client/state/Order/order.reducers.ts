// export const productsReducer = (
//   state: ProductsState = productsInitialState,
//   action: ProductsAction
// ): ProductsState => {
//   switch (action.type) {
//     case ActionTypes.FETCH_PRODUCTS_START:
//       return { ...state, loading: true, error: null };
//     case ActionTypes.FETCH_PRODUCTS_SUCCESS:
//       return { loading: false, data: action.payload, error: null };
//     case ActionTypes.FETCH_PRODUCTS_ERROR:
//       return { ...state, loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
