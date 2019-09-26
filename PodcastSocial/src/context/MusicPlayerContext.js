// I'm trying to combine all Context data in this file now. For now, it includes data for:
// - Music Player
// - Search results

import createDataContext from "./createDataContext";
import { Audio } from "expo-av";
import { parseString } from "react-native-xml2js";

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
    case "updateAudioURI":
      return { ...state, audioURI: action.payload };
    case "getEpisodeList":
      return { ...state, episodeList: action.payload };
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

const updateAudioURI = dispatch => {
  return uri => {
    console.log(`Updating Audio URI: ${uri}`);
    dispatch({ type: "updateAudioURI", payload: uri });
  };
};

const getEpisodeList = dispatch => {
  return async feedUrl => {
    console.log("getEpisodeList");
    const response = await fetch(feedUrl);
    const text = await response.text();

    var results;
    parseString(text, (err, result) => {
      results = result.rss.channel[0].item;
    });

    console.log(results[0]);
    dispatch({ type: "getEpisodeList", payload: results });
  };
};

export const initialState = {
  currentUser: {},
  soundObject: new Audio.Sound(),
  isLoaded: false,
  isPlaying: false,
  authState: null,
  audioURI:
    "https://chtbl.com/track/78898/traffic.megaphone.fm/LMM3137604272.mp3",
  searchResults: [],
  episodeList: []
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  {
    changeIsPlaying,
    forward,
    rewind,
    loadSoundObject,
    getEpisodeList,
    updateAudioURI
  },
  initialState
);

// export default Context;
