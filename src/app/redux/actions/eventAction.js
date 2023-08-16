import { GET_EVENT_DATA } from "../types/eventType"

export const getEventData = (value) => {
    console.log("sdsdsds", value)
    return async(dispatch) => {
        dispatch({
            type: GET_EVENT_DATA,
            payload: value,
            isLoading: false,
            msg: "Event data added"
        })
    }
}
