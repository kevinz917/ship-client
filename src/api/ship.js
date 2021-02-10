import axios from "axios";
import { Base } from "../util/base";

// Create ship
export const addShip = async (student1, student2) => {
  let newShip = await axios.post(`${Base}/ship/add`, {
    userLabels: [student1.split(" "), student2.split(" ")],
    note: "",
    privacy: "public",
  });
};

export const saveShips = async (shipList) => {
  let newShips = await axios.post(`${Base}/ship/addMultiple`, {
    shipList,
  });
};

// Fetch all ships
export const fetchShips = async () => {
  let fetchedShips = await axios.get(`${Base}/ship/all`);

  if (fetchedShips) {
    return fetchedShips.data.ships;
  }
  return null;
};

// Vote
export const toggleVote = async (shipId, vote) => {
  let fetchedVote = await axios.post(`${Base}/ship/vote`, { shipId, vote });

  if (fetchedVote) {
    return fetchedVote;
  }
  return null;
};

// fetchMyShips
export const fetchMyShips = async () => {
  let res = await axios.post(`${Base}/ship/fetchMyShips`);

  if (res) {
    return res.data.ships;
  }
};

export const removeShip = async (shipId) => {
  let res = await axios.post(`${Base}/ship/removeShip`, { shipId });
  if (res) {
    return res;
  }
};

// Count ships
export const countShips = async () => {
  let res = await axios.post(`${Base}/ship/count`);
  if (res) {
    return res.data.count;
  }
};
