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
  isLoading: false,
};

const state = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.field]: action.payload };
    case "SET_USERID":
      return {
        ...state,
        userInfo: { ...state.userInfo, userId: action.payload },
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          groups: action.payload.groups,
          email: action.payload.email,
          role: action.payload.role,
          reactions: action.payload.reactions,
        },
      };
    case "SET_FETCHED_CARDS":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          sentCards: action.payload.sentCards.reverse(),
          receivedCards: action.payload.receivedCards.reverse(),
        },
      };
    case "RESET_STATE":
      return defaultState;
    default:
      return state;
  }
};

const MasterReducer = combineReducers({ state });

export { SET_VAL, RESET_STATE, MasterReducer };
