import React from "react";
import { PureComponent, ReactNode } from "react";
import { Provider } from 'react-redux'
import HomePage from "./homPage.tsx";
import createStoreByRootTag from "../store/index.ts";


export default class App extends PureComponent{
    private reduxStore = createStoreByRootTag()

    render(): ReactNode {
        return(<Provider store={this.reduxStore}>
            <span>ceshi</span>
           <HomePage/>
        </Provider>)
    }
}