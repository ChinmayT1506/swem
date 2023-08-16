import { DELETE_LOGIN_DATA, GET_LOGIN_DATA } from "../types/loginType"

export const getLoginData = (value) =>{
    return async (dispatch) => {
        dispatch({
            type: GET_LOGIN_DATA,
            payload: value,
            isLoading: false,
            msg: "login data saved in store",
        })
    }
}

export const delLoginData = (value) => {
    return async (dispatch) => {
        dispatch({
            type: DELETE_LOGIN_DATA,
            payload: value,
            isLoading: false,
            msg: "login data deleted from store",
        })
    }
}