import { ShopListPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   shopListPageData:{
    filterData:{},
    listData:{}
   }
};

const cases = {
    [ShopListPageTypes.SET_SHOP_LIST_PAGE_FILTER_REQUEST_DATA]:(state,payload)=>{
        console.log("==list==origin state=="+JSON.stringify(state))
        // console.log("=homepagereducer==={...state,homePageData:{...payload}}="+JSON.stringify({...state,homePageData:{...payload}}))
        const newFilterData={
            ...state.filterData,
            filterData:{...payload}
        }
        return {...state,shopListPageData:newFilterData}
    },
    [ShopListPageTypes.SET_SHOP_LIST_PAGE_LIST_REQUEST_DATA]:(state,payload)=>{
        console.log("==list==origin state=="+JSON.stringify(state))
        // console.log("=homepagereducer==={...state,homePageData:{...payload}}="+JSON.stringify({...state,homePageData:{...payload}}))
        const newFilterData={
            ...state.filterData,
            listData:{...payload}
        }
        return {...state,shopListPageData:{...newFilterData}}
    }
   
};

export default createReducer(cases, defaultStates);