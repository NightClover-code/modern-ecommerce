import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export const useUserActions = () => {
  const dispatch = useDispatch();

  // return useMemo(() => {
  // return bindActionCreators(UserActionCreators, dispatch);
  // }, [dispatch]);
};
