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
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    this.props.initHomePage();
      
  }
  goToShopListpage=(parentId?:number)=>{
    //点击全部按钮和底部button，跳转到店铺列表页
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
        <button onClick={()=>this.goToShopListpage()}>全部商店</button>
        <FrontBlockContainer onItemClick={this.goToShopListpage}/>
        </div>
       )
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    initHomePage:()=>dispatch(initHomePage())
  }
}
// const mapStateToProps = (state) => {
//   return state;
// }

export default connect(null, mapDispatchToProps)(HomePage);



