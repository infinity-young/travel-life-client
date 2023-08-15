import { PureComponent } from "react";
import React from "react";
import { withRouter, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { initShopListPage } from "../store/actions/shopListPage.ts";

interface  ShopListPageProps{
    initShopListPage:(parentId:number)=>void;
}

type Props = RouteProps<string> & PropsFromRedux&ShopListPageProps;


export  class ShopListPage extends PureComponent<RouteProps&Props>{
    constructor(props){
        super(props)
        const { parentId } = this.props.match.params;
        this.props.initShopListPage(parentId)
    }
    render(){
        const { parentId } = this.props.match.params;
        console.log('===parentIdpp==',parentId)
        console.log("======dfdfd====="+JSON.stringify(this.props))
       return(
        <div>
            <span> list1</span>
        </div>
       )
    }
}

const mapStateToProps = state => {
    console.log('===shoplist===state======'+JSON.stringify(state));
    return {
        data: state.data
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

