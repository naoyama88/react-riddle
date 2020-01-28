import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Detail from './Detail';
import CreateRiddle from './CreateRiddle';
import Home from './Home';

import Header from './Header';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/riddles/:riddleId" component={Detail}></Route>
          <Route path="/create" component={CreateRiddle}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
