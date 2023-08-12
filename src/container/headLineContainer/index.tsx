import { PureComponent, ReactNode } from "react";
import { connect } from "react-redux";
import React from 'react';
import styles from './index.module.scss'
import { HOME_PAGE_IMAGE_PATH } from "../../config/imageConfig.ts";

interface Props{
    headLineList:Array<HeadLineType>
}
interface HeadLineType{
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
                return {currentImageIndex:(prevState.currentImageIndex+1)%this.props.headLineList?.length}
            })}
        ,3000);
    }
    componentDidUpdate() {
        return true;
        
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    handleClick = () => {
        // 调用 forceUpdate 函数强制更新组件
        this.forceUpdate();
      }
    render(): ReactNode {
        const {headLineList}=this.props;
        // console.log("==1===="+JSON.stringify(headLineList))
        if(headLineList.length===0){
            return ( <div>
                <button onClick={this.handleClick}>强制更新</button>
                <p>当前时间：{new Date().toLocaleTimeString()}</p>
              </div>);
        }
        // console.log("==2=="+JSON.stringify(styles))
        const{currentImageIndex}=this.state;
        return(<div className={styles.container}>
            {headLineList?.map((item,index)=>{
               return  <img
               key={index}
               src={HOME_PAGE_IMAGE_PATH+item.lineImg}
               className={index===currentImageIndex?styles.active:styles.hidden}
               />
            })}
        </div>)
    }

}
const mapStateToProps = state => {
    // console.log("=state======"+JSON.stringify(state));
    const { homePageReducer: { homePageData: { headLineList = [] } = {} } = {} } = state;
    return { headLineList };
  };
export default connect(mapStateToProps)(HeadLine);