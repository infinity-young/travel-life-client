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
import styles from './index.module.scss'


interface Props extends RouteComponentProps{
    productList:Array<productItemInterface>,
    count:number,
    loadMoreListData:(params)=>void
}

interface State{
    isLoading:boolean,
    hasNextPage:boolean,
    pageIndex:number
}

class ProductList extends PureComponent<Props,State>{
    constructor(props){
        super(props)
        this.state={
            isLoading:false,
            hasNextPage:this.props.productList?.length<this.props.count,
            pageIndex:1
        }
        this.loadMoreItems = this.loadMoreItems.bind(this);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }
    
  loadMoreItems() {
        if (this.state.isLoading || !this.state.hasNextPage) {
          this.setState({
            ... this.state,
             isLoading: false,
           })
          return;
        }
        // 设置isLoading为true，表示正在加载数据
        this.setState({
          isLoading: true,
          pageIndex:this.state.pageIndex+1
        }, () => {
          this.props.loadMoreListData({ goodsListParam: { pageIndex: this.state.pageIndex } });
        });
      }
      isRowLoaded({ index }) {
        // 判断当前行是否已经加载
        return !!this.props.productList[index];

      }
    
  rowRenderer({ index, key,style }) {
        // 渲染每一行的内容
       const item = this.dealListData(this.props.productList[index]);
       if (index === this.props.count) {
         return (
         <div key={key} style={style}>
            <div className={styles.last}  key={key}>我是有底线的^_^</div>
         </div>
        );

        }
    
        return (
          <div key={key} style={style}>
           <PoiCell 
                    title={item.title} 
                    desc={item.desc} 
                    img={item.img} 
                    id={item.id}
                    onClickPoi={this.onCellClick}
                    />
          </div>
        );
      }

      componentDidUpdate() {
          //刷新页面的时候更新列表项的配置
          this.setState(
            {
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
      const { productList = [] } = this.props;
        if(productList===null||productList.length==0){
            return <div className={styles.noContent}>数据为空</div>
        }
      const rowCount = this.props.count + 1
      const listKey = JSON.stringify(productList);
        return (
            <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreItems}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({height,width}) => (
                  <List
                    height={height}
                    width={width}
                    rowCount={rowCount}
                    rowHeight={306}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    key={listKey}
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