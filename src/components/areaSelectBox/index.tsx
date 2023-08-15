import { AreaItem } from "interface/shopInterface";
import { PureComponent, ReactNode } from "react";
import React from 'react'
interface Props{
    areaList:Array<AreaItem>
    onSelectCity:(areaId:number)=>void;
}

interface State{
selectedOption:string;
}
export default class AreaSelectBox extends PureComponent<Props,State>{
    constructor(props){
        super(props);
        this.state={
            selectedOption:''
        }
    }
    onChange=(event)=>{
      this.setState({ selectedOption: event.target.value })
      this.props.onSelectCity(event.target.value)
    }
    render(): ReactNode {
        const { areaList } = this.props;
        const { selectedOption } = this.state;
        if(areaList?.length===0){
          return <div/>
        }
        return (
        <div className="select">
        <select
          value={selectedOption}
          onChange={(event) =>
           this.onChange(event)
          }
        >
          <option value="">全部城市</option>
          {areaList.map((area, index) => (
            <option key={index} value={area.areaId}>
              {area.areaName}
            </option>
          ))}
        </select>
      </div>

        )
    }
}