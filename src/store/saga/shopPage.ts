import { SHOP_DETAIL_PAGE_INFO_PATH, SHOP_PRODUCT_PATH } from '../../config/requestConfig';
import { ShopPageTypes } from '../../config/actionConfig'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import {Request} from '../../request/index.ts'
import { getShopPageInfo, getShopPageList, setShopProductRequestParams, setShopPageInfo, setShopPageList } from '../../store/actions/shopPage';

interface ShopInfoParam{
    shopId:number
}

interface GoodsListParam{
    shopId:number;
    pageIndex:number;
    pageSize:number;
    productCategoryId?:number;
    productName?:number
}
function *initShopPage(action){
    //解析跳链传入参数
    const shopParmas:ShopInfoParam=action?.payload||{}
    yield put(yield call(setShopProductRequestParams,shopParmas))
    //请求shopinfo
     yield put(yield call(getShopPageInfo,{shopInfoParam:{...shopParmas}}))
    //请求shoplist  
    yield put(yield call(getShopPageList))
}

function *getShopPageInfoData(action){
    const{shopInfoParam}=action?.payload||{};
    //请求店铺信息
    const data = yield call(Request,SHOP_DETAIL_PAGE_INFO_PATH,shopInfoParam)
    //将店铺信息写入store
    if(data?.data){
        yield put(yield call(setShopPageInfo,data.data));
    } 

}

function *getShopPageListData(action?){
    const {isLoadMore=false}=action?.payload||{};
    const{goodsListParam}=action?.payload||{};
    //从store中获取请求参数
    const listParams = yield select(state => state.shopPageReducer.shopPageData.productListParam)
    yield put(yield call(setShopProductRequestParams,goodsListParam))

    //组合请求参数
    const requestParams:GoodsListParam={
        ...listParams,
        ...goodsListParam
    }
    //请求店铺goods列表
    const data=yield call(Request,SHOP_PRODUCT_PATH,requestParams)
    //将店铺goods列表写入到store
    if(isLoadMore&&data?.data){
    //将请求回的数据拼接到store中
    const goodsList=yield select(state=>state.shopPageReducer.shopPageData.productListData.productList)
    const goodsListNew=goodsList.concat(data.data.productList);
    const listData={...data.data,productList:goodsListNew}
    yield put(yield call(setShopPageList,listData));
    }
    else if(data?.data){
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