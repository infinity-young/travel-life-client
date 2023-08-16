import { combineReducers } from 'redux';
import homePageReducer from '../reducers/homePage.ts';
import shopListPageReducer from '../reducers/shopListPage.ts';
import shopPageReducer from '../reducers/shopPage.ts'
import goodsDetailPageReducer from '../reducers/goodsDetailPage.ts'
export default combineReducers({
    homePageReducer,shopListPageReducer,shopPageReducer,goodsDetailPageReducer
});