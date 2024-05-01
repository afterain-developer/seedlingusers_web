import { FETCH_ERROR, LOGOUT_ACTION, SHOW_MESSAGE } from "@jumbo/constants/ActionTypes";


export function errorHandler(error, dispatch) {
    dispatch({ type: FETCH_ERROR });
    if (error.response) {
        if (error.response.status === 401) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.clear();
            dispatch({ type: LOGOUT_ACTION });
            setTimeout(() => {
                dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
            }, 200)
        } else if (error.response.data) {
            dispatch({ type: FETCH_ERROR, payload: error.response.data.message });
        }
        dispatch({ type: FETCH_ERROR, payload: '' });
        console.log('Error****:', error.response.data.message);
    } else {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        dispatch({ type: FETCH_ERROR, payload: '' });
    }
};

