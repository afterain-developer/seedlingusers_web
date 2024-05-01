import jwtAuthAxios from "./auth/jwtAuth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}
export const modifyFieldAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/field/add', Data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage, });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const fetchFieldAPI = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.get('/mobile/field/list').then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const fetchEventAPI = (fieldId, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/event/list', fieldId).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const fetchEventFieldAPI = (fieldId, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/event/getdata', fieldId).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const modifyEventAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/event/add', data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const removeFieldAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/field/delete', data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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

export const removeEventAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/event/delete', data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage });
        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.displayMessage });
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