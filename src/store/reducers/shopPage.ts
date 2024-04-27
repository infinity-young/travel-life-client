import { ShopPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   shopPageData:{
    shopInfoData:{},
    productListData:{},
    productListParam:{
        pageIndex:1,
        pageSize:2
    }
   }
};

const cases = {
    [ShopPageTypes.SET_SHOP_PAGE_INFO_REQUEST_DATA]:(state,payload)=>{
        const newShopPageData={
            ...state.shopPageData,
            shopInfoData:{...payload}
        }
        return {...state,shopPageData:{...newShopPageData}}
    },
    [ShopPageTypes.SET_SHOP_PAGE_LIST]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopPageData,
            productListData:{...payload}
        }
        return {...state,shopPageData:{...newShopListPageData}}
    },
    [ShopPageTypes.SET_SHOP_ID]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopPageData,
            productListParam:{
                ...state.shopPageData.productListParam,
                ...payload
            }
        }
        return {...state,shopPageData:{...newShopListPageData}}
    }
   
};

export default createReducer(cases, defaultStates);