import { all, call, put, takeEvery } from 'redux-saga/effects'
import { SHOP_LIST_PAGE_FILTER } from '../../config/requestConfig.ts'
import {Request} from '../../request/index.ts'
import { ShopListPageTypes } from '../../config/actionConfig.ts';
import { getShopListPageFilterData } from '../actions/shopListPage.ts';

function *initShopListPage(){
    //
}

function *getHomePageInfomation(){
    //请求首页的数据
    const data = yield call(Request,SHOP_LIST_PAGE_FILTER)
    //将数据写入到store
    if(data?.data){
        yield put(yield call(setHomePageData,data.data));
    }

}

export default function*(){
    yield all([
        takeEvery(ShopListPageTypes.INIT_SHOP_LIST_PAGE,initShopListPage)
    ])
}