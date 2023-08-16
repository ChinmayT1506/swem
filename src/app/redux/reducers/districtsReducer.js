import { GET_MASTER_DISTRICT } from "../types/districtsType";

let initialState = {
    DistrictDataArr: []
}

export const getDistrictsData = (state= initialState, action) => {
    console.log(action.payload, "payload is here")
    switch (action.type) {
        case GET_MASTER_DISTRICT:
            return {
                ...state,
                DistrictDataArr: action.payload
            };
        default:
            return state
    }
}

