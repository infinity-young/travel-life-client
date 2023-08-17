import { SHOP_LIST_PAGE_IMAGE_PATH } from "../../config/imageConfig.ts";
import PoiCell from "../../components/poiCell/index.tsx";
import { CellItem } from "../../interface/commonInterface.ts";
import { ShopItemInterface } from "../../interface/shopInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { getShopListPageListData } from "../../store/actions/shopListPage.ts";


interface Props{
    shopList:Array<ShopItemInterface>,
    count:number,
    loadMoreListData:(params)=>void
}

interface State{
    listdata:Array<ShopItemInterface>,
    isLoading:boolean,
    hasNextPage:boolean,
    pageIndex:number
}

class ShopList extends PureComponent<Props,State>{
    constructor(props){
        super(props)
        this.state={
            listdata:this.props.shopList,
            isLoading:false,
            hasNextPage:this.props.shopList?.length<this.props.count,
            pageIndex:1
        }
        this.loadMoreItems = this.loadMoreItems.bind(this);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }
    componentDidMount() {
        // 初始化加载第一页数据
        this.loadMoreItems();
      }
    
      loadMoreItems() {
        if (this.state.isLoading || !this.state.hasNextPage) {
          return;
        }
        // 设置isLoading为true，表示正在加载数据
        this.setState({
          isLoading: true,
          pageIndex:this.state.pageIndex+1
        });
         //发起请求，但是要如何感知请求已经返回来将isLoading设置为false呢？(在数据返回组件更新时)
        this.props.loadMoreListData({pageIndex:this.state.pageIndex});
      }
      isRowLoaded({ index }) {
        // 判断当前行是否已经加载
        return !!this.state.listdata[index];

      }
    
      rowRenderer({ index, key, style }) {
        // 渲染每一行的内容
        const item = this.dealListData(this.state.listdata[index]);
        // console.log('=======item===='+JSON.stringify(item));
    
        return (
          <div key={key} style={style}>
           <PoiCell 
                    title={item.title} 
                    desc={item.desc} 
                    img={item.img} 
                    id={item.id}
                    key={key}
                    onClickPoi={this.onCellClick}
                    />
          </div>
        );
      }
      shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
          //如果列表数据变长了应该刷新页面
          return nextProps.shopList?.length!==this.props.shopList?.length;

      }
      componentDidUpdate() {
          //刷新页面的时候更新列表项的配置
          this.setState(
            {
                listdata:this.props.shopList,
                isLoading:false,
                hasNextPage:this.props.shopList?.length<this.props.count,
            }
          )
      }

    dealListData=(shopListItem:ShopItemInterface)=>{
        if(!shopListItem){
            return {} as CellItem
        }
            const newItem:CellItem={
                title:shopListItem.shopName,
                desc:shopListItem.shopDesc,
                img:SHOP_LIST_PAGE_IMAGE_PATH+shopListItem.shopImg,
                id:shopListItem.shopId
            }
        return newItem;
    }
    onCellClick=(id:number)=>{
        this.props.history.push(`/shoppage/${id}`);
    }
    render(): ReactNode {
        const {shopList=[]}=this.props;
        // console.log('=====shopListshopList===='+JSON.stringify(shopList));
        if(shopList===null||shopList.length==0){
            return <div/>
        }
        return (
            <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreItems}
            rowCount={this.state.hasNextPage ? this.state.listdata.length + 1 : this.state.listdata.length}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {() => (
                  <List
                    height={window.innerHeight}
                    width={window.innerWidth}
                    rowCount={this.state.hasNextPage ? this.state.listdata.length + 1 : this.state.listdata.length}
                    rowHeight={200}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )
    }
}

const mapStateToProps=(state)=>{
    // console.log('=====qwe===='+JSON.stringify(state))
    const {shopListPageReducer:{shopListPageData:{listData:{shopList=[],count=0}}}}=state
    // console.log('=====shopList==='+JSON.stringify(shopList));
    // console.log('=======cc======',count);

    return {
        shopList,
        count
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadMoreListData:(params)=>dispatch(getShopListPageListData({isLoadMore:true,...params}))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShopList))