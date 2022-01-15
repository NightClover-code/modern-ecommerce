import { combineReducers } from 'redux';

export const reducers = combineReducers({
  lole: () => '',
});

export type RootState = ReturnType<typeof reducers>;
