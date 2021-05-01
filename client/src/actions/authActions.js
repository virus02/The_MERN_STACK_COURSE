import axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actions/types";
import { returnErrors } from "./errorActions";

// check token and load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

//Register user
export const register = ({ name, email, password }) => (dispatch) => {
  //header
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  //Request Body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

//Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//setup config/headers and token
export const tokenConfig = (getState) => {
  //Get token from local storage
  const token = getState().auth.token;

  //Header
  const config = {
    headers: {
      "Content-type": "Application/json",
    },
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
