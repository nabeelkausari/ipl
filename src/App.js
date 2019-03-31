import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './views/home';
import Login from './views/login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login/" component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
