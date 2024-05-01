import jwtAuthAxios from "./auth/jwtAuth";

import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}
export const fetchSingleUserAPI = (ID, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get(`/user/${ID}`,).then((res) => {
      if (res.data.status) {
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

export const profileEdit = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.put('/profile', Data).then((res) => {
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

export const themeEdit = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.post('/themeColor', Data).then((res) => {
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


export const insertUserLogOut = (Object, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post(`/mobile/updateconfig`, Object).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data)
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