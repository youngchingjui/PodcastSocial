// RecordContext.js;

import createDataContext from "./createDataContext";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import localServer from "../api/localServer";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "startRecording":
      return { ...state, recordObject: action.recordObject, isRecording: true };
    case "stopRecording":
      return { ...state, isRecording: false };
    case "checkRecordingPermissions":
      return { ...state, recordingPermissionStatus: action.payload };
    case "requestRecordingPermission":
      return { ...state, recordingPermissionStatus: action.payload };
    case "loadRecordings":
      return { ...state, recordings: action.payload };
    default:
      return state;
  }
};

const startRecording = dispatch => {
  return () => {
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
    const recordObject = new Audio.Recording();
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
    dispatch({ type: "startRecording", recordObject });
  };
};

const stopRecording = dispatch => {
  return async recordObject => {
    console.log("Trying to stop recording");
    try {
      const payload = {};
      payload["uri"] = recordObject._uri;
      const response = await recordObject.stopAndUnloadAsync();
      console.log("Stopped recording, here's response:");
      console.log(response);
      payload["durationMillis"] = response.durationMillis;
      saveRecordingMetadata(payload);
    } catch (error) {
      console.log("There was an error with trying to stop recording");
      console.log(error);
    }
    dispatch({ type: "stopRecording" });
  };
};

const checkRecordingPermissions = dispatch => {
  return () => {
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

const loadRecordings = dispatch => {
  return async () => {
    const recordings = await localServer.get("/recordings");
    dispatch({ type: "loadRecordings", payload: recordings.data });
  };
};

const saveRecordingMetadata = async data => {
  console.log("Saving recording data:");
  console.log(data);
  const response = await localServer.post("/recordings", data);
  console.log(response);
};
const sendRecording = dispatch => () => {
  console.log("Sending recording to podcaster");
};

export const initialState = {
  recordObject: null,
  isRecording: false,
  recordingPermissionStatus: "undetermined",
  recordings: []
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  {
    startRecording,
    stopRecording,
    checkRecordingPermissions,
    requestRecordingPermission,
    sendRecording,
    loadRecordings
  },
  initialState
);
