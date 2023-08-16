import { GET_SCHEME_DATA } from "../types/schemeType";

let initialState = {
    schemeDataArr: []
}

export const getSchemeData = (state= initialState, action) => {
    console.log(action.payload, "payload is here")
    switch (action.type) {
        case GET_SCHEME_DATA:
            return {
                ...state,
                schemeDataArr: action.payload
            };
        // case GET_SCHEME_DATA_PAGINATION   
        default:
            return state
    }
}

