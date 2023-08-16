import { SHOP_DETAIL_PAGE_INFO_PATH, SHOP_PRODUCT_PATH } from '../../config/requestConfig';
import { ShopPageTypes } from '../../config/actionConfig'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import {Request} from '../../request/index.ts'
import { getShopPageInfo, getShopPageList, setShopPageInfo, setShopPageList } from '../../store/actions/shopPage';

interface ShopInfoParam{
    shopId:number
}

interface GoodsListParam{
    shopId:number;
    pageIndex:number;
    pageSize:number;
    productCategoryId?:number;
}
function *initShopPage(){
    //解析跳链传入参数 todo
    //请求shopinfo
    const shopInfoParam:ShopInfoParam={
        shopId:1
     }
     yield put(yield call(getShopPageInfo,{shopInfoParam:{...shopInfoParam}}))
    //请求shoplist
    const goodsListParam:GoodsListParam={
        shopId:1,
        pageIndex:1,
        pageSize:3
    }
    yield put(yield call(getShopPageList,{goodsListParam:{...goodsListParam}}))
}

function *getShopPageInfoData(action){
    const{goodsInfoParam}=action?.payload||{};
    //请求店铺信息
    const data = yield call(Request,SHOP_DETAIL_PAGE_INFO_PATH,goodsInfoParam)
    //将店铺信息写入store
    if(data?.data){
        yield put(yield call(setShopPageInfo,data.data));
    } 

}

function *getShopPageListData(action){
    const{goodsListParam}=action?.payload||{};
    //请求店铺goods列表
    const data=yield call(Request,SHOP_PRODUCT_PATH,goodsListParam)
    //将店铺goods列表写入到store
    if(data?.data){
        yield put(yield call(setShopPageList,data.data));
    }
}


export default function*(){
    yield all([
        takeEvery(ShopPageTypes.INIT_SHOP_PAGE,initShopPage),
        takeEvery(ShopPageTypes.GET_SHOP_PAGE_INFO_REQUEST,getShopPageInfoData),
        takeEvery(ShopPageTypes.GET_SHOP_PAGE_LIST,getShopPageListData)
    ])
}