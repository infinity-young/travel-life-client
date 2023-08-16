import { SHOP_LIST_PAGE_IMAGE_PATH } from "../../config/imageConfig.ts";
import PoiCell from "../../components/poiCell/index.tsx";
import { CellItem } from "../../interface/commonInterface.ts";
import { ShopItemInterface } from "../../interface/shopInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react';
import { connect } from "react-redux";
interface Props{
    shopList:Array<ShopItemInterface>
}

class ShopList extends PureComponent<Props>{
    dealListData=(shopList:Array<ShopItemInterface>)=>{
        const newListData=shopList.map((item)=>{
            const newItem:CellItem={
                title:item.shopName,
                desc:item.shopDesc,
                img:SHOP_LIST_PAGE_IMAGE_PATH+item.shopImg
            }
            return newItem;
        })
        return newListData;
    }
    render(): ReactNode {
        const {shopList=[]}=this.props;
        if(shopList.length==0){
            return <div/>
        }
        const newListData=this.dealListData(shopList);
        // console.log('===newListData====='+JSON.stringify(newListData));
        return (
            <div>
                <span>list</span>
                {newListData.map((item,index)=>{
                    return <PoiCell title={item.title} desc={item.desc} img={item.img} key={index}/>
                })}
            </div>
        )
    }

}

const mapStateToProps=(state)=>{
    const {shopListPageReducer:{shopListPageData:{listData:{shopList=[]}}}}=state
    return {
        shopList
    }
}
export default connect(mapStateToProps)(ShopList)