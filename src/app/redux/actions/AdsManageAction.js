import { ADS_FETCH, ADS_NEXT, ADS_FLAG } from '../../../@jumbo/constants/ActionTypes';

export const fetchAds = (list) => {
  return (dispatch) => {
    dispatch({
      type: ADS_FETCH,
      payload: list
    });
  };
};
export const nextAds = (number) => {
  return (dispatch) => {
    dispatch({
      type: ADS_NEXT,
      payload: number
    });
  };
};