import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
interface Props{
    title:string
}
export  class NavigationBar extends PureComponent<Props>{
    render(): React.ReactNode {
        return (
            <div>
            <button onClick={()=>this.props.history.goBack()}>
                返回
            </button>
            <span>{this.props.title}</span>
            </div>
        )
    
    }
}

export default withRouter(NavigationBar);