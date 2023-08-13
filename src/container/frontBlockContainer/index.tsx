import { PureComponent, ReactNode } from "react";
import ShopItem, { ShopItemInterface } from "../../components/shopItem/index.tsx";
import { connect } from "react-redux";
import React from "react";
import styles from './index.module.scss'

interface FrontBlockInterface{
    shopCategoryList:Array<ShopItemInterface>
}
export  class FrontBlock extends PureComponent<FrontBlockInterface>{
    componentDidUpdate(prevProps) {
        if (prevProps.shopCategoryList !== this.props.shopCategoryList) {
          // shopCategoryList has changed, update the component
          const { shopCategoryList } = this.props;
          // do something with the updated shopCategoryList
        }
      }
      
    render(): ReactNode {
        const {shopCategoryList}=this.props;

        console.log('====shopCategoryList===='+JSON.stringify(shopCategoryList));
        if(shopCategoryList?.length===0){
            return ( <div/>);
        }
        return <div className={styles.container}>
            {shopCategoryList?.map((item,index)=>{
                return (<div className={styles.itemContainer} key={index}>
                    <ShopItem {...item}/>
                </div>)
            })}
        </div>
    }

}
const mapStateToProps=(state)=>{ 
    console.log('======'+JSON.stringify(state)) 

    const { homePageReducer: { homePageData: { shopCategoryList = [] } = {} } = {} } = state; 
    console.log("====shopCategoryList=="+JSON.stringify(shopCategoryList));
    return { shopCategoryList };
}

export default connect(mapStateToProps)(FrontBlock);
