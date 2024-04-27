import { ShopListPageTypes } from "../../config/actionConfig.ts";
import { createReducer } from "../../utils/common.ts";

const defaultStates = {
   shopListPageData:{
    filterData:{},
    listData:{},
    listRequestParam:{
        pageIndex:1,
        pageSize:3,
    }
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
    },
    // [ShopListPageTypes.UPDATE_PAGE_INDEX]:(state,payload)=>{
    //     const newShopListPageData={
    //         ...state.shopListPageData,
    //         listRequestParam:{
    //             ...state.shopListPageData.listRequestParam,
    //             ...payload
    //         }
    //     }
    //     return{
    //         ...state, shopListPageData:{...newShopListPageData}
    //     }
    // },
    [ShopListPageTypes.SET_PARENT_ID]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopListPageData,
            listRequestParam:{
                ...state.shopListPageData.listRequestParam,
                ...payload
            }
        }
        return{
            ...state, shopListPageData:{...newShopListPageData}
        }
    },
    [ShopListPageTypes.SET_AREA_ID]:(state,payload)=>{
        const newShopListPageData={
            ...state.shopListPageData,
            listRequestParam:{
                ...state.shopListPageData.listRequestParam,
                ...payload
            }
        }
        return{
            ...state, shopListPageData:{...newShopListPageData}
        }
    }
};

export default createReducer(cases, defaultStates);