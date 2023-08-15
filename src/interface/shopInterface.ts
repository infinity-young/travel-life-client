export interface ShopItemInterface{
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