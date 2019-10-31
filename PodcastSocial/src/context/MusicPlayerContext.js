// I'm trying to combine all Context data in this file now. For now, it includes data for:
// - Music Player
// - Search results

import createDataContext from "./createDataContext";
import { Audio } from "expo-av";
import { parseString } from "react-native-xml2js";
import * as Permissions from "expo-permissions";
import localServer from "../api/localServer";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "loadSoundObject":
      const { soundObject } = state;
      const currentPodcast = action.payload;
      if (
        Object.keys(currentPodcast).length === 0 &&
        currentPodcast.constructor === Object
      ) {
        console.log("No podcast is loaded! Not loading sound object");
      } else {
        if (!soundObject._loaded) {
          console.log("Starting to load sound object");
          soundObject
            .loadAsync({
              // uri: audioURI
              uri: currentPodcast.enclosure[0].$.url
            })
            .then(() => {
              console.log("soundObject loaded");
            });
        }
      }
      return {
        ...state,
        currentPodcast: currentPodcast,
        isCurrentPodcastLoaded: true
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

    case "updatePodcast":
      return { ...state, currentPodcast: action.payload };
    default:
      return state;
  }
};

const loadSoundObject = dispatch => {
  return async () => {
    const response = await localServer.get("/currentPodcast");
    dispatch({ type: "loadSoundObject", payload: response.data });
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
      console.log(result);
      results = result.rss.channel[0];
    });
    dispatch({ type: "getEpisodeList", payload: results });
  };
};

const updatePodcast = dispatch => {
  return async podcast => {
    console.log("Updating current podcast");
    await localServer.put("/currentPodcast", podcast);
    dispatch({ type: "updatePodcast", payload: podcast });
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
  currentPodcast: {},
  isCurrentPodcastLoaded: false
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
    updatePodcast
  },
  initialState
);
