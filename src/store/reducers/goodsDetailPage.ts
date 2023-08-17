import { GoodsDetailPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   goodsDetailPageData:{}
};

const cases = {
    [GoodsDetailPageTypes.SET_GOODS_DETAIL_PAGE_REQUEST_DATA]:(state,payload)=>{
        return {...state,goodsDetailPageData:{...payload}}
    }
   
};

export default createReducer(cases, defaultStates);