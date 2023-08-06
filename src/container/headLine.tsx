import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import React from 'react';

interface Props{
    headLineList:Array<headLineType>
}
interface headLineType{
    lineId:number;
    lineName:string;
    lineLink:string;
    lineImg:string;
    priority:number;
    enableStatus:number;
    createTime:string;
    lastEditTime:string;
}
export class HeadLine extends PureComponent<Props>{
    render(): ReactNode {
        return(<div>
            <span>头条轮播图</span>
        </div>)
    }

}
const mapStateToProps=state=>{
    const {homePageReducer:{homePageData:headLineList=[]}={}}=state
    return headLineList;
}
export default connect(mapStateToProps)(HeadLine);