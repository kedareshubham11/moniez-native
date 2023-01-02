import { UPDATE_PROFILE } from "../constants";

export const updateProfile = (data) => ({
  type: UPDATE_PROFILE,
  data,
});
