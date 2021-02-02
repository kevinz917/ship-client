import axios from "axios";
import { Base } from "../util/base";

// Create user
export const addUser = async () => {};

export const casCheck = async () => {
  let auth = await axios.get(`${Base}/auth/check`);

  if (auth) {
    return auth;
  }
};

// Fetch all students
export const fetchStudents = async () => {
  let fetchedStudentList = await axios.get(`${Base}/user/allStudents`);

  if (fetchedStudentList) {
    return fetchedStudentList.data.data;
  }
};

// Fetch all ships from 1 user
export const fetchShips = async () => {
  let fetchedShips = await axios.get(`${Base}/user/fetchShips`);
  if (fetchedShips) {
    return fetchedShips.data.ships;
  }
};

// Fetch user info
export const fetchUser = async () => {
  let fetchedInfo = await axios.get(`${Base}/user/fetchUser`);
  if (fetchedInfo) {
    return fetchedInfo.data.user;
  }
};

export const TogglePrivacy = async (privacy) => {
  let toggled = await axios.post(`${Base}/user/togglePrivacy`, { privacy });
  return toggled;
};
