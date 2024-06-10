import { categoryItem } from "interface/commonInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'
import style from './index.module.scss'
interface Props{
  categoryList:Array<categoryItem>,
  onClickCategory: (categoryId: number) => void;
}
interface stateProps{
  selectedCategoryId: number; 
}
export default class Category extends PureComponent<Props, stateProps>{
  constructor(props) {
    super(props)
    this.state = {
      selectedCategoryId: -1
    }
    }
    onClickButton=(button:categoryItem)=>{
      this.props.onClickCategory(button.categoryId);
      this.setState({
        selectedCategoryId:button.categoryId
      })
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
                key={button.categoryId} 
                  onClick={() => this.onClickButton(button)}
                  className={ button.categoryId===this.state.selectedCategoryId?style.buttonSelected:style.button}
                >
                  {button.categoryName}
                </button>
              ))}
            </div>
          );
    }
    
}