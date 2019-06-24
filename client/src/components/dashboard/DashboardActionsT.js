import React from "react";
import { Link } from "react-router-dom";

const DashboardActionsT = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-trainer-profile" className="btn btn-light">
        <i className="fa fa-user-circle text-primary" /> Edit Profile
      </Link>
    </div>
  );
};

export default DashboardActionsT;
