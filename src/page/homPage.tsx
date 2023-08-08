import React from "react";
import { PureComponent, ReactNode } from "react";
import HeadLine from "../container/headLineContainer/index.tsx";



export default class HomePage extends PureComponent{
    render(): ReactNode {
       return (
        <div>
        <span> HomePage</span>
        <HeadLine/>
        </div>
       )
    }
}