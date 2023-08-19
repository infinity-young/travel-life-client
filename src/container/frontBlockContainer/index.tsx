import { PureComponent, ReactNode } from "react";
import ShopItem from "../../components/shopItem/index.tsx";
import { connect } from "react-redux";
import React from "react";
import styles from './index.module.scss'
import { ShopCategoryItemInterface } from "../../interface/shopInterface.ts";

interface FrontBlockInterface{
    shopCategoryList:Array<ShopCategoryItemInterface>,
    onItemClick:(shopCategoryId:number)=>void;
}
export  class FrontBlock extends PureComponent<FrontBlockInterface>{
    onItemClick=(item:ShopCategoryItemInterface)=>{
        this.props.onItemClick(item.shopCategoryId)
    }

    render(): ReactNode {
        const {shopCategoryList}=this.props;

        if(shopCategoryList?.length===0){
            return ( <div/>);
        }
        return <div className={styles.container}>
            {shopCategoryList?.map((item,index)=>{
                return (<div className={styles.itemContainer} key={index} onClick={()=>this.onItemClick(item)}>
                    <ShopItem {...item}/>
                </div>)
            })}
        </div>
    }

}
const mapStateToProps=(state)=>{ 

    const { homePageReducer: { homePageData: { shopCategoryList = [] } = {} } = {} } = state; 
    return { shopCategoryList };
}

export default connect(mapStateToProps)(FrontBlock);
