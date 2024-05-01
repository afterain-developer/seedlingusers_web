import jwtAuthAxios from "../auth/jwtAuth";
import { FETCH_ERROR, FETCH_FARM_RECORDS, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}

export const farmModifyAPi = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.post('/mobile/farm/addedit', data).then((res) => {
      if (res.data.status) {
        dispatch({ type: SHOW_MESSAGE, payload: res.data.message, });
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.message });
      }
    }).catch((error) => {
      if (typeof (error) == 'object' && typeof (error?.message) == 'object') {
        dispatch({ type: FETCH_ERROR, payload: objectHandel(error) })
      } else {
        errorHandler(error, dispatch)
      }
    })
  }
}
export const farmFetchListAPI = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/mobile/farm/list').then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: FETCH_FARM_RECORDS, payload: res.data.data });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.message });
      }
    }).catch((error) => {
      if (typeof (error) == 'object' && typeof (error?.message) == 'object') {
        dispatch({ type: FETCH_ERROR, payload: objectHandel(error) })
      } else {
        errorHandler(error, dispatch)
      }
    })
  }
}

export const farmRemoveAPI = (farmId, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.post('/mobile/farm/delete', farmId).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.message, });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.message });
      }
    }).catch((error) => {
      if (typeof (error) == 'object' && typeof (error?.message) == 'object') {
        dispatch({ type: FETCH_ERROR, payload: objectHandel(error) })
      } else {
        errorHandler(error, dispatch)
      }
    })
  }
}

export const farmMainSelectApi = (farmId, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.post('/mobile/farm/setmain', farmId).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.message, });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.message });
      }
    }).catch((error) => {
      if (typeof (error) == 'object' && typeof (error?.message) == 'object') {
        dispatch({ type: FETCH_ERROR, payload: objectHandel(error) })
      } else {
        errorHandler(error, dispatch)
      }
    })
  }
}