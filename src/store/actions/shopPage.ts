import { ShopPageTypes } from "../../config/actionConfig.ts";

export function initShopPage(payload){
   return {
    type:ShopPageTypes.INIT_SHOP_PAGE,
    payload
   }
}

export function getShopPageInfo(payload){
    return{
        type:ShopPageTypes.GET_SHOP_PAGE_INFO_REQUEST,
        payload
    }
}
export function setShopPageInfo(payload){
    return {
        type:ShopPageTypes.SET_SHOP_PAGE_INFO_REQUEST_DATA,
        payload
    }

}
export function getShopPageList(payload?){
    return{
        type:ShopPageTypes.GET_SHOP_PAGE_LIST,
        payload
    }
}
export function setShopPageList(payload){
    return{
        type:ShopPageTypes.SET_SHOP_PAGE_LIST,
        payload
    }
}
export function setShopProductRequestParams(payload){
    return{
        type:ShopPageTypes.SET_SHOP_PRODUCT_REQUEST_PARAMS,
        payload
    }
}
export function resetShopState() {
    return {
        type:ShopPageTypes.RESET_SHOP_STATE,
    }
}