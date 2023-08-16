import { DELETE_LOGIN_DATA, GET_LOGIN_DATA } from "../types/loginType";

let initialState = {
    loginData: []
}

export const getLoginData = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case GET_LOGIN_DATA:
            return {
                ...state,
                loginData: action.payload
            };
        case DELETE_LOGIN_DATA:
            return {
                ...state,
                loginData: []
            };
        default:
            return state
    }
}
