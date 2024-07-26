import { PureComponent } from "react";
import React from "react";
import { withRouter, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { getShopListPageListData, initShopListPage, resetShoplistState } from "../../store/actions/shopListPage.ts";
import SearchBox from "../../components/searchBox/index.tsx";
import { AreaItem, ShopCategoryItemInterface } from "interface/shopInterface.ts";
import AreaSelectBox from "../../components/areaSelectBox/index.tsx";
import Category from "../../components/category/index.tsx";
import { categoryItem } from "interface/commonInterface.ts";
import ShopList from '../../container/shopListContainer/index.tsx'
import { NavigationBar } from "../../components/navigationBar/index.tsx";
import style from './index.module.scss'

interface  ShopListPageProps{
    initShopListPage:(parentId:number)=>void;
    shopCategoryList:Array<ShopCategoryItemInterface>;
    areaList:Array<AreaItem>;
    refreshList:(params?)=>void;
    resetShoplistState: () => void;
}

type Props = RouteProps<string> & PropsFromRedux&ShopListPageProps;


export  class ShopListPage extends PureComponent<RouteProps&Props>{
    constructor(props){
        super(props)
        const { parentId } = this.props.match.params;
        this.props.initShopListPage(parentId)
    }
    componentWillUnmount(){
        this.props.resetShoplistState();
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
        categoryList.unshift({categoryId:-1,categoryName:'全部'})
        return categoryList
    }
    onClickCategory=(categoryId:number)=>{
        const {shopCategoryList=[]}=this.props;
        const item=shopCategoryList.find((item)=>item.shopCategoryId===categoryId);
        if(item.parent){
            this.props.refreshList({listParams:{shopCategoryId:categoryId,pageIndex:1}})
        }else{
            this.props.refreshList({listParams:{parentId:categoryId,pageIndex:1}})
        }
    }
    onSelectCity=(areaId:number)=>{
        this.props.refreshList({listParams:{areaId:areaId,pageIndex:1}})
    }
    onKeywordSearch=(searchValue:string)=>{
        this.props.refreshList({listParams:{shopName:searchValue,}})
    }
    render(){
        const {shopCategoryList=[],areaList=[]}=this.props;
        const categoryList=this.dealWithShopCategoryList(shopCategoryList);
       return(
           <div className={style.pageContainer}>
            <NavigationBar history={this.props.history} />
            <div className='title-text'>商店列表</div>
            <div className={style.contentContainer}>
               <SearchBox search={this.onKeywordSearch} placeholder='请输入酒店名称'/>
               <Category categoryList={categoryList} onClickCategory={this.onClickCategory}/>
               <AreaSelectBox areaList={areaList} onSelectCity={this.onSelectCity}/>  
            </div>
             <div className={style.listContainer}>
                   <ShopList/>
            </div>
        </div>
       )
    }
}

const mapStateToProps = state => {
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
        refreshList: (params?) => { dispatch(getShopListPageListData(params)) },
        resetShoplistState:()=>{dispatch(resetShoplistState())}
    }
}
  
  const connector = connect(mapStateToProps);
  
  type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShopListPage));

