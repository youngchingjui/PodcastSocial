import React from "react";
import createDataContext from "./createDataContext";
import localServer from "../api/localServer";
import { Audio } from "expo-av";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const initialState = {
  currentUser: {},
  soundObject: new Audio.Sound(),
  status: { isLoaded: false },
  authState: null
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  {},
  initialState
);

export default Context;
