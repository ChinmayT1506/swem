import { GET_SCHEME_DATA } from "../types/schemeType"

export const getSchemeData = (value) => {
    return async(dispatch) => {
        dispatch({
            type: GET_SCHEME_DATA,
            payload: value,
            isLoading: false,
            msg: "Scheme data added"
        })
    }
}
