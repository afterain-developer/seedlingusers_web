import { FETCH_ERROR, FETCH_SIDEBAR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, GET_DATA_CITY, GET_DATA_COUNTRY, GET_DATA_PROVINCE, IS_DATA_UPDATE } from '../../../@jumbo/constants/ActionTypes';

export const fetchSuccess = (message) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUCCESS,
      payload: message || '',
    });
  };
};
export const fetchError = (error) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_ERROR,
      payload: error,
    });
  };
};

export const fetchStart = () => {
  return (dispatch) => {
    dispatch({
      type: FETCH_START,
    });
  };
};
export const fetchSidebar = (data) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SIDEBAR,
      payload: data,
    });
  };
};
export const showMessage = message => {
  return (dispatch) => {
    dispatch({
      type: SHOW_MESSAGE,
      payload: message,
    });
  };
};

export const getCity = data => {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_CITY,
      payload: data,
    });
  };
};

export const getProvince = data => {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_PROVINCE,
      payload: data,
    });
  };
};


export const getCountries = data => {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_COUNTRY,
      payload: data,
    });
  };
};

export const updataData = () => {
  return {
    type: IS_DATA_UPDATE,
  }
}


