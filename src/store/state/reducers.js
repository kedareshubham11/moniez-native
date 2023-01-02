import { combineReducers } from "redux";
import { UPDATE_USERNAME, UPDATE_AA_DATA, UPDATE_PROFILE } from "../constants";

const user = (user = { username: "" }, action) => {
  switch (action.type) {
    case UPDATE_USERNAME:
      return { username: action.username };
    default:
      return user;
  }
};

const userData = (data = { data: {} }, action) => {
  switch (action.type) {
    case UPDATE_AA_DATA:
      return { data: action.data };
    default:
      return data;
  }
};
const profile = (profile = { data: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return { data: action.data };
    default:
      return profile;
  }
};

export default combineReducers({ user, userData, profile });
