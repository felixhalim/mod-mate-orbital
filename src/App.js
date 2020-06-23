import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.context";

import Login from "./pages/login.pages";
import SignUp from "./pages/signup.pages";
import Profile from "./pages/profile/profile.pages";
// import TestPage from "./pages/testpage.pages";
import Header from "./components/header/header.component";
import Friends from "./pages/friends/friends.pages";
import "./App.css";

const App = () => (
  <UserProvider>
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/" component={Header} />
        </Switch>
        <Route path="/quick-match" />
        <Route path="/combo-match" />
        <Route path="/friends" component={Friends} />
        <Route path="/inbox" />
        <Route path="/profile" component={Profile} />
        {/* <Route path="/test" component={TestPage} exact /> */}
      </div>
    </Router>
  </UserProvider>
);

export default App;
