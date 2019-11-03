import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { Audio } from "expo-av";
import { parseString } from "react-native-xml2js";
import * as Permissions from "expo-permissions";
import listenNotes from "../api/listennotes";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "loadSoundObject":
      const { soundObject } = state;
      const currentEpisode = action.payload;
      if (
        Object.keys(currentEpisode).length === 0 &&
        currentEpisode.constructor === Object
      ) {
        console.log("No podcast is loaded! Not loading sound object");
      } else {
        if (!soundObject._loaded) {
          console.log("Starting to load sound object");
          soundObject
            .loadAsync({
              uri: currentEpisode.audio
            })
            .then(() => {
              console.log("soundObject loaded");
            });
        }
      }
      return {
        ...state,
        currentEpisode,
        isCurrentEpisodeLoaded: true
      };
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

    case "updateCurrentEpisode":
      return { ...state, currentEpisode: action.payload };
    default:
      return state;
  }
};

const loadSoundObject = dispatch => {
  return async () => {
    try {
      const currentEpisode = await AsyncStorage.getItem("currentEpisode");
      if (currentEpisode !== null) {
        dispatch({
          type: "loadSoundObject",
          payload: JSON.parse(currentEpisode)
        });
      }
    } catch (err) {
      console.log(err);
    }
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
  return async podcastId => {
    console.log("getEpisodeList");
    const response = await listenNotes(`/podcasts/${podcastId}`);

    // const text = await response.text();

    // var results;
    // parseString(text, (err, result) => {
    //   console.log(result);
    //   results = result.rss.channel[0];
    // });
    dispatch({ type: "getEpisodeList", payload: response.data });
  };
};

const updateCurrentEpisode = dispatch => {
  return async episode => {
    console.log("Updating current episode");

    try {
      await AsyncStorage.setItem("currentEpisode", JSON.stringify(episode));
      dispatch({ type: "updateCurrentEpisode", payload: episode });
    } catch (err) {
      console.log(err);
    }
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
  episodeList: [],
  currentEpisode: {},
  isCurrentEpisodeLoaded: false
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  {
    changeIsPlaying,
    forward,
    rewind,
    loadSoundObject,
    getEpisodeList,
    updateAudioURI,
    updateCurrentEpisode
  },
  initialState
);
