import jwtAuthAxios from "./auth/jwtAuth";
import axios from "axios";

import { WEATHER_API_KEY, OPEN_WEATHER_API, DAILY_FORECAST_API_URL, WEATHER_API_URL, FORECAST_API_URL } from "./auth/jwtAuth";

import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}

export const weatherFetchAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    const getLanguage = localStorage.getItem('language')
    const apiData = {
      lat: data.lat,
      lon: data.long,
      appid: WEATHER_API_KEY,
      lang: getLanguage == 'en' ? 'en' : 'kr',
      units: 'metric',
    };

    axios.get(WEATHER_API_URL, { params: apiData }).then((res) => {
      if (res.data) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data)
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

export const forecastFetchAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    const apiData = {
      lat: data.lat,
      lon: data.long,
      appid: WEATHER_API_KEY,
      lang: 'kr', //lang
      units: 'metric',
    };

    axios.get(FORECAST_API_URL, { params: apiData }).then((res) => {
      if (res.data) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data)
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

export const dailyFetchAPI = (data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    const apiData = {
      lat: data.lat,
      lon: data.long,
      appid: WEATHER_API_KEY,
      lang: 'kr', //lang
      units: 'metric',
      cnt: '8', //sevenDaysApi
    };

    axios.get(DAILY_FORECAST_API_URL, { params: apiData }).then((res) => {
      if (res.data) {
        dispatch({ type: FETCH_SUCCESS });
        if (cb) cb(res.data)
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
// /api/ad/list


export const adsFetchListAPI = (cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    jwtAuthAxios.get('/api/ad/list').then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        // dispatch({ type: SHOW_MESSAGE, payload: res.data.message });

        if (cb) cb(res.data.data)
      } else {
        dispatch({ type: FETCH_ERROR, payload: res.data.message });
      }
    }).catch((error) => {
      errorHandler(error, dispatch)
    })
  }
}