import React, { PureComponent, ReactNode } from "react";
import HomePage from "./homPage.tsx";
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
        <div>
          <HomePage />
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    initHomePage: () => dispatch(initHomePage())
  }
}

export default connect(null, mapDispatchToProps)(App);