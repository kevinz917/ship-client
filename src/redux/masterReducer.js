import { combineReducers } from "redux";

const SET_VAL = (field, payload) => {
  return {
    type: "SET_VAL",
    field,
    payload,
  };
};

const RESET_STATE = () => {
  return {
    type: "RESET_STATE",
  };
};

const defaultState = {
  auth: -1,
  isLoading: false,
  ships: [],
};

const state = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.field]: action.payload };
    case "RESET_STATE":
      return defaultState;
    default:
      return state;
  }
};

const MasterReducer = combineReducers({ state });

export { SET_VAL, RESET_STATE, MasterReducer };
