// RecordContext.js;

import { AsyncStorage } from "react-native";

import createDataContext from "./createDataContext";

import airtable from "../api/airtable";

import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

import { Storage, Auth } from "aws-amplify";
import { createSwitchNavigator } from "react-navigation";

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
    case "deleteRecording":
      return { ...state, recordings: action.payload };
    case "loadRecorderState":
      return { ...state, recordings: action.payload.recordings };
    case "playRecording":
      return { ...state, recordings: action.payload };
    default:
      return state;
  }
};

const startRecording = dispatch => {
  return async () => {
    console.log("Start recording");

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
    console.log("Stop recording");
    try {
      const newRecording = await recordObject.stopAndUnloadAsync();
      newRecording["uri"] = recordObject._uri;
      newRecording["episode"] = currentEpisode;

      // Upload to S3
      uploadRecording(newRecording);

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
  console.log("Loading recordings");
  return async () => {
    const recordings = await AsyncStorage.getItem("recordings");
    dispatch({ type: "loadRecordings", payload: JSON.parse(recordings) });
  };
};

const sendRecording = dispatch => async (recipients, uri) => {
  console.log("Sending recording to podcaster");

  //TODO: Implementation on hold.
};

const recordIntentToSend = dispatch => async (uri, podcaster_email) => {
  var username = null;
  var user_email = null;
  var user_phone = null;
  var identityId = null;
  try {
    const user = await Auth.currentAuthenticatedUser();
    username = user.username;
    user_email = user.attributes.email;
    if (user.attributes.phone_number) {
      user_phone = user.attributes.phone_number;
    }

    const credentials = await Auth.currentCredentials();
    identityId = credentials._identityId;
  } catch (err) {
    console.log(err);
  }

  const filename = uri.replace(/^.*[\\\/]/, "");
  try {
    const data = {
      fields: {
        filename,
        identityId,
        podcaster_email,
        username,
        user_email,
        user_phone
      }
    };
    const response = await airtable.post("/send_recording_logs", data);
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

const deleteRecording = dispatch => {
  return async (recording, recordings) => {
    console.log("Deleting recording");

    // Delete from state
    recordings = recordings.filter(rec => rec.uri != recording.uri);
    dispatch({ type: "deleteRecording", payload: recordings });

    // Delete from local storage
    const file = await FileSystem.getInfoAsync(recording.uri);
    if (file.exists) {
      FileSystem.deleteAsync(recording.uri);
    } else {
      console.warn("File does not exist: " + recording.uri);
    }
    // Delete metadata from local storage
    await AsyncStorage.setItem("recordings", JSON.stringify(recordings));

    // Delete from S3
    const filename = recording.uri.replace(/^.*[\\\/]/, "");
    try {
      const response = await Storage.remove(filename, { level: "private" });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
};

const playRecording = dispatch => async (recording, recordings) => {
  console.log("Playing recording");
  const soundObject = new Audio.Sound();
  const _onPlaybackStatusUpdate = async playbackStatus => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
      } else {
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        await soundObject.unloadAsync();
      }
    }
  };

  soundObject.setOnPlaybackStatusUpdate(_onPlaybackStatusUpdate);
  await soundObject.loadAsync({ uri: recording.uri });
  await soundObject.playAsync();
};

const msToTime = dispatch => (s, format) => {
  switch (format) {
    case "time":
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
    case "date":
      const date = new Date(s);
      const options = { weekday: "short", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    default:
      console.warn("Did not provide correct format");
  }
};

const loadRecorderState = dispatch => async () => {
  console.log("Updating Recorder State");

  // As we add more variables stored on local storage, add them here.
  const rec = await AsyncStorage.getItem("recordings");
  const recordings = JSON.parse(rec);

  dispatch({ type: "loadRecorderState", payload: { recordings } });
};

// Helper functions for RecorderContext. Not exported.
const uploadRecording = async payload => {
  console.log("Uploading recording to S3");
  const { uri } = payload;
  try {
    const fileResponse = await fetch(uri);
    const blob = await fileResponse.blob();
    const filename = uri.replace(/^.*[\\\/]/, "");
    const response = await Storage.put(filename, blob, { level: "private" });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

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
    recordIntentToSend,
    loadRecorderState
  },
  initialState
);
