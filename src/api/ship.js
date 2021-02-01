import api from "./index";

// Create ship
export const addShip = async (student1, student2) => {
  let newShip = api.post("/ship/add", {
    userIds: [
      student1.split(" ").slice(0, 2).join(" "),
      student2.split(" ").slice(0, 2).join(" "),
    ],
    note: "",
    privacy: "public",
  });
};

// Fetch ships
export const fetchShips = async (user) => {
  let fetchedShips = api.get("/ship");

  if (fetchedShips) {
    return fetchedShips.data.ships;
  }
  return null;
};
