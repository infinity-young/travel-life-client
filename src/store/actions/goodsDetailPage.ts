import { GoodsDetailPageTypes } from "../../config/actionConfig.ts";



export function initGoodsDetailPage(){
    console.log('======action======')
   return {
    type:GoodsDetailPageTypes.INIT_GOODS_DETAIL
   }
}

export function setGoodsDetailPageData(payload){
    return {
        type:GoodsDetailPageTypes.SET_GOODS_DETAIL_PAGE_REQUEST_DATA,
        payload
    }

}

export function getGoodsDetailPageData(payload){
    return{
        type:GoodsDetailPageTypes.GET_GOODS_DETAIL_PAGE_REQUEST,
        payload
    }
}
