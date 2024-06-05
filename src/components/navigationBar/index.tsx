import React, { PureComponent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styles from './index.module.scss'

interface Props extends RouteComponentProps{
    title:string
}
//back
export  class NavigationBar extends PureComponent<Props>{
    render(): React.ReactNode {
        return (
            <div className={styles.container}>
            <button onClick={()=>this.props.history.goBack()} className={styles.back} >
            </button>
            </div>
        )
    
    }
}

export default withRouter(NavigationBar);