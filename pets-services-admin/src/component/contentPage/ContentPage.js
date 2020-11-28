import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

class ContentPage extends React.Component {

  render() {
    const Home = lazy(() => import('../home/Home'));
    const Users = lazy(() => import('../users/Users'));
    const Services = lazy(() => import('../services/Services'));
    const Evaluations = lazy(() => import('../evaluations/Evaluations'));

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
export default ContentPage;
