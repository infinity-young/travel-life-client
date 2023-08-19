import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";
import FrontBlockContainer  from "../container/frontBlockContainer/index.tsx";
import { initHomePage } from "../store/actions/homePage.ts";
import { connect } from "react-redux";
import { withRouter, RouteProps } from 'react-router-dom';


interface Props {
  initHomePage: () => void;
}


export  class HomePage extends PureComponent<RouteProps&Props>{
  constructor(props){
    super(props);
    this.props.initHomePage();
  }
  goToShopListpage=(parentId?:number)=>{
    //点击全部按钮和底部button，跳转到店铺列表页
    console.log('=====pp====',parentId);
    if(parentId){
      this.props.history.push(`/shoplistpage/${parentId}`);
    }else{
      this.props.history.push('/shoplistpage');
    }
  }
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine/>
          {/* <Link to={{ pathname: '/shoplistpage' }}> */}
            <button onClick={()=>this.goToShopListpage(1)}>全部商店</button>
          {/* </Link> */}
        <FrontBlockContainer/>
        </div>
       )
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    initHomePage:()=>dispatch(initHomePage())
  }
}

export default connect(null, mapDispatchToProps)(withRouter(HomePage));



