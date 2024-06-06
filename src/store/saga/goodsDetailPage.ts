import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { GOODS_DETAIL_PATH } from '../../config/requestConfig.ts'
import {Request} from '../../request/index.ts'
import { GoodsDetailPageTypes } from '../../config/actionConfig.ts';
import { setGoodsDetailPageData,getGoodsDetailPageData } from '../actions/goodsDetailPage.ts';

interface GoodsDetailParam{
    productId:number;
}
function* initGoodsDetail(action) {
    //请求goodsDetail的数据
    const {productId}=action?.payload||{}
    const goodsDetailParam:GoodsDetailParam={
        productId:productId
    }
    yield put(yield call(getGoodsDetailPageData,{goodsDetailParam:{...goodsDetailParam}}))
}

function *getGoodsDetailPageInfomation(action){
    const {goodsDetailParam}=action?.payload||{}
    //请求商品详情页的数据
    const data = yield call(Request,GOODS_DETAIL_PATH,goodsDetailParam)
    //将数据写入到store
    if(data?.data){//getGoodsDetailPageData
        yield put(yield call(setGoodsDetailPageData,data.data));
    }
}

export default function*(){
    yield all([
        takeEvery(GoodsDetailPageTypes.INIT_GOODS_DETAIL,initGoodsDetail),
        takeEvery(GoodsDetailPageTypes.GET_GOODS_DETAIL_PAGE_REQUEST,getGoodsDetailPageInfomation)
    ])
}