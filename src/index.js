import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import Writingpage from "./pages/Writingpage.js";
import Dashboard from "./pages/Dashboard.js";
import GoogleDriveDashboard from "./pages/GoogleDriveDashboard.js";
import NewGoogleDriveDashboard from "./pages/NewGoogleDriveDashboard.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
//import "./style/main.css";

const hist = createBrowserHistory();

// use exact before path to get exact path match
ReactDOM.render(
  <BrowserRouter>
    <Route exact path="/" component={NewGoogleDriveDashboard}></Route>
    <Route path="/writingpage/:id" component={Writingpage}></Route>
    {/* <Route path="/writingpage/" component={Writingpage}></Route> */}
    {/* <Route path="/" component={Writingpage}></Route>  */}
  </BrowserRouter>,
  document.getElementById("root")
);
