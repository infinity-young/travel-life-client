import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../../container/headLineContainer/index.tsx";
import FrontBlockContainer  from "../../container/frontBlockContainer/index.tsx";
import { initHomePage } from "../../store/actions/homePage.ts";
import { connect } from "react-redux";
import { RouteComponentProps } from 'react-router-dom';
import styles from './index.module.scss'



interface Props {
  initHomePage: () => void;
}


export  class HomePage extends PureComponent<RouteComponentProps&Props>{
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
        <div className='common-page-container'>
          <div className='title-text'>Travel Life</div>
           <div >
             <HeadLine/>
             <button onClick={() => this.goToShopListpage()} className={styles.button}>全部商店</button>
             <FrontBlockContainer onItemClick={this.goToShopListpage}/>
            </div>
        </div>
       )
    }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    initHomePage:()=>dispatch(initHomePage())
  }
}
export default connect(null, mapDispatchToProps)(HomePage);



