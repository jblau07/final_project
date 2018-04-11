import React from "react";
import { Switch, Route } from "react-router-dom";
import Fridge from "../containers/Fridge";
import BarcodeScanner from "../containers/BarcodeScanner";
import Register from "../containers/registerContainer";
import Login from "../containers/LoginContainer";
import ImageCapture from "../containers/ImageCapture";
import ConnectedRecipes from "../containers/RecipeContainer";
import ConnectedCookbook from "../containers/CookbookContainer";

const Main = props => (
  <div className="page-content">
    <Switch>
      <Route exact path="/fridge" component={Fridge} />
      <Route exact path="/scan" component={BarcodeScanner} />
      <Route exact path="/image" component={ImageCapture} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/" component={Login} />
      <Route exact path="/search" component={ConnectedRecipes} />
      <Route exact path="/cookbook" component={ConnectedCookbook}/>
    </Switch>
  </div>
);
export default Main;
