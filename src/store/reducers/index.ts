import { combineReducers } from 'redux';
import homePageReducer from '../reducers/homePage.ts';
import shopListPageReducer from '../reducers/shopListPage.ts';
export default combineReducers({
    homePageReducer,shopListPageReducer
});