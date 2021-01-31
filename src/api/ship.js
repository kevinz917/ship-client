import api from "./index";

// Create ship
export const addShip = async () => {};

// Fetch ships
export const fetchShips = async (user) => {
  let fetchedShips = api.get("/ship");

  if (fetchedShips) {
    return fetchedShips.data.ships;
  }
  return null;
};
