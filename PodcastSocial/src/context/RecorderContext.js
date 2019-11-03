// RecordContext.js;

import { AsyncStorage } from "react-native";

import createDataContext from "./createDataContext";

import airtable from "../api/airtable";

import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";

const musicPlayerReducer = (state, action) => {
  switch (action.type) {
    case "startRecording":
      return { ...state, recordObject: action.recordObject, isRecording: true };
    case "stopRecording":
      return { ...state, recordings: action.payload, isRecording: false };
    case "checkRecordingPermissions":
      return { ...state, recordingPermissionStatus: action.payload };
    case "requestRecordingPermission":
      return { ...state, recordingPermissionStatus: action.payload };
    case "loadRecordings":
      return { ...state, recordings: action.payload };
    case "createTestFile":
      return { ...state, uri: action.payload };
    default:
      return state;
  }
};

const startRecording = dispatch => {
  return async () => {
    console.log("Trying to record");

    //TODO: Stop podcast from playing
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
      await recordObject.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      console.log(recordObject);
      if (recordObject._canRecord) {
        recordObject.startAsync();
      } else {
        console.log("record Object is not prepared to record");
      }
    } catch (error) {
      console.log("There was an error with trying to record a message");
      console.log(error);
    }
    dispatch({ type: "startRecording", recordObject });
  };
};

const stopRecording = dispatch => {
  return async (recordObject, recordings, currentEpisode) => {
    console.log("Trying to stop recording");
    try {
      const newRecording = await recordObject.stopAndUnloadAsync();
      console.log("Stopped recording, here's response:");
      console.log(newRecording);
      newRecording["uri"] = recordObject._uri;
      newRecording["episode"] = currentEpisode;

      // uploadRecording(payload);

      console.log("Saving recording data:");
      if (recordings) {
        recordings.push(newRecording);
      } else {
        recordings = Array(newRecording);
      }
      await AsyncStorage.setItem("recordings", JSON.stringify(recordings));

      dispatch({ type: "stopRecording", payload: recordings });
    } catch (error) {
      console.log("There was an error with trying to stop recording");
      console.log(error);
    }
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
    const recordings = await AsyncStorage.getItem("recordings");
    dispatch({ type: "loadRecordings", payload: JSON.parse(recordings) });
  };
};

const sendRecording = dispatch => async (recipients, uri) => {
  console.log("Sending recording to podcaster");

  //TODO: Implementation on hold.
};

const recordIntentToSend = dispatch => async (
  file_name,
  podcaster_email,
  recording_address,
  user_id
) => {
  try {
    const data = {
      fields: {
        file_name,
        podcaster_email,
        recording_address,
        user_id
      }
    };
    const response = await airtable.post("/send_recording_logs", data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const deleteRecording = dispatch => () => {
  console.log("Deleting recording");
};

const playRecording = dispatch => () => {
  console.log("Playing recording");
};

const msToTime = dispatch => s => {
  const pad = (n, z) => {
    z = z || 2;
    return ("00" + n).slice(-z);
  };

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  if (hrs == 0) {
    return pad(mins) + ":" + pad(secs);
  } else {
    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs);
  }
};

// Helper functions for RecorderContext. Not exported.
const saveRecordingMetadata = async (newRecording, recordings) => {
  console.log("Saving recording data:");
  recordings.push(newRecording);
  await AsyncStorage.setItem("recordings", JSON.stringify(recordings));
  return recordings;
  // const response = await localServer.post("/recordings", data);
  // console.log(response);
};

// const uploadRecording = async payload => {
//   console.log("Uploading recording to S3");
//   const { uri } = payload;
//   try {
//     const fileResponse = await fetch(uri);
//     const blob = await fileResponse.blob();
//     const filename = uri.replace(/^.*[\\\/]/, "");
//     const response = await Storage.put(filename, blob);
//     console.log(response);
//   } catch (err) {
//     console.log(err);
//   }
// };

export const initialState = {
  recordObject: null,
  isRecording: false,
  recordingPermissionStatus: "undetermined",
  recordings: [],
  uri: ""
};

export const { Context, Provider } = createDataContext(
  musicPlayerReducer,
  {
    startRecording,
    stopRecording,
    checkRecordingPermissions,
    requestRecordingPermission,
    sendRecording,
    loadRecordings,
    deleteRecording,
    playRecording,
    msToTime,
    recordIntentToSend
  },
  initialState
);
