import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";
import { Link } from 'react-router-dom';



export default class HomePage extends PureComponent<props>{
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine headLineList={this.props.headLineList}/>
        <Link to="/next">
        <button>全部商店</button>
      </Link>
        </div>
       )
    }
}