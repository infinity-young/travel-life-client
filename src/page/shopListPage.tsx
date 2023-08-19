import { PureComponent } from "react";
import React from "react";
import { withRouter, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { getShopListPageListData, initShopListPage, setShopListAreaId, setShopListParentId } from "../store/actions/shopListPage.ts";
import SearchBox from "../components/searchBox/index.tsx";
import { AreaItem, ShopCategoryItemInterface } from "interface/shopInterface.ts";
import AreaSelectBox from "../components/areaSelectBox/index.tsx";
import Category from "../components/category/index.tsx";
import { categoryItem } from "interface/commonInterface.ts";
import ShopList from '../container/shopListContainer/index.tsx'
import { NavigationBar } from "../components/navigationBar/index.tsx";

interface  ShopListPageProps{
    initShopListPage:(parentId:number)=>void;
    shopCategoryList:Array<ShopCategoryItemInterface>;
    areaList:Array<AreaItem>;
    refreshList:(params?)=>void;
    setParentId:(params)=>void;
    setCityId:(params)=>void;
}

type Props = RouteProps<string> & PropsFromRedux&ShopListPageProps;


export  class ShopListPage extends PureComponent<RouteProps&Props>{
    constructor(props){
        super(props)
        const { parentId } = this.props.match.params;
        this.props.initShopListPage(parentId)
    }
    dealWithShopCategoryList=( shopCategoryList:Array<ShopCategoryItemInterface>)=>{
        if(shopCategoryList===null||shopCategoryList?.length===0){
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
        this.props.setParentId({parentId:categoryId})
        this.props.refreshList()
        // console.log('=====selectCategoryId is:===',categoryId);
    }
    onSelectCity=(areaId:number)=>{
        this.props.setCityId({areaId:areaId})
        this.props.refreshList()
        // console.log('======areaId=====',areaId)
    }
    onKeywordSearch=(searchValue:string)=>{
        //console.log('===123======'+JSON.stringify(searchValue))
        this.props.refreshList({listParams:{shopName:searchValue}})
    }
    render(){
        // console.log('====pp======'+JSON.stringify(this.props));
        const {shopCategoryList=[],areaList=[]}=this.props;
        const categoryList=this.dealWithShopCategoryList(shopCategoryList);
        // console.log('===parentIdpp==',parentId)
        // console.log("======dfdfd====="+JSON.stringify(this.props))
        //todo 输入搜索词查询
        //todo 点击类别查询
        //todo 选择城市查询
        console.log('=====11===='+JSON.stringify(this.props))
       return(
        <div>
            <NavigationBar title={"商店列表"}/>
            <SearchBox search={this.onKeywordSearch}/>
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
        },
        setParentId:(params)=>{dispatch(setShopListParentId(params))},
        setCityId:(params)=>{dispatch(setShopListAreaId(params))},
        refreshList:(params?)=>{dispatch(getShopListPageListData(params))} 
    }
}
  
  const connector = connect(mapStateToProps);
  
  type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShopListPage));

