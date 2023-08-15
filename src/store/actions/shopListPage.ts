import { ShopListPageTypes } from "../../config/actionConfig.ts";



export function initShopListPage(payload){
   return {
    type:ShopListPageTypes.INIT_SHOP_LIST_PAGE,
    payload
   }
}
export function getShopListPageFilterData(payload){
    return {
        type:ShopListPageTypes.GET_SHOP_LIST_PAGE_FILTER_REQUEST,
        payload
    }
}
export function setShopListPageFilterData(payload){
    return {
        type:ShopListPageTypes.SET_SHOP_LIST_PAGE_FILTER_REQUEST_DATA,
        payload
    }
}

export function getShopListPageListData(payload){
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