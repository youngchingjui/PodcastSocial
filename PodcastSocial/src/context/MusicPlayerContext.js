// I'm trying to combine all Context data in this file now. For now, it includes data for:
// - Music Player
// - Search results

import createDataContext from "./createDataContext";
import { Audio } from "expo-av";
import { parseString } from "react-native-xml2js";
import * as Permissions from "expo-permissions";

const musicPlayerReducer = (state, action) => {
  var { recordObject } = state;
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
    case "startRecording":
      console.log("Trying to record");

      Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true
      });
      try {
        recordObject
          .prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
          .then(() => {
            console.log(recordObject);
            if (recordObject._canRecord) {
              recordObject.startAsync();
            } else {
              console.log("record Object is not prepared to record");
            }
          });
      } catch (error) {
        console.log("There was an error with trying to record a message");
        console.log(error);
      }
      return { ...state, isRecording: true };
    case "stopRecording":
      console.log("Trying to stop recording");
      try {
        recordObject.stopAndUnloadAsync().then(response => {
          console.log("Stopped recording, here's response:");
          console.log(response);
          return { ...state, isRecording: response.isRecording };
        });
      } catch (error) {
        console.log("There was an error with trying to stop recording");
        console.log(error);
      }
      return { ...state, isRecording: true };
    case "checkRecordingPermissions":
      return { ...state, recordingPermissionStatus: action.payload };
    case "requestRecordingPermission":
      return { ...state, recordingPermissionStatus: action.payload };
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

const startRecording = dispatch => {
  return () => {
    dispatch({ type: "startRecording" });
  };
};

const stopRecording = dispatch => {
  return () => {
    dispatch({ type: "stopRecording" });
  };
};

const checkRecordingPermissions = dispatch => {
  return () => {
    var status;
    Permissions.getAsync(Permissions.AUDIO_RECORDING).then(response => {
      console.log(response);
      dispatch({ type: "checkRecordingPermissions", payload: response.status });
    });
  };
};

const requestRecordingPermission = dispatch => {
  return () => {
    Permissions.askAsync(Permissions.AUDIO_RECORDING).then(response => {
      console.log(response);
      dispatch({
        type: "requestRecordingPermission",
        payload: response.status
      });
    });
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
  recordObject: new Audio.Recording(),
  isRecording: false,
  recordingPermissionStatus: "undetermined"
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
    startRecording,
    stopRecording,
    checkRecordingPermissions,
    requestRecordingPermission
  },
  initialState
);

// export default Context;
