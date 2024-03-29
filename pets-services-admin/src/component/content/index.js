import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

class Content extends React.Component {

  render() {
    const Home = lazy(() => import('../home'));
    const Users = lazy(() => import('../users'));
    const UserForm = lazy(() => import('../users/userForm'));
    const Services = lazy(() => import('../services'));
    const Evaluations = lazy(() => import('../evaluations'));

    const isLogged = sessionStorage.getItem("jwt");

    if (!isLogged) {

      return <Redirect to="/"/>;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Suspense fallback={<div>Chargement...</div>}>
              <Switch>
                <Route path="/main/home" component={Home}></Route>
                <Route path="/main/users/add" component={UserForm}></Route>
                <Route path="/main/users/:id" component={UserForm}></Route>
                <Route path="/main/users" component={Users}></Route>
                <Route path="/main/services" component={Services}></Route>
                <Route path="/main/evaluations" component={Evaluations}></Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
export default Content;
