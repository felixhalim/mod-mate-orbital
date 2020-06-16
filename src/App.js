import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login.pages";
import SignUp from "./pages/signup.pages";
import TestPage from "./pages/testpage.pages";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/test" component={TestPage} exact />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
