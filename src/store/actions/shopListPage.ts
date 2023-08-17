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
export function updateShopListPageIndex(payload){
    return{
        type:ShopListPageTypes.UPDATE_PAGE_INDEX,
        payload
    }
}

export function setShopListParentId(payload){
    return{
        type:ShopListPageTypes.SET_PARENT_ID,
        payload
    }
}
export function setShopListAreaId(payload){
   return{
    type:ShopListPageTypes.SET_AREA_ID,
    payload
   }
}