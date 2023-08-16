import { CellItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'

interface Props extends CellItem{
  onClickPoi:(id:number)=>void;
}
export default class PoiCell extends PureComponent<Props>{
render(): ReactNode {
    const{title,desc,img,id,onClickPoi}=this.props;
    return (
        <div onClick={()=>onClickPoi(id)}>
            <img
            src={img}
            />
            <div>
                <span>{title}</span>
                <span>{desc}</span>
            </div>
            <span>poi cell</span>
        </div>
    )
}
}