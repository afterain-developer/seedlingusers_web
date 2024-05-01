import jwtAuthAxios from "./auth/jwtAuth";
import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, SHOW_MESSAGE, FETCH_FARM } from "@jumbo/constants/ActionTypes";
import { errorHandler } from "app/helper/apiErrorHandler";

function objectHandel(values) {
  return Object.values(localStorage.getItem('language') == 'ko' ? values?.displayMessage : values?.message)[0]
}

// Get OTP
export const getOptAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/mobile/getotp', Data).then((res) => {
      if (res.data.status) {
        dispatch({ type: FETCH_SUCCESS });
        console.log("OTP =======>  ", res.data.data);
        dispatch({ type: SHOW_MESSAGE, payload: res.data.message, });
        if (cb) cb(true)
      } else {
        if (res.data.message == "User is not valid!") {
          dispatch({ type: FETCH_SUCCESS });
          if (cb) cb("registration")
        } else {
          if (cb) cb(false)
          dispatch({ type: FETCH_ERROR, payload: res.data.message });
        }
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

// In diffed  
export const loginAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['Type'] = 'Admin'
    jwtAuthAxios.post('/mobile/login', Data).then((res) => {
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
// In diffed  
export const loginUserAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.defaults.headers.common['Type'] = 'User'
    jwtAuthAxios.post('/mobile/login', Data).then((res) => {
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


export const registrationOTP = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/mobile/getregisterotp', Data).then((res) => {
      if (res.data.status) {
        console.log("OTP =======>  ", res.data.data);
        dispatch({ type: FETCH_SUCCESS });
        localStorage.setItem('token', res.data.token)
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


// export const loginAPI = (Data, cb) => {
//   return (dispatch) => {
//     dispatch({ type: FETCH_START });
//     jwtAuthAxios.post('/login', Data).then((res) => {
//       if (res.data.status) {
//         dispatch({ type: FETCH_SUCCESS });
//         // dispatch({ type: SHOW_MESSAGE, payload: res.data.message, });
//         localStorage.setItem('token', res.data.token)
//         if (cb) cb(res.data.data)
//       } else {
//         dispatch({ type: FETCH_ERROR, payload: res.data.message });
//       }
//     }).catch((error) => {
//       if (typeof (error) == 'object' && typeof (error?.message) == 'object') {
//         dispatch({ type: FETCH_ERROR, payload: objectHandel(error) })
//       } else {
//         errorHandler(error, dispatch)
//       }
//     })
//   }
// }


// /mobile/register
export const registerAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/mobile/register', Data).then((res) => {
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


export const resetPasswordAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/resetpassword', Data).then((res) => {
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


export const changePasswordAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/change/password', Data).then((res) => {
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


export const forgotPasswordAPI = (Data, cb) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    jwtAuthAxios.post('/forgot/password', Data).then((res) => {
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
