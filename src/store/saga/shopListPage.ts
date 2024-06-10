import { all, call, put, takeEvery } from 'redux-saga/effects'
import { SHOP_LIST_PAGE_FILTER_PATH, SHOP_LIST_PAGE_LIST_PATH } from '../../config/requestConfig.ts'
import {Request} from '../../request/index.ts'
import { ShopListPageTypes } from '../../config/actionConfig.ts';
import { select } from 'redux-saga/effects';
import { getShopListPageFilterData, getShopListPageListData, setShopListPageFilterData,setShopListPageListData, setShopListParentId, setShopListQueryParams } from '../actions/shopListPage.ts';
interface FilterParamsType{
    parentId?:number;
}
interface ListParamsType{
    parentId?:number;
    pageIndex:number;
    pageSize:number;
    areaId?:number;
    shopName?:string;
}

function *initShopListPage(action){
    const {parentId}=action?.payload||{};
    //将parentId写入到store中
    yield put(yield call(setShopListParentId,{parentId:parentId}))
    //请求筛选框数据
    yield put(yield call(getShopListPageFilterData))
    //请求列表数据
   yield put( yield call(getShopListPageListData))
}

function *fetchShopListPageListData(action){
    const {listParams }=action?.payload||{};
    const { isLoadMore = false } = action?.payload || {};
    const listRequestParam = yield select(state => state.shopListPageReducer.shopListPageData.listRequestParam);
    const requestParams:ListParamsType={
        ...listRequestParam,
        ...listParams
    }
    yield put(yield call(setShopListQueryParams,listParams))
     //请求店铺列表页筛选框数据
     const data = yield call(Request,SHOP_LIST_PAGE_LIST_PATH,requestParams);
     //将店铺列表页筛选框数据写入到store
    if (isLoadMore&&data?.data?.success) {
        //将请求回的数据拼接到store中
        const shopList = yield select(state => state.shopListPageReducer.shopListPageData.listData.shopList);
        const shopListNew=shopList.concat(data.data.shopList);
        const listData={...data.data,shopList:shopListNew}
        yield put(yield call(setShopListPageListData, listData));
     }
     else if(data?.data?.success){
         yield put(yield call(setShopListPageListData,data.data));
     }
}

function *fetchShopListPageFilterData(){
    const parentId = yield select(state => state.shopListPageReducer.shopListPageData.listRequestParam.parentId);
    const  filterParams:FilterParamsType={
        parentId:parentId
    }
     //请求店铺列表页筛选框数据
     const data = yield call(Request,SHOP_LIST_PAGE_FILTER_PATH,filterParams)
     //将店铺列表页筛选框数据写入到store
     if(data?.data){
         yield put(yield call(setShopListPageFilterData,data.data));
     } 
}

export default function*(){
    yield all([
        takeEvery(ShopListPageTypes.INIT_SHOP_LIST_PAGE,initShopListPage),
        takeEvery(ShopListPageTypes.GET_SHOP_LIST_PAGE_LIST_REQUEST,fetchShopListPageListData),
        takeEvery(ShopListPageTypes.GET_SHOP_LIST_PAGE_FILTER_REQUEST,fetchShopListPageFilterData)
    ])
}