import { ComponentType, PureComponent, ReactNode } from "react";
import { ConnectedProps, connect } from "react-redux";
import React from 'react';
import styles from './index.module.scss'
import { IMAGE_PATH } from "../../config/imageConfig.ts";
import { stateType } from 'interface/stateInterface.ts';

interface Props {
    headLineList: Array<HeadLineType>;
}

interface HeadLineType{
    lineId:number;
    lineName:string;
    lineLink:string;
    lineImg:string;
    priority:number;
    enableStatus:number;
    createTime:string;
    lastEditTime: string;
}
interface State{
    currentImageIndex:number;
}
export class HeadLine extends React.Component<Props,State>{
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
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render(): ReactNode {
        const { headLineList = [] } = this.props;
        const{currentImageIndex}=this.state;
        return(<div className={styles.container}>
            {headLineList?.map((item,index)=>{
                return (
                <a key={index} href={item.lineLink} target="_blank" rel="noopener noreferrer">
                 <img
                    key={index}
                    src={IMAGE_PATH+item.lineImg}
                    className={index===currentImageIndex?styles.active:styles.hidden}
               />
              </a>)
            })}
        </div>)
    }

}
const mapStateToProps = (state:stateType) => {
    const { homePageReducer: { homePageData: { headLineList = [] } = {} } = {} } = state;
    return { headLineList };
};

const connector = connect(mapStateToProps, null);

// 从连接器中提取 Props 类型
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(HeadLine as PropsFromRedux);

