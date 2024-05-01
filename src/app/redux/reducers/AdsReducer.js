import { ADS_FETCH, ADS_NEXT, ADS_FLAG } from '@jumbo/constants/ActionTypes';
const INIT_STATE = {
    adsList: '',
    flag: false,
    number: 0,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ADS_FETCH: {
            return {
                ...state,
                adsList: action?.payload,
                flag: true,
                number: 0
            };
        }
        case ADS_NEXT: {
            return {
                ...state,
                number: action?.payload
            };
        }
        default:
            return state;
    }
};
