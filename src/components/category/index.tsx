import { categoryItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'
import style from './index.module.scss'
interface Props{
    categoryList:Array<categoryItem>,
    onClickCategory:(categoryId:number)=>void;
}
export default class Category extends PureComponent<Props>{
    onClickButton=(button:categoryItem)=>{
        this.props.onClickCategory(button.categoryId);
    }
    render(): ReactNode {
        const {categoryList}=this.props
        if(categoryList?.length==0){
            return <div/>
        }
        return (
            <div className={style.filterButtonContainer}>
              {categoryList.map((button, index) => (
                <button 
                key={index} 
                  onClick={() => this.onClickButton(button)}
                  className={style.button}
                >
                  {button.categoryName}
                </button>
              ))}
            </div>
          );
    }
    
}