import { CellItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react';
import style from './index.module.scss'

interface Props extends CellItem{
  onClickPoi:(id:number)=>void;
}
export default class PoiCell extends PureComponent<Props>{
render(): ReactNode {
    const { title, desc, img, id, onClickPoi,addr } = this.props;
    return (
        <div className={style.card}>
            <img
                src={img}
                className={style.img}
            />
            <div className={style.contentContainer}>
                <div className={style.title}>{title}</div>
                <div className={style.desc}>{desc}</div>
                <div className={style.addr}>{addr }</div>
            </div>
            <div className={style.buttonContainer}>
                <button onClick={()=>onClickPoi(id)}>详情</button>
            </div>
        </div>
    )
}
}