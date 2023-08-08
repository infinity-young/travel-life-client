import React from "react";
import { PureComponent, ReactNode } from "react";
import { Provider } from 'react-redux'
import HomePage from "./homPage.tsx";
import createStoreByRootTag from "../store/index.ts";
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import { initHomePage } from "../store/actions/homePage.ts";



export default class App extends PureComponent{
    private reduxStore = createStoreByRootTag()
    constructor(props){
        super(props);
        this.reduxStore.dispatch(initHomePage());
    }

    render(): ReactNode {
        return(
        <Provider store={this.reduxStore}>
            <Router>
                <div>
                    <HomePage/>
                    <Routes>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/about" component={HomePage} />
                    </Routes>
                </div>
            </Router>
        </Provider>)
    }
}