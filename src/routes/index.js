import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "../App";
import User from "../components/user";
import Routes from "../components/routes";
import Registros from "../components/registros";
import { ContextStore } from "../store";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" render={props => <ContextStore comp={<App {...props}/> } />} />
      <Route exact path="/map" render={props => <ContextStore comp={<App {...props}/> } />} />
      <Route exact path="/user" render={props => <ContextStore comp={<User {...props}/> } />} />
      <Route exact path="/routes" render={props => <ContextStore comp={<Routes {...props}/> } />} />
      <Route exact path="/registros" render={props => <ContextStore comp={<Registros {...props}/> } />} />
    </Switch>
  </BrowserRouter>
);
