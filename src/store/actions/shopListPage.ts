import { ShopListPageTypes } from "../../config/actionConfig.ts";



export function initShopListPage(payload){
   return {
    type:ShopListPageTypes.INIT_SHOP_LIST_PAGE,
    payload
   }
}
export function getShopListPageFilterData(){
    return {
        type:ShopListPageTypes.GET_SHOP_LIST_PAGE_FILTER_REQUEST
    }
}
export function setShopListPageFilterData(payload){
    return {
        type:ShopListPageTypes.SET_SHOP_LIST_PAGE_FILTER_REQUEST_DATA,
        payload
    }
}

export function getShopListPageListData(payload?){
    return {
        type:ShopListPageTypes.GET_SHOP_LIST_PAGE_LIST_REQUEST,
        payload
    }
}
export function setShopListPageListData(payload){
    return {
        type:ShopListPageTypes.SET_SHOP_LIST_PAGE_LIST_REQUEST_DATA,
        payload
    }
}

export function setShopListParentId(payload){
    return{
        type:ShopListPageTypes.SET_PARENT_ID,
        payload
    }
}
export function setShopListQueryParams(payload){
   return{
    type:ShopListPageTypes.SET_SHOPLIST_QUERY_PARAMS,
    payload
   }
}

export function resetShoplistState() {
    return {
        type:ShopListPageTypes.RESET_SHOPLIST_STATE
    }
}