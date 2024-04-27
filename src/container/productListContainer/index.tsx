import { IMAGE_PATH } from "../../config/imageConfig.ts";
import PoiCell from "../../components/poiCell/index.tsx";
import { CellItem } from "../../interface/commonInterface.ts";
import { PureComponent, ReactNode } from "react";
import React from 'react';
import { connect } from "react-redux";
import { withRouter,RouteComponentProps } from 'react-router-dom';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { productItemInterface } from "../../interface/productInterface.ts";
import { getShopPageList } from "../../store/actions/shopPage.ts";


interface Props extends RouteComponentProps{
    productList:Array<productItemInterface>,
    count:number,
    loadMoreListData:(params)=>void
}

interface State{
    listdata:Array<productItemInterface>,
    isLoading:boolean,
    hasNextPage:boolean,
    pageIndex:number
}

class ProductList extends PureComponent<Props,State>{
    constructor(props){
        super(props)
        this.state={
            listdata:this.props.productList,
            isLoading:false,
            hasNextPage:this.props.productList?.length<this.props.count,
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
         //发起请求，但是要如何感知请求已经返回来将isLoading设置为false呢？(在数据返回组件更新时)//goodsListParam
        this.props.loadMoreListData({goodsListParam:{pageIndex:this.state.pageIndex}});
      }
      isRowLoaded({ index }) {
        // 判断当前行是否已经加载
        return !!this.state.listdata[index];

      }
    
      rowRenderer({ index, key, style }) {
        // 渲染每一行的内容
        const item = this.dealListData(this.state.listdata[index]);
    
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
      // shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
      //     //如果列表数据变长了应该刷新页面
      //     return nextProps.productList?.length!==this.props.productList?.length;

      // }
      componentDidUpdate() {
          //刷新页面的时候更新列表项的配置
          this.setState(
            {
                listdata:this.props.productList,
                isLoading:false,
                hasNextPage:this.props.productList?.length<this.props.count,
            }
          )
      }

    dealListData=(productListItem:productItemInterface)=>{
        if(!productListItem){
            return {} as CellItem
        }
            const newItem:CellItem={
                title:productListItem.productName,
                desc:productListItem.productDesc,
                img:IMAGE_PATH+productListItem.imgAddr,
                id:productListItem.productId
            }
        return newItem;
    }
    onCellClick=(id:number)=>{
        this.props.history.push(`/goodsdetailpage/${id}`);
    }
    render(): ReactNode {
        const {productList=[]}=this.props;
        if(productList===null||productList.length==0){
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
    const {shopPageReducer:{shopPageData:{productListData:{productList=[],count=0}}}}=state;
    return {
        productList,
        count
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadMoreListData:(params)=>dispatch(getShopPageList({isLoadMore:true,...params}))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProductList))