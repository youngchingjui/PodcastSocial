import createDataContext from "./createDataContext";
import { Audio } from "expo-av";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "loadSoundObject":
      const { soundObject, audioURI } = state;
      console.log("Starting to load sound object");
      soundObject
        .loadAsync({
          uri: audioURI
        })
        .then(() => {
          console.log("soundObject loaded");
        });
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

const loadSoundObject = dispatch => {
  return () => {
    dispatch({ type: "loadSoundObject" });
  };
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
  authState: null,
  audioURI:
    "https://chtbl.com/track/78898/traffic.megaphone.fm/LMM3137604272.mp3"
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  { changeIsPlaying, forward, rewind, loadSoundObject },
  initialState
);

// export default Context;
