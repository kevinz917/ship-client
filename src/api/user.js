import api from "./index";
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
