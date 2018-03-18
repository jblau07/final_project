import React from "react";
import { Switch, Route } from "react-router-dom";
import Fridge from "../containers/Fridge";
import BarcodeScanner from "../containers/BarcodeScanner";
const Main = props => (
  <main className="page-content">
    <Switch>
      <Route exact path="/" component={Fridge} />
      <Route exact path="/scan" component={BarcodeScanner} />
    </Switch>
  </main>
);
export default Main;
