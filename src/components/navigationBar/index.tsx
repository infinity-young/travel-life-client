import React, { PureComponent } from 'react';
import { withRouter,RouteComponentProps } from 'react-router-dom';
interface Props extends RouteComponentProps{
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