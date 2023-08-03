import React from "react";
import { PureComponent, ReactNode } from "react";

export default class UserPage extends PureComponent{
    constructor(props){
        super(props);
        //初始化页面参数，如请求配置等
    }
    render(): ReactNode {
        return(<div >
            <span >my travel and life </span>
        </div>)
    }
}