import React from "react";
import { Switch, Route } from "react-router-dom";
import Fridge from "../containers/Fridge";
import BarcodeScanner from "../containers/BarcodeScanner";
import Register from "../containers/registerContainer";
import Login from "../containers/LoginContainer";
import ConnectedRecipes from "../containers/RecipeContainer";

const Main = props => (
  <main className="page-content">
    <Switch>
      <Route exact path="/fridge" component={Fridge} />
      <Route exact path="/scan" component={BarcodeScanner} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/recipes" component={ConnectedRecipes} />
    </Switch>
  </main>
);
export default Main;
