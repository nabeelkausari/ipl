import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './views/home';
import Login from './views/login';
import requireAuth from './hoc/requireAuth';
import requireUnAuth from './hoc/requireUnAuth';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={requireAuth(Home)} />
          <Route path="/login/" component={requireUnAuth(Login)} />
        </Switch>
      </Router>
    );
  }
}

export default App;
