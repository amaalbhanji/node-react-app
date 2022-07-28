
import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import Landing from '../Landing';
import history from './history';
import Search from '../Search';
import myPage from '../MyPage';
import Reviews from '../Reviews';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/Reviews" exact component={Reviews} />
      <Route path="/Search" exact component={Search} />
      <Route path="/MovieLibrary" exact component={myPage} />

      </Switch>
    </Router>
  );
}