
const isProd = process.env.NODE_ENV === 'production';
export const BATH_PATH = isProd ? '/basic-webapp' : 'http://localhost:8080';
export const HOME_PAGE_PATH = '/frontend/listmainpageinfo';
export const SHOP_LIST_PAGE_FILTER_PATH = '/frontend/listshopspageinfo';
export const SHOP_LIST_PAGE_LIST_PATH = '/frontend/listshops';
export const SHOP_DETAIL_PAGE_INFO_PATH='/frontend/listshopdetailpageinfo'
export const SHOP_PRODUCT_PATH='/frontend/listproductsbyshop'
export const GOODS_DETAIL_PATH='/frontend/listproductdetailpageinfo'