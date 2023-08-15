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
        const newShopListPageData={
            ...state.shopListPageData,
            filterData:{...payload}
        }
        return {...state,shopListPageData:{...newShopListPageData}}
    },
    [ShopListPageTypes.SET_SHOP_LIST_PAGE_LIST_REQUEST_DATA]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopListPageData,
            listData:{...payload}
        }
        return {...state,shopListPageData:{...newShopListPageData}}
    }
   
};

export default createReducer(cases, defaultStates);