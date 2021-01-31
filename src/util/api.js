import axios from "axios";
import { Base } from "./base";

// Create user
export const addUser = async () => {};

// Create ship
export const addShip = async () => {};

// Fetch ships
export const fetchShips = async (user) => {
  let fetchedShips = await axios.get(`${Base}/ship/`);

  if (fetchedShips) {
    return fetchedShips.data.ships;
  }
  return null;
};
