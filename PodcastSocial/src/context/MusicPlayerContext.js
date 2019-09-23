import React from "react";
import createDataContext from "./createDataContext";
import localServer from "../api/localServer";
import { Audio } from "expo-av";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "changeIsPlaying":
      return { ...state, isPlaying: action.payload };
    case "forward":
      state.soundObject.getStatusAsync().then(response => {
        const current_position = response.positionMillis;
        console.log(current_position);
        state.soundObject.playFromPositionAsync(current_position + 10000);
      });
      return state;
    case "rewind":
      state.soundObject.getStatusAsync().then(response => {
        const current_position = response.positionMillis;
        console.log(current_position);
        state.soundObject.playFromPositionAsync(current_position - 10000);
      });
      return state;
    default:
      return state;
  }
};

const changeIsPlaying = dispatch => {
  return isPlaying => {
    dispatch({ type: "changeIsPlaying", payload: isPlaying });
  };
};

const forward = dispatch => {
  return () => {
    console.log("forward");
    dispatch({ type: "forward" });
  };
};

const rewind = dispatch => {
  return () => {
    console.log("rewind");
    dispatch({ type: "rewind" });
  };
};

export const initialState = {
  currentUser: {},
  soundObject: new Audio.Sound(),
  isLoaded: false,
  isPlaying: false,
  authState: null
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  { changeIsPlaying, forward, rewind },
  initialState
);

export default Context;
