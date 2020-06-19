import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login.pages";
import SignUp from "./pages/signup.pages";
// import TestPage from "./pages/testpage.pages";

import Header from "./pages/header/header.component";
import "./App.css";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={SignUp} exact />
        {/* <Route path="/test" component={TestPage} exact /> */}
        <Route path="/" component={Header} />
      </Switch>
      <Route path="/quick-match" />
      <Route path="/combo-match" />
      <Route path="/friends" />
      <Route path="/inbox" />
      <Route path="/profile" />
    </div>
  </Router>
);

export default App;
