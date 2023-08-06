import { all } from 'redux-saga/effects';
import homePageSaga from './homePage.ts';
export default function* () {
    yield all([homePageSaga()]);
}