import React from "react";
import { Switch, Route } from "react-router-dom";
import Fridge from "../containers/Fridge";
import BarcodeScanner from "../containers/BarcodeScanner";
import Register from '../containers/registerContainer';
const Main = props => (
  <main className="page-content">
    <Switch>
      <Route exact path="/" component={Fridge} />
      <Route exact path="/barcodeScanner" component={BarcodeScanner} />
      <Route exact path='/register' component={Register} />
    </Switch>
  </main>
);
export default Main;
