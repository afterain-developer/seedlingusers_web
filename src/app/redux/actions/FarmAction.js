import { FETCH_FARM, FETCH_FARM_RECORDS } from '../../../@jumbo/constants/ActionTypes';

export const fetchFarms = (farmId, farmName, farmAddress, isMain, FarmDetails) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_FARM,
      farmId: farmId || '',
      farmName: farmName || '',
      farmAddress: farmAddress || '',
      isMain: isMain || '',
      payload: FarmDetails || '',
    });
  };
};

export const fetchFarmsRecord = data => {
  return (dispatch) => {
    dispatch({
      type: FETCH_FARM_RECORDS,
      payload: data || [],
    });
  };
};