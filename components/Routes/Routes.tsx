import React from "react";
import { Route, Switch } from "react-router";
import ArticlesList from "../Articles/ArticlesList";
import Article from "../Articles/Article";

const Routes = props => {
  return (
    <Switch>
      <Route path="/article/:id" component={Article} />
      <Route path="/" render={() => <ArticlesList />} />
    </Switch>
  );
};

export default Routes;
