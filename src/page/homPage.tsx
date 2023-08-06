import React from "react";
import { PureComponent, ReactNode } from "react";
import { Provider } from 'react-redux'
import { initHomePage } from "../store/actions/homePage.ts";
import createStoreByRootTag from "../store/index.ts";
import HeadLine from "../container/headLine.tsx";



export default class HomePage extends PureComponent{
    private reduxStore = createStoreByRootTag()

    constructor(props){
        super(props)
        this.reduxStore.dispatch(initHomePage());
    }
    render(): ReactNode {
       return ( <Provider store={this.reduxStore }>
        <div>
        <span> HomePage</span>
        <HeadLine/>
        </div>
     </Provider>)
    }
}