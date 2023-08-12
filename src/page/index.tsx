import React from "react";
import { PureComponent, ReactNode } from "react";
import { Provider } from 'react-redux'
import HomePage from "./homPage.tsx";
import createStoreByRootTag from "../store/index.ts";
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import { initHomePage } from "../store/actions/homePage.ts";



export default class App extends PureComponent{
    private reduxStore = createStoreByRootTag()
    componentDidMount() {
        this.reduxStore.dispatch(initHomePage());
    }
    render(): ReactNode {
        return(
        <Provider store={this.reduxStore}>
             {console.log('-----------',this.reduxStore.getState())}
            <Router>
                <div>
                    <HomePage/>
                    <Routes>
                        <Route  path="/" component={HomePage} />
                        <Route path="/about" component={HomePage} />
                    </Routes>
                </div>
            </Router>
        </Provider>)
    }
}