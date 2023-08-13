import { createActionTypes } from "../utils/common.ts";

export const HomePageTypes = createActionTypes(
    {
        GET_HOME_PAGE_REQUEST: null,
        SET_HOME_PAGE_REQUEST_DATA:null
    },
    'hompage'
);

export const ShopListPageTypes = createActionTypes(
    {
        GET_SHOP_LIST_PAGE_FILTER_REQUEST: null,
        SET_SHOP_LIST_PAGE_FILTER_REQUEST_DATA:null,
        GET_SHOP_LIST_PAGE_LIST_REQUEST: null,
        SET_SHOP_LIST_PAGE_LIST_REQUEST_DATA:null,
        INIT_SHOP_LIST_PAGE:null
    },
    'shoplistpage'
);

export const ShopPageTypes = createActionTypes(
    {
        GET_SHOP_PAGE_REQUEST: null,
        SET_SHOP_PAGE_REQUEST_DATA:null
    },
    'shoppage'
);
export const ShopDetailPageTypes = createActionTypes(
    {
        GET_SHOP_DETAIL_PAGE_REQUEST: null,
        SET_SHOP_DETAIL_PAGE_REQUEST_DATA:null
    },
    'shopdetailpage'
);