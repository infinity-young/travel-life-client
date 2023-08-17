import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";
import { Link } from 'react-router-dom';
import FrontBlockContainer  from "../container/frontBlockContainer/index.tsx";
import { initHomePage } from "../store/actions/homePage.ts";
import { connect } from "react-redux";

interface Props {
  initHomePage: () => void;
}


export  class HomePage extends PureComponent<Props>{
  constructor(props){
    super(props);
    this.props.initHomePage();
  }
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine/>
          <Link to={{ pathname: '/shoplistpage' }}>
            <button>全部商店</button>
          </Link>
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

export default connect(null,mapDispatchToProps)(HomePage)



