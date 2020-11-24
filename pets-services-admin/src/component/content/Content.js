import React from "react";
import { Switch, Route } from "react-router-dom";
import "../users/Users";
import "../services/Services";
import "../evaluations/Evaluations";
import "../home/Home";
import Users from "../users/Users";
import Services from "../services/Services";
import Evaluations from "../evaluations/Evaluations";
import Home from "../home/Home";
class Content extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Switch>
              <Route path="/users" component={Users}></Route>
              <Route path="/services" component={Services}></Route>
              <Route path="/evaluations" component={Evaluations}></Route>
              <Route path="/" component={Home}></Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
