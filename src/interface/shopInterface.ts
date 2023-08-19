export interface ShopCategoryItemInterface{
    shopCategoryId:number;
    shopCategoryName:string;
    shopCategoryDesc:string;
    shopCategoryImg:string;
    priority:number;
    createTime:string;
    lastEditTime:string;
    parent:number;
}

export interface AreaItem{
    areaId: number,
    areaName:string,
    priority: number,
    createTime: string,
    lastEditTime: string
}

export interface ShopItemInterface{
    shopId:number;
    shopName:string;
    shopAddr:string;
    shopDesc:string;
    phone:string;
    shopImg:string;
    priority:number;
    createTime:string;
    lastEditTime:string;
    enableStatus:number;
    advice:string;
    area:AreaItem;
    owner:string;
    shopCategory:ShopCategoryItemInterface
}

export interface ShopInfoInterface{
    shopId: number,
	shopName: string,
	shopAddr: string,
	shopDesc: string,
	phone: string,
	shopImg: string,
	priority: number,
	createTime: number,
	lastEditTime: number,
    enableStatus: number,
	advice: string,
    area:AreaItem,
    owner:number,
    shopCategory:ShopCategoryItemInterface
}
