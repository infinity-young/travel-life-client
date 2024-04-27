import { combineReducers } from 'redux';
import homePageReducer from '../reducers/homePage.ts';
import shopListPageReducer from '../reducers/shopListPage.ts';
import shopPageReducer from '../reducers/shopPage.ts'
import goodsDetailPageReducer from '../reducers/goodsDetailPage.ts'
export const defaultStates = {
    homePageReducer: {
        homePageData: {
            shopCategoryList: []
        }
	},
	shopListPageReducer: {
		shopListPageData: {
			filterData: {},
			listData: {},
			listRequestParam: {
				pageIndex: 1,
				pageSize: 3,
			}
		}
	},
	shopPageReducer: {
		shopPageData: {
			shopInfoData: {},
			productListData: {},
			productListParam: {
				pageIndex: 1,
				pageSize: 2
			}
		}
	},
goodsDetailPageReducer: {
		goodsDetailPageData: {}
	}
}
export default combineReducers({
    homePageReducer,shopListPageReducer,shopPageReducer,goodsDetailPageReducer
});