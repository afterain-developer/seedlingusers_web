import jwtAuthAxios from "./auth/jwtAuth";

import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}
export const fetchWorkLogRecord = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/get', data).then((res) => {
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

export const fetchWorklogData = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/getData', Data).then((res) => {
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
export const workLogTypeBaseManufacturesAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/manufacetures', Data).then((res) => {
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

export const WorkLogGraphAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/durationData', Data).then((res) => {
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

export const modifyWorkLog = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/addEdit', Data).then((res) => {
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

export const removeWorkLogAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/worklog/delete', Data).then((res) => {
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

export const modifyFavouriteAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/favsecret/addEdit', Data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        // dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage });
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
export const removeFavouriteAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.defaults.headers.common['Farmid'] = localStorage.getItem('farmId');
    jwtAuthAxios.defaults.headers.common['Lang'] = localStorage.getItem('language') == 'en' ? 'en' : 'kr';
    jwtAuthAxios.post('/mobile/favsecret/delete', Data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        // dispatch({ type: SHOW_MESSAGE, payload: res.data.displayMessage });
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


