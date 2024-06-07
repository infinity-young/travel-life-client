import Category from "../../components/category";
import SearchBox from "../../components/searchBox";
import { PureComponent, ReactNode } from "react";
import React from 'react'
import { connect } from "react-redux";
import { initShopPage } from "../../store/actions/shopPage";
import { productCategoryInterface, productItemInterface } from "../../interface/productInterface";
import { ShopInfoInterface } from "../../interface/shopInterface";
import { categoryItem } from "../../interface/commonInterface";
import {getShopPageList} from '../../store/actions/shopPage.ts'
import ProductList from '../../container/productListContainer/index.tsx'
import NavigationBar from "../../components/navigationBar/index.tsx";
import { IMAGE_PATH } from "../../config/imageConfig.ts";
import style from './index.module.scss'

interface Props{
    initShopPage:(shopId:number)=>void;
    productCategoryList:Array<productCategoryInterface>;
    shop:ShopInfoInterface;
    count:number;
    productList:Array<productItemInterface>;
    getShopPageListData:(params?)=>void;
}
export class  ShopPage extends PureComponent<Props>{
    constructor(props){
        super(props)
        const { shopId } = this.props.match.params;
        this.props.initShopPage(shopId)
    }
    onKeywordSearch=(searchValue:string)=>{
        this.props.getShopPageListData({goodsListParam:{productName:searchValue}})
    }
    onClickCategory=(categoryId:number)=>{
        this.props.getShopPageListData({goodsListParam:{productCategoryId:categoryId}})
    }
    dealWithProductCategoryList=( productCategoryList:Array<productCategoryInterface>)=>{
        const categoryList=productCategoryList.map((item)=>{
            const newItem:categoryItem={
                categoryId:item.productCategoryId,
                categoryName:item.productCategoryName
            }
            return newItem
        })
        return categoryList
    }
    render(): ReactNode {
        const{shop}=this.props;
        if(!shop){
            return <div/>
        }
        const{productCategoryList}=this.props;
        const categoryList=this.dealWithProductCategoryList(productCategoryList);
        const {shopName,shopImg,shopDesc,shopAddr,phone}=shop;

        return(
            <div className={style.shopPageContainer} >
                <NavigationBar title={shopName}/>
               <div>
                    <img src={IMAGE_PATH+shopImg}/>
                    <span>{shopDesc}</span>
                    <span>{shopAddr}</span>
                    <span>{phone}</span>
                </div>
                <SearchBox search={this.onKeywordSearch}/>
                <Category categoryList={categoryList} onClickCategory={this.onClickCategory}/>
                <div>
                <ProductList/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    const {shopPageReducer:{shopPageData:{productListData:{productList=[],count=0}}}}=state;
    const {shopPageReducer:
            {shopPageData:
                    {shopInfoData:
                        {shop={},productCategoryList=[]
                    }={}
            }={}
        }={} }=state;
    return{
        productList,
        count,
        shop,
        productCategoryList
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initShopPage:(shopId)=>{ 
            const shopParams={shopId:shopId}
            dispatch(initShopPage(shopParams))},
        getShopPageListData:(params)=>dispatch(getShopPageList(params))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage)