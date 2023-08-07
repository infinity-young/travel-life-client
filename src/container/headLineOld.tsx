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
export class HeadLineOld extends PureComponent<Props>{
    componentWillUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): void {
        return true;
    }
    render(): ReactNode {
        // console.log("=pp====="+JSON.stringify(this.props))
        return(<div>
            <span>头条轮播图</span>
        </div>)
    }

}
const mapStateToProps = state => {
    // console.log("==old state===="+JSON.stringify(state))
    const {homePageReducer:{homePageData:headLineList=[]}={}}=state
    return {headLineList};
}
export default connect(mapStateToProps)(HeadLineOld);