import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import AuthReducer from './Auth';
import ApiReducer from './ApiReducer';
import FarmReducer from './FarmReducer';
import AdsReducer from './AdsReducer';

const exportReducers = history => {
    return combineReducers({
        router: connectRouter(history),
        auth: AuthReducer,
        ApiReducer: ApiReducer,
        FarmReducer: FarmReducer,
        AdsReducer: AdsReducer,
    });
};

export default exportReducers;

