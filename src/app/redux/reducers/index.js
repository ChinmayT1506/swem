import { combineReducers } from "redux";
import { getLoginData } from "./loginReducer";
import { getSchemeData } from "./schemeReducer";
import { getEventData } from "./eventReducers";
import { getDistrictsData } from "./districtsReducer";

export const reducers = combineReducers({
    getLogindata: getLoginData,
    getSchemedata: getSchemeData,
    getEventdata: getEventData,
    getDistrictsData: getDistrictsData,
})