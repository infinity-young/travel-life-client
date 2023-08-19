import { HomePageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   homePageData:{shopCategoryList:[1,2,3,4]}
};

const cases = {
    [HomePageTypes.SET_HOME_PAGE_REQUEST_DATA]:(state,payload)=>{
        // console.log("====origin state=="+JSON.stringify(state))
        // console.log("=homepagereducer==={...state,homePageData:{...payload}}="+JSON.stringify({...state,homePageData:{...payload}}))
        return {...state,homePageData:{...payload}}
    }
   
};

export default createReducer(cases, defaultStates);