import { IMAGE_PATH } from "../../config/imageConfig.ts";
import PoiCell from "../../components/poiCell/index.tsx";
import { CellItem } from "../../interface/commonInterface.ts";
import { ShopItemInterface } from "../../interface/shopInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized';
import { getShopListPageListData } from "../../store/actions/shopListPage.ts";
import styles from './index.module.scss'
import isEqual from 'lodash/isEqual';



interface Props{
    shopList:Array<ShopItemInterface>,
    count:number,
    loadMoreListData: (params) => void,
    pageIndex:number
}

class ShopList extends PureComponent<Props> {
  private resolveLoadMorePromise;
  private rejectLoadMorePromise;
  constructor(props) {
    super(props)
  }
  loadMoreItems = () => {
      // 创建一个新的 Promise
      return new Promise((resolve, reject) => {
        // 检查是否已经在加载数据或没有更多数据
       if (!(this.props.shopList?.length<this.props.count)) {
        resolve(false);
        } else {
          // 调用 store 中的 loadMoreListData 函数，并传入参数和 callback
          this.props.loadMoreListData({
            listParams: { pageIndex: this.props.pageIndex+1 },       
          });  
          this.resolveLoadMorePromise = resolve;
          this.rejectLoadMorePromise = reject;
        }
    
      });
    };
  componentWillUnmount() {
    // 清理promise的引用
    this.resolveLoadMorePromise = null;
    this.rejectLoadMorePromise = null;
  }
    
  isRowLoaded = ({ index }) => {
    // 判断当前行是否已经加载
    return !!this.props.shopList[index];

  }
    
  rowRenderer = ({ index, key,style }) => {
    // 渲染每一行的内容
    const item = this.dealListData(this.props.shopList[index]);
    if (index > this.props.count-1) {
      return (
        <div key={key} style={style}>
          <div className={styles.last} >我是有底线的^_^</div>
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
          addr={item.addr}
          onClickPoi={this.onCellClick}
        />
      </div>
    );
  }
  componentDidUpdate(prevProps) {
      // 如果接收到新的列表数据，则决议 Promise
      if (!isEqual(this.props.shopList, prevProps.shopList)) {
        if (this.resolveLoadMorePromise) {
          this.resolveLoadMorePromise();
          this.resolveLoadMorePromise = null;
        }
      }
      // 如果发生了错误，则根据实际情况处理（例如，显示错误信息）
      if (this.props.error && this.props.error !== prevProps.error) {
        // 处理错误情况
        if (this.rejectLoadMorePromise) {
          this.rejectLoadMorePromise();
          this.rejectLoadMorePromise = null;
        }
      }
    }


    dealListData=(shopListItem:ShopItemInterface)=>{
        if(!shopListItem){
            return {} as CellItem
        }
            const newItem:CellItem={
                title:shopListItem.shopName,
                desc:shopListItem.shopDesc,
                img:IMAGE_PATH+shopListItem.shopImg,
                id: shopListItem.shopId,
                addr:shopListItem.shopAddr
            }
        return newItem;
    }
    onCellClick=(id:number)=>{
        this.props.history.push(`/shoppage/${id}`);
    }
    render(): ReactNode {
        const {shopList=[]}=this.props;
      if (shopList === null || shopList.length == 0) {
        return <div className={styles.noContent}>数据为空</div>
        }
      const rowCount = this.props.count + 1;
      const listKey=JSON.stringify(shopList)
      return (
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreItems}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ width, height}) => (
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
    const {shopListPageReducer:{shopListPageData:{listData:{shopList=[],count=0},listRequestParam:{pageIndex}}}}=state

    return {
        shopList,
        count,
        pageIndex
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      loadMoreListData: (params) => dispatch(getShopListPageListData({ isLoadMore: true, ...params })),
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ShopList))