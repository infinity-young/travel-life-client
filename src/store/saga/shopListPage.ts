import { all, call, put, takeEvery } from 'redux-saga/effects'
import { SHOP_LIST_PAGE_FILTER, SHOP_LIST_PAGE_LIST } from '../../config/requestConfig.ts'
import {Request} from '../../request/index.ts'
import { ShopListPageTypes } from '../../config/actionConfig.ts';
import { getShopListPageFilterData, getShopListPageListData, setShopListPageFilterData,setShopListPageListData } from '../actions/shopListPage.ts';
interface FilterParamsType{
    parentId?:number;
}
interface ListParamsType{
    parentId?:number;
    pageIndex:number;
    pageSize:number;
    areaId?:number;
    shopCategoryId?:number;
    shopName?:string;

}

function *initShopListPage(action){
    const {parentId}=action?.payload||{};
    //请求筛选框数据
    const  filterParams:FilterParamsType={
        parentId:parentId
    }
    yield put(yield call(getShopListPageFilterData,{filterParams:{...filterParams}}))
    //请求列表数据
    const listParams:ListParamsType={
        parentId:parentId,
        pageIndex:1,
        pageSize:3
    }
   yield put( yield call(getShopListPageListData,{listParams:{...listParams}}))
}

function *fetchShopListPageListData(action){
    const {listParams }=action?.payload||{};
     //请求店铺列表页筛选框数据
     const data = yield call(Request,SHOP_LIST_PAGE_LIST,listParams);
     //将店铺列表页筛选框数据写入到store
     if(data?.data){
         yield put(yield call(setShopListPageListData,data.data));
     }
}

function *fetchShopListPageFilterData(action){
    const{filterParams}=action?.payload||{};
     //请求店铺列表页筛选框数据
     const data = yield call(Request,SHOP_LIST_PAGE_FILTER,filterParams)
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