import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import LoginT from "./components/auth/LoginT";
import Register from "./components/auth/Register";
import RegisterT from "./components/auth/RegisterT";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardT from "./components/dashboard/DashboardT";
import CreateProfile from "./components/profile-forms/CreateProfile";
import CreateTrainerProfile from "./components/profile-forms/CreateTrainerProfile";
import EditTrainerProfile from "./components/profile-forms/EditTrainerProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import PrivateRoute from "./components/routing/PrivateRoute";
import MapConfig from "./components/findtrainers/MapConfig";
import GeoLocate from "./components/findtrainers/GeoLocate";
import { loadUser } from "./actions/auth";
import { loadUserT } from "./actions/autht";
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

    store.dispatch(loadUserT());
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
              <Route exact path="/registert" component={RegisterT} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logint" component={LoginT} />
              <Route exact path="/geolocate" component={GeoLocate} />

              <Route exact path="/profiles" component={Profiles} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/dashboardt" component={DashboardT} />
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
              <PrivateRoute
                exact
                path="/create-trainer-profile"
                component={CreateTrainerProfile}
              />
              <PrivateRoute
                exact
                path="/edit-trainer-profile"
                component={EditTrainerProfile}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
