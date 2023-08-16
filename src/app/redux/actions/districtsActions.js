import { GET_MASTER_DISTRICT } from "../types/districtsType"

export const getDistrictsData = (value) => {
    // console.log("sdsdsds", value)
    return async(dispatch) => {
        dispatch({
            type: GET_MASTER_DISTRICT,
            payload: value,
            isLoading: false,
            msg: "master data added"
        })
    }
}
