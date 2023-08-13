import React from "react";
import { PureComponent, ReactNode } from "react";
import HomePage from "./homPage.tsx";
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import { connect } from "react-redux";
import { initHomePage } from "../store/actions/homePage.ts";


interface Props{
    initHomePage:()=>void;
}
export class App extends PureComponent<Props>{
    constructor(props){
        super(props);
        this.props.initHomePage()
    }
    render(): ReactNode {
        return(
            <Router>
                <div>
                    <HomePage/>
                    <Routes>
                        <Route  path="/" component={HomePage} />
                        <Route path="/about" component={HomePage} />
                    </Routes>
                </div>
            </Router>)
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        initHomePage:()=>dispatch(initHomePage())
    }
}
export default connect(null,mapDispatchToProps)(App)