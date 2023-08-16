import { createActionTypes } from "../utils/common.ts";

export const HomePageTypes = createActionTypes(
    {
        GET_HOME_PAGE_REQUEST: null,
        SET_HOME_PAGE_REQUEST_DATA:null,
        INIT_HOME_PAGE:null
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
        GET_SHOP_PAGE_INFO_REQUEST: null,
        SET_SHOP_PAGE_INFO_REQUEST_DATA:null,
        GET_SHOP_PAGE_LIST:null,
        SET_SHOP_PAGE_LIST:null,
        INIT_SHOP_PAGE:null
    },
    'shoppage'
);
export const GoodsDetailPageTypes = createActionTypes(
    {   
        INIT_GOODS_DETAIL:null,
        GET_GOODS_DETAIL_PAGE_REQUEST: null,
        SET_GOODS_DETAIL_PAGE_REQUEST_DATA:null
    },
    'goodsdetailpage'
);