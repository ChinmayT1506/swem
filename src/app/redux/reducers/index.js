import { combineReducers } from "redux";
import { getLoginData } from "./loginReducer";
import { getSchemeData } from "./schemeReducer";
import { getEventData } from "./eventReducers";
import { getDistrictsData } from "./districtsReducer";
import { getBlockData } from "../actions/blockAction";

export const reducers = combineReducers({
    getLogindata: getLoginData,
    getSchemedata: getSchemeData,
    getEventdata: getEventData,
    getDistrictsData: getDistrictsData,
    getBlockData: getBlockData,
})