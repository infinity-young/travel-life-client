import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";
import { Link } from 'react-router-dom';
import FrontBlockContainer  from "../container/frontBlockContainer/index.tsx";
import ShopListPage from "./shopListPage.tsx";




export default class HomePage extends PureComponent{
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine/>
        {/* <Link to={{ pathname: '/shoplistpage/1' }}>
          <button>全部商店</button>
        </Link> */}
            <Link to={{ pathname: '/shoplistpage/1' }}>
          <button>全部商店</button>
        </Link>
        <FrontBlockContainer/>
        </div>
       )
    }
}


