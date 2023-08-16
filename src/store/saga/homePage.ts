import { all, call, put, takeEvery } from 'redux-saga/effects'
import { HOME_PAGE_PATH } from '../../config/requestConfig.ts'
import {Request} from '../../request/index.ts'
import { HomePageTypes } from '../../config/actionConfig.ts';
import { setHomePageData } from '../actions/homePage.ts';

function *getHomePageInfomation(){
    //请求首页的数据
    console.log('=====dfdf---')
    const data = yield call(Request,HOME_PAGE_PATH)
    //将数据写入到store
    console.log("==mydata===="+JSON.stringify(data));
    if(data?.data){
        yield put(yield call(setHomePageData,data.data));
    }

}

export default function*(){
    yield all([
        takeEvery(HomePageTypes.GET_HOME_PAGE_REQUEST,getHomePageInfomation)
    ])
}