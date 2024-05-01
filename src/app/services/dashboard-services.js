import jwtAuthAxios from "./auth/jwtAuth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}

export const dashboardGetList = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/dashboard/registered/list').then((res) => {
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

export const dashboardGetSecretsSentList = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/dashboard/registered/secrets/list').then((res) => {
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

export const dashboardGetDeviceType = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/dashboard/deviceType/list').then((res) => {
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

// ------------------station counts -----------------
export const stationCounts = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/dashboard/station/count').then((res) => {
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

// ------------------ Anomaly sensor counts -----------------
export const anomalySensorCounts = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/dashboard/sensor/count').then((res) => {
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

export const influxBackendCalciData = (obj, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.post('/dashboard/influxBackendCalciData', obj).then((res) => {
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