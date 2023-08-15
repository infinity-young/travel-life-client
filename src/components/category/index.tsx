import { categoryItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'
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
            <div className="button-group">
              {categoryList.map((button, index) => (
                <button 
                key={index} 
                className="button"
                onClick={()=>this.onClickButton(button)}
                >
                  {button.categoryName}
                </button>
              ))}
            </div>
          );
    }
    
}