import { GET_EVENT_DATA } from "../types/eventType";

let initialState = {
    EventDataArr: []
}

export const getEventData = (state= initialState, action) => {
    console.log(action.payload, "payload is here")
    switch (action.type) {
        case GET_EVENT_DATA:
            return {
                ...state,
                EventDataArr: action.payload
            };
        default:
            return state
    }
}

