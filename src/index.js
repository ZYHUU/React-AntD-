import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import Admin from './admin';
import Router from "./router";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configureStore";
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);
