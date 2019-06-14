import axios from "axios";

import { GET_TRAINERPROFILES, CLEAR_PROFILE, PROFILE_ERROR } from "./types";

// Find nearby trainers
export const findNearby = (lat, lng) => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get(`/api/users?lng=${lng}&lat=${lat}`);

    dispatch({
      type: GET_TRAINERPROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
