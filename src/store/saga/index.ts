import { all } from 'redux-saga/effects';
import homePageSaga from './homePage.ts';
import shopListPage from './shopListPage.ts';
import shopPage from './shopPage.ts';
import goodsDetailPage from './goodsDetailPage.ts';
export default function* () {
    yield all([homePageSaga(),shopListPage(),shopPage(),goodsDetailPage()]);
}