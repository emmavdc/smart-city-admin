import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainPage from "../component/mainPage/MainPage";
import Signin from "../component/signin/Signin";

export default function router() {
  return (
    <Router>
      <Route path="/">
        <Signin></Signin>
      </Route>
      <Route path="/main">
        <MainPage></MainPage>
      </Route>
    </Router>
  );
}
