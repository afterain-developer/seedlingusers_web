import { FETCH_FARM, FETCH_FARM_RECORDS } from '@jumbo/constants/ActionTypes';

const INIT_STATE = {
    farmId: '',
    farmName: '',
    farmAddress: '',
    isMain: 0,
    FarmDetails: [],
    FarmRecord: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case FETCH_FARM: {
            return {
                ...state,
                farmId: action?.farmId,
                farmName: action?.farmName,
                farmAddress: action?.farmAddress,
                isMain: action?.isMain,
                FarmDetails: action?.payload
            };
        }
        case FETCH_FARM_RECORDS: {
            return {
                ...state,
                FarmRecord: action?.payload
            };
        }
        default:
            return state;
    }
};
