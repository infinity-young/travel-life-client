import { PureComponent, ReactNode } from "react";
import { HOME_PAGE_IMAGE_PATH } from "../../config/imageConfig.ts";
import styles from './index.module.scss'
import React from "react";

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

export default class ShopItem extends PureComponent<ShopItemInterface>{
    constructor(props:ShopItemInterface){
        super(props)
    }
    render(): ReactNode {
        const {shopCategoryName,shopCategoryDesc,shopCategoryImg,shopCategoryId}=this.props;
        return(
        <div className={styles.itemContainer}>
            <div className={styles.textContainer}>
                <span>{shopCategoryName}</span>
                <span>{shopCategoryDesc}</span>
            </div>
            <img
               src={HOME_PAGE_IMAGE_PATH+shopCategoryImg}
               className={styles.img}
               />
        </div>)
    }

}