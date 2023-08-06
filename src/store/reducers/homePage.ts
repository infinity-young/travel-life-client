import { HomePageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   homePageData:{}
};

const cases = {
    [HomePageTypes.SET_HOME_PAGE_REQUEST_DATA]:(state,payload)=>{
        return {...state,homePageData:{...payload}}
    }
   
};

export default createReducer(cases, defaultStates);