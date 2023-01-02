import { UPDATE_USERNAME } from "../constants";

export const updateUsername = (username) => ({
  type: UPDATE_USERNAME,
  username,
});
