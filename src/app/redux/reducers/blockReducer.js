import { GET_MASTER_BLOCK } from "../types/blockType";

let initialState = {
    blockDataArr: []
}

export const getMasterData = (state= initialState, action) => {
    console.log(action.payload, "payload is here")
    switch (action.type) {
        case GET_MASTER_BLOCK:
            return {
                ...state,
                blockDataArr: action.payload
            };
        default:
            return state
    }
}

