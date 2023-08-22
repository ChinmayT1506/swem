import { GET_MASTER_BLOCK } from "../types/blockType"

export const getBlockData = (value) => {
    return async(dispatch) => {
        await dispatch({
            type: GET_MASTER_BLOCK,
            payload: value,
            isLoading: false,
            msg: "master data added"
        })
    }
}
