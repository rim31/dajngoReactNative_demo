import React, { Component, Fragment } from "react";
// import Header from "./components/Header";
import Home from "./components/Home";
import Layout from "./components/Layout";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Layout />
        {/* <Header /> */}
        <Home />
      </Fragment>
    );
  }
}

export default App;