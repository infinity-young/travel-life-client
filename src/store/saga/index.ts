import { all } from 'redux-saga/effects';
import homePageSaga from './homePage.ts';
import shopListPage from './shopListPage.ts';
export default function* () {
    yield all([homePageSaga(),shopListPage()]);
}