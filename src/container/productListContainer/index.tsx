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
import isEqual from 'lodash/isEqual';



interface Props extends RouteComponentProps{
    productList:Array<productItemInterface>,
    count: number,
    pageIndex:number,
    loadMoreListData:(params)=>void
}

class ProductList extends PureComponent<Props>{
  private resolveLoadMorePromise;
  private rejectLoadMorePromise;
    constructor(props){
        super(props)
        this.loadMoreItems = this.loadMoreItems.bind(this);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
    }
    
  loadMoreItems() {
    return new Promise((resolve, reject) => {
      if (this.props.count<=this.props.productList.length) {
        resolve(false);
      }
      this.props.loadMoreListData({ goodsListParam: { pageIndex: this.props.pageIndex+1 } });
      this.resolveLoadMorePromise = resolve;
      this.rejectLoadMorePromise = reject;
      
    })
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

      componentDidUpdate(prevProps) {
          //刷新页面的时候更新列表项的配置
        if (isEqual(this.props.productList, prevProps.productList)) {
          if (this.resolveLoadMorePromise) {
            this.resolveLoadMorePromise()
            this.resolveLoadMorePromise=null
          }
        }
        if (this.props.error != prevProps.error) {
          if (this.props.error && this.props.error !== prevProps.error) {
            this.rejectLoadMorePromise();
            this.rejectLoadMorePromise=null
          }
        }
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
          return <div  className={styles.noContentContainer}>
              <div className={styles.noContent}>数据为空</div>
            </div>
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
                {({width}) => (
                  <List
                    height={innerHeight*0.7}
                    width={width}
                    rowCount={rowCount}
                    rowHeight={306}
                    rowRenderer={this.rowRenderer}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    key={listKey}
                    className={styles.listContainer}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        )
    }
}

const mapStateToProps=(state)=>{
    const {shopPageReducer:{shopPageData:{productListData:{productList=[],count=0},productListParam:{pageIndex}}}}=state;
    return {
        productList,
      count,
      pageIndex
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loadMoreListData:(params)=>dispatch(getShopPageList({isLoadMore:true,...params}))
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProductList))