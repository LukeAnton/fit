import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createTrainerProfile } from "../../actions/profilet";
import TrainerNavbar from "../layout/TrainerNavbar";

const CreateTrainerProfile = ({ createTrainerProfile, history }) => {
  const [formData, setFormData] = useState({
    location: "",
    bio: "",
    skills: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    location,
    bio,
    skills,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createTrainerProfile(formData, history);
  };
  return (
    <Fragment>
      <TrainerNavbar />
      <h1 className="large text-primary">Create Profile</h1>
      <p className="lead">
        <i className="fa fa-user" /> Let's get your profile set up!
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select
            type="text"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          >
            <option value="0">* Location</option>
            <option value="Sydney">Sydney</option>
            <option value="Melbourne">Melbourne</option>
          </select>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself</small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="What skills do you have?"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. Crossfit, Strength,
            Endurance)
          </small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            {" "}
            <div className="form-group social-input">
              <i className="fa fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>
            <div className="form-group social-input">
              <i className="fa fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-light my-1 " />
        <Link className="btn btn-light my-1" to="/dashboardt">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateTrainerProfile.propTypes = {
  createTrainerProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createTrainerProfile }
)(withRouter(CreateTrainerProfile));
