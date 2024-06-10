import { PureComponent, ReactNode } from "react";
import { IMAGE_PATH } from "../../config/imageConfig.ts";
import styles from './index.module.scss'
import React from "react";
import { ShopCategoryItemInterface } from "interface/shopInterface.ts";

export default class ShopItem extends PureComponent<ShopCategoryItemInterface>{
    constructor(props:ShopCategoryItemInterface){
        super(props)
    }
    render(): ReactNode {
        const {shopCategoryDesc,shopCategoryImg}=this.props;
        return(
        <div className={styles.itemContainer}>
            <div className={styles.textContainer}>
                <span>{shopCategoryDesc}</span>
            </div>
            <img
               src={IMAGE_PATH+shopCategoryImg}
               className={styles.img}
               />
        </div>)
    }

}