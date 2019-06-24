import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardActionsT from "./DashboardActionsT";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profilet";
import TrainerNavbar from "../layout/TrainerNavbar";
const DashboardT = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(
    () => {
      getCurrentProfile();
    },
    [getCurrentProfile]
  );

  return (
    <Fragment>
      <TrainerNavbar />
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user" />
        Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActionsT />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fa fa-user-minus" />
              Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p> You have not yet set up a profile, please add some info </p>
          <Link to="/create-trainer-profile" className="btn btn-light my-1">
            Edit Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardT.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(DashboardT);
