import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout, trainers }) => {
  const authLinks = (
    <ul>
      <li>
        <Link
          to={{
            pathname: "/mapconfig",
            props: {
              trainers: trainers
            }
          }}
        >
          Find
        </Link>
      </li>
      <li>
        <Link to="/profiles">Trainers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fa fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="#!">
          <i className="fa fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Trainers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <svg
            className="fit"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 112.4263 90.6739"
          >
            <path
              className="fit"
              d="M47.4146,9.79c-4.0323,0-8.0953-.3032-11.9854-.6772-.3638,5.6977-1.002,14.8643-1.5957,23.2905.5752-.0268,1.12-.04,1.6245-.04a51.668,51.668,0,0,1,9.5859,1.1338c2.4737.5151,3.71,2.061,3.71,3.6074,0,1.9585-1.4429,3.6074-4.3291,3.6074-1.752,0-5.772-.7217-8.7612-.7217-.8213,0-1.6109.0259-2.3706.0723L33.0874,42.98C31.541,64.3159,25.769,73.3862,14.019,73.3862,6.4946,73.3862.001,67.9233.001,61.7388c0-3.0918,1.9585-4.8438,3.9165-4.8438,2.1645,0,3.0923,1.1338,3.8139,3.71a6.3043,6.3043,0,0,0,6.2876,5.0508c6.2872,0,9.07-7.0088,10.41-23.2945.0132-.1577.0332-.4116.0586-.7495-2.8579.7915-5.0225,1.5752-6.7583,1.5752-2.4736,0-3.6074-1.1343-3.6074-2.9892,0-1.4434,1.0307-2.7832,2.7827-3.814a28.6851,28.6851,0,0,1,8.1675-2.8281c.6186-8.6831,1.48-21.1167,1.7119-25.33-2.9087-.2857-5.5884-.4951-7.9219-.4951-6.4936,0-10.2046,2.68-10.2046,7.4214,0,4.9477,3.4019,6.1845,5.6694,7.8335a3.9031,3.9031,0,0,1,1.9581,3.2983c0,1.8555-1.34,3.1953-4.3287,3.1953C6.2871,29.479,0,23.2949,0,15.2549,0,6.1846,6.5967,0,18.6562,0c9.07,0,18.8624,2.0615,27.4175,2.0615,5.2564,0,7.627-1.6489,10.1011-1.6489,2.2676,0,3.7105,1.4429,3.7105,3.2983,0,3.8135-6.5967,6.0811-12.4717,6.0811Z"
            />
            <path
              className="fit"
              d="M64.6255,73.6968c-6.7,0-11.75-5.0508-11.75-17.2129A145.9681,145.9681,0,0,1,55.04,35.8687c.5152-2.9893,2.4737-4.5352,4.4322-4.5352,2.1645,0,4.1225,1.7519,3.71,5.4629-.7217,6.3906-2.0615,14.3271-2.0615,20.3057,0,7.2148,1.8555,9.07,4.02,9.07,4.1231,0,9.2764-10.5137,12.5742-19.0684.7666-1.9531,2.0733-2.74,3.3291-2.74a3.44,3.44,0,0,1,3.3457,3.455,3.989,3.989,0,0,1-.2841,1.45C78.231,64.3179,73.3853,73.6978,64.6245,73.6978ZM55.3481,21.2334a4.8963,4.8963,0,1,1,4.9473,4.9473A4.8621,4.8621,0,0,1,55.3481,21.2334Z"
            />
            <path
              className="fit"
              d="M105.7563,47.106a3.6364,3.6364,0,0,1,3.3262-2.6768,3.3819,3.3819,0,0,1,3.3438,3.3877,4.0647,4.0647,0,0,1-.2813,1.4521c-6.082,16.1827-11.4414,24.4288-20.7187,24.4288-8.6582,0-14.1211-5.4629-14.1211-17.5225,0-4.6387.9277-11.75,2.0625-18.9658.3379-2.1851.74-4.6558,1.15-7.2984q-1.0109-.0191-2.0782-.02c-2.68,0-4.02-1.7524-4.02-3.6079,0-1.752,1.3409-3.5044,4.2256-3.5044q1.45,0,2.9033.0361c.5655-4.2622,1.0362-8.6943,1.22-12.92a4.1675,4.1675,0,0,1,4.3281-4.1225,4.0065,4.0065,0,0,1,4.02,4.2255c0,1.9991-.63,7.5811-1.373,13.3667,2.8154.3091,5.6962.7564,8.69,1.3731a3.2934,3.2934,0,0,1,2.7832,3.4014,3.2853,3.2853,0,0,1-3.1953,3.5044c-1.126,0-4.1641-.7217-9.2227-1.2388-.4863,3.4941-.9306,6.4834-1.19,8.0415a124.0647,124.0647,0,0,0-1.958,18.2446c0,7.2149,2.2676,9.4824,6.1836,9.4824,6.5976,0,11.1328-11.956,13.916-19.0683Z"
            />
            <line
              className="cls-2"
              x1="7.7134"
              y1="87.1739"
              x2="94.7134"
              y2="87.1739"
            />
          </svg>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
