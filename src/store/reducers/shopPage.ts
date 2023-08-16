import { ShopPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   shopPageData:{
    shopInfoData:{},
    productListData:{}
   }
};

const cases = {
    [ShopPageTypes.SET_SHOP_PAGE_INFO_REQUEST_DATA]:(state,payload)=>{
        const shopInfoData={
            ...state.productListData,
            shopInfoData:{...payload}
        }
        return {...state,shopListPageData:{...shopInfoData}}
    },
    [ShopPageTypes.SET_SHOP_PAGE_LIST]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopInfoData,
            productListData:{...payload}
        }
        return {...state,shopListPageData:{...newShopListPageData}}
    }
   
};

export default createReducer(cases, defaultStates);