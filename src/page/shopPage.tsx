import { PureComponent, ReactNode } from "react";
import React from 'react'
import { connect } from "react-redux";

export class  ShopPage extends PureComponent{
    render(): ReactNode {
        return(
            <div>
                <span>shop page</span>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{}
}
const mapDispatchToProps=(dispatch)=>{
    return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage)