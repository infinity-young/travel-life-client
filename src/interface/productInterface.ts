import { ShopItemInterface } from "./shopInterface"

export interface productCategoryInterface{
    productCategoryId: number,
	shopId: number,
	productCategoryName: string,
	priority: number,
	createTime: string
}

export interface productItemInterface{
	productId: number,
	productName: string,
	productDesc:string,
	imgAddr: string,
	normalPrice:string,
	promotionPrice: string,
	priority: number,
	createTime: number,
	lastEditTime: number,
	enableStatus: number,
	productImgList: Array<string>,
	productCategory: productCategoryInterface,
	shop: ShopItemInterface
}