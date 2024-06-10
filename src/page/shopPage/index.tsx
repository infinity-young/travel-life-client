import Category from "../../components/category";
import SearchBox from "../../components/searchBox";
import { PureComponent, ReactNode } from "react";
import React from 'react'
import { connect } from "react-redux";
import { initShopPage, resetShopState } from "../../store/actions/shopPage";
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
    getShopPageListData: (params?) => void;
    resetShopState:()=>void
}
export class  ShopPage extends PureComponent<Props>{
    constructor(props){
        super(props)
        const { shopId } = this.props.match.params;
        this.props.initShopPage(shopId)
    }
    componentWillUnmount(){
        this.props.resetShopState()
    }
    onKeywordSearch=(searchValue:string)=>{
        this.props.getShopPageListData({goodsListParam:{productName:searchValue,pageIndex:1}})
    }
    onClickCategory=(categoryId:number)=>{
        this.props.getShopPageListData({goodsListParam:{productCategoryId:categoryId,pageIndex:1}})
    }
    dealWithProductCategoryList=( productCategoryList:Array<productCategoryInterface>)=>{
        const categoryList=productCategoryList.map((item)=>{
            const newItem:categoryItem={
                categoryId:item.productCategoryId,
                categoryName:item.productCategoryName
            }
            return newItem
        })
        categoryList.unshift({categoryId:-1,categoryName:'全部'})
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
                <div>
                    <NavigationBar />
                    <div className='title-text'>{shopName}</div>
                    <div className={style.card}>
                        <img src={IMAGE_PATH + shopImg} className={style.img} />
                        <div className={style.titleContentContainer}>
                            <div className={style.itemContainer}>
                                <div className={style.title}>店铺类型</div>
                                <div className={style.value}>{shopDesc}</div>
                            </div>
                            <div className={style.itemContainer}>
                                <div className={style.title}>店铺地址</div>
                                <div className={style.value}>{shopAddr}</div>
                            </div>
                            <div className={style.itemContainer}>
                                <div className={style.title}>联系方式</div>
                                <div className={style.value}>{phone}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.contentContainer}>
                    <SearchBox search={this.onKeywordSearch} placeholder='请输入房型名称'/>
                    <Category categoryList={categoryList} onClickCategory={this.onClickCategory}/>
                </div>
                <div className={style.listContainer}>
                    <ProductList />
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
        productCategoryList,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initShopPage:(shopId)=>{ 
            const shopParams={shopId:shopId}
            dispatch(initShopPage(shopParams))},
        getShopPageListData: (params) => dispatch(getShopPageList(params)),
        resetShopState:()=>dispatch(resetShopState())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage)