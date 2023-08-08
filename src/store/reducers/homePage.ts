import { HomePageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   homePageData:{shopCategoryList:[1,2,3]}
};

const cases = {
    [HomePageTypes.SET_HOME_PAGE_REQUEST_DATA]:(state,payload)=>{
        console.log("====or÷igin state=="+JSON.stringify(state))
        console.log("===={...state,homePageData:{...payload}}="+JSON.stringify({...state,homePageData:{...payload}}))
        return {...state,
            homePageData:{...payload}
        }
    }
   
};

export default createReducer(cases, defaultStates);