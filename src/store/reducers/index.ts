import { combineReducers } from 'redux';
import homePageReducer from '../reducers/homePage.ts';
import shopListPage from '../reducers/shopListPage.ts';
export default combineReducers({
    homePageReducer,shopListPage
});