import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/layouts/Login";
import Registrasiton from "./components/layouts/Registrasiton";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/registrasiton" component={Registrasiton} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
