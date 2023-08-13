import { PureComponent } from "react";
import React from "react";
import { withRouter, RouteProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';



type Props = RouteProps<string> & PropsFromRedux;


export  class ShopListPage extends PureComponent<RouteProps&Props>{
    render(){
        const { parentId } = this.props.match.params;
        console.log('===parentIdpp==',parentId)
        console.log("======dfdfd====="+JSON.stringify(this.props))
       return(
        <div>
            <span> list1</span>
        </div>
       )
    }
}

const mapStateToProps = state => ({
    data: state.data
  });
  
  const connector = connect(mapStateToProps);
  
  type PropsFromRedux = ConnectedProps<typeof connector>;

export default withRouter(connect(mapStateToProps)(ShopListPage));

