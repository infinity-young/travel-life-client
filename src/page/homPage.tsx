import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";
import { Link } from 'react-router-dom';
import FrontBlockContainer  from "../container/frontBlockContainer/index.tsx";




export default class HomePage extends PureComponent{
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine/>
        <Link to="/next">
          <button>全部商店</button>
        </Link>
        <FrontBlockContainer/>
        </div>
       )
    }
}


