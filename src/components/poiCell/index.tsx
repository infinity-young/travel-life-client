import { CellItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'

export default class PoiCell extends PureComponent<CellItem>{
render(): ReactNode {
    const{title,desc,img}=this.props;
    return (
        <div>
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