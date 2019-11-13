import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import { Audio } from "expo-av";
import listenNotes from "../api/listennotes";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "loadSoundObject":
      return {
        ...state,
        isCurrentEpisodeLoaded: true,
        soundObject: action.payload
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
    case "getEpisodeList":
      return { ...state, episodeList: action.payload };
    case "updateCurrentEpisode":
      return { ...state, currentEpisode: action.payload };
    case "loadMusicPlayerState":
      return { ...state, currentEpisode: action.payload.currentEpisode };
    case "unloadCurrentEpisodeSoundObject":
      return { ...state, soundObject: null };
    default:
      return state;
  }
};

const loadSoundObject = dispatch => {
  return async currentEpisode => {
    if (
      Object.entries(currentEpisode).length === 0 &&
      currentEpisode.constructor === Object
    ) {
      console.log("currentEpisode not loaded:" + currentEpisode);
    } else {
      const soundObject = new Audio.Sound();
      console.log("Starting to load sound object");
      await soundObject.loadAsync({
        uri: currentEpisode.audio
      });
      console.log("soundObject loaded");
      dispatch({
        type: "loadSoundObject",
        payload: soundObject
      });
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

const getEpisodeList = dispatch => {
  return async podcastId => {
    console.log("getEpisodeList");
    const response = await listenNotes(`/podcasts/${podcastId}`);
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

const loadMusicPlayerState = dispatch => async () => {
  console.log("Updating Music Player State");

  // As we add more variables stored on local storage, add them here.
  const response = await AsyncStorage.getItem("currentEpisode");
  const currentEpisode = JSON.parse(response);
  console.log("Finished updating music player state");
  dispatch({ type: "loadMusicPlayerState", payload: { currentEpisode } });
};

const unloadCurrentEpisodeSoundObject = dispatch => async soundObject => {
  if (soundObject) {
    await soundObject.unloadAsync();
    dispatch({ type: "unloadCurrentEpisodeSoundObject" });
  }
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
    updateCurrentEpisode,
    loadMusicPlayerState,
    unloadCurrentEpisodeSoundObject
  },
  initialState
);
