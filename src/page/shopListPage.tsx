import { PureComponent } from "react";
import React from "react";
import { withRouter, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { initShopListPage } from "../store/actions/shopListPage.ts";
import SearchBox from "../components/searchBox/index.tsx";
import { AreaItem, ShopCategoryItemInterface } from "interface/shopInterface.ts";
import AreaSelectBox from "../components/areaSelectBox/index.tsx";
import Category from "../components/category/index.tsx";
import { categoryItem } from "interface/commonInterface.ts";
import ShopList from '../container/shopListContainer/index.tsx'

interface  ShopListPageProps{
    initShopListPage:(parentId:number)=>void;
    shopCategoryList:Array<ShopCategoryItemInterface>;
    areaList:Array<AreaItem>;
}

type Props = RouteProps<string> & PropsFromRedux&ShopListPageProps;


export  class ShopListPage extends PureComponent<RouteProps&Props>{
    constructor(props){
        super(props)
        const { parentId } = this.props.match.params;
        this.props.initShopListPage(parentId)
    }
    dealWithShopCategoryList=( shopCategoryList:Array<ShopCategoryItemInterface>)=>{
        if(shopCategoryList?.length===0){
            return []
        }
        const categoryList=shopCategoryList.map((item:ShopCategoryItemInterface)=>{
            const newItem:categoryItem={
                categoryId:item.shopCategoryId,
                categoryName:item.shopCategoryName
            }
            return newItem
        })
        return categoryList
    }
    onClickCategory=(categoryId:number)=>{
        // console.log('=====selectCategoryId is:===',categoryId);
    }
    onSelectCity=(areaId:number)=>{
        // console.log('======areaId=====',areaId)
    }
    render(){
        const { parentId } = this.props.match.params;
        const {shopCategoryList=[],areaList=[]}=this.props;
        const categoryList=this.dealWithShopCategoryList(shopCategoryList);
        // console.log('===parentIdpp==',parentId)
        // console.log("======dfdfd====="+JSON.stringify(this.props))
       return(
        <div>
            <SearchBox/>
            <Category categoryList={categoryList} onClickCategory={this.onClickCategory}/>
            <AreaSelectBox areaList={areaList} onSelectCity={this.onSelectCity}/>
            <ShopList/>
            <span> list1</span>
        </div>
       )
    }
}

const mapStateToProps = state => {
    // console.log('===shoplist===state======'+JSON.stringify(state));
    const {shopListPageReducer:{shopListPageData:{filterData:{shopCategoryList,areaList}}}}=state;
    return {
        shopCategoryList,areaList
      }
};
const mapDispatchToProps=dispatch=>{
    return {
        initShopListPage:(parentId)=>{
            const listParams={parentId:parentId}
            dispatch(initShopListPage(listParams));
        }    }
}
  
  const connector = connect(mapStateToProps);
  
  type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShopListPage));

