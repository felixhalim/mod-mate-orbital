import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext.context";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import Login from "./pages/login.pages";
import SignUp from "./pages/signup.pages";
import Profile from "./pages/profile/profile.pages";
import Inbox from "./pages/inbox/inbox.pages";
// import TestPage from "./pages/testpage.pages";
import Header from "./components/header/header.component";
import Friends from "./pages/friends/friends.pages";
import QuickMatch from "./pages/quickmatch/quickmatch.pages";
import ComboMatch from "./pages/combomatch/combomatch.pages";
import ChatPage from "./pages/chat/chat-page.component";
import "./App.css";

const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  palette: {
    primary: {
      main: "#372f6c",
    },
    secondary: {
      main: "#8b66e0",
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <UserProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/" component={Header} />
          </Switch>
          <Route path="/quick-match" component={QuickMatch} />
          <Route path="/combo-match" component={ComboMatch} />
          <Route path="/friends" exact component={Friends} />
          <Route path="/friends/:id" component={ChatPage} />
          <Route path="/inbox" component={Inbox} />
          <Route path="/profile" component={Profile} />
          <Route path="/chat-page" component={ChatPage} />
          {/* <Route path="/test" component={TestPage} exact /> */}
        </div>
      </Router>
    </UserProvider>
  </ThemeProvider>
);

export default App;
