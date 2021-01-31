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
