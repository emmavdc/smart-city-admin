import React from "react";
import { Switch, Route } from "react-router-dom";
import "../users/Users";
import "../services/Services";
import "../evaluations/Evaluations";
import Users from "../users/Users";
import Services from "../services/Services";
import Evaluations from "../evaluations/Evaluations";
class Content extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <Switch>
            <Route path="/users" component={Users}></Route>
            <Route path="/services" component={Services}></Route>
            <Route path="/evaluations" component={Evaluations}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}
export default Content;
