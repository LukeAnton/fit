import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import PrivateRoute from "./components/routing/PrivateRoute";
import MapConfig from "./components/findtrainers/MapConfig";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import axios from "axios";

import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const [trainers, setTrainers] = useState({
    trainerObj: []
  });

  const trainerObj = trainers;

  console.log(trainerObj);

  // eslint-disable-next-line
  useEffect(async () => {
    let result = await axios("/api/users?lng=154&lat=-34");
    setTrainers(result.data);

    store.dispatch(loadUser());
  }, []);

  // trainers = { trainers };
  return (
    // eslint-disable-next-line
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar trainers={trainers} />
          <Route exact path="/mapconfig" component={MapConfig} />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
