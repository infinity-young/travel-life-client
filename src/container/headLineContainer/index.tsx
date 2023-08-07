import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import React from 'react';
import styles from './index.scss'

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
interface State{
    currentImageIndex:number;
}
export class HeadLine extends PureComponent<Props,State>{
    private interval;
    constructor(props){
        super(props);
        this.state={
            currentImageIndex:0
        }
    }
    componentDidMount(){
        this.interval=setInterval(()=>{
            this.setState((prevState)=>{
                currentImageIndex:(prevState.currentImageIndex+1)%this.props.headLineList?.length;
            })}
        ,1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render(): ReactNode {
        const {headLineList}=this.props;
        console.log("===ss==="+JSON.stringify(styles))
        // console.log("=hh===="+JSON.stringify(headLineList))
        const{currentImageIndex}=this.state;
        return(<div className={styles.container}>
            {headLineList?.map((item,index)=>{
                <img
                key={index}
                src={item.lineImg}
                className={index===currentImageIndex?styles.active:''}
                />
            })}
        </div>)
    }

}
const mapStateToProps = state => {
    // console.log("== state==1=="+JSON.stringify(state))
    const { homePageReducer: { homePageData: { headLineList = [] } = {} } = {} } = state;
    return { headLineList };
  };
const mapDispatchToProps=()=>{
}
export default connect(mapStateToProps,mapDispatchToProps)(HeadLine);