import React, { PureComponent, ReactNode } from "react";
import HomePage from "./homPage.tsx";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { connect } from "react-redux";
import { initHomePage } from "../store/actions/homePage.ts";

interface Props {
  initHomePage: () => void;
}

class App extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.props.initHomePage()
  }

  render(): ReactNode {
    return (
      <Router>
        <div>
          <HomePage />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    initHomePage: () => dispatch(initHomePage())
  }
}

export default connect(null, mapDispatchToProps)(App);