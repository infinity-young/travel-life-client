import { GoodsDetailPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   goodsDetailPageData:{}
};

const cases = {
    [GoodsDetailPageTypes.SET_GOODS_DETAIL_PAGE_REQUEST_DATA]:(state,payload)=>{
        console.log("====origin state=="+JSON.stringify(state))
        // console.log("=homepagereducer==={...state,homePageData:{...payload}}="+JSON.stringify({...state,homePageData:{...payload}}))
        return {...state,goodsDetailPageData:{...payload}}
    }
   
};

export default createReducer(cases, defaultStates);