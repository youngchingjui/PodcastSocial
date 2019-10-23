// RecordContext.js;

import createDataContext from "./createDataContext";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";
import localServer from "../api/localServer";
import * as MailComposer from "expo-mail-composer";
import * as FileSystem from "expo-file-system";
import { readDirectoryAsync } from "expo-file-system";

// import Storage from "@aws-amplify/storage";
// import API from "@aws-amplify/api";

// import config from "../../aws-exports";
// API.configure(config);

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
    case "createTestFile":
      return { ...state, uri: action.payload };
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
const sendRecording = dispatch => async (recipients, attachment) => {
  console.log("Sending recording to podcaster");
  console.log(attachment);

  // var filename = attachment.replace(/^.*[\\\/]/, "");
  // console.log(filename);

  // // Make sure documentDirector/AV/ folder exists
  // const documentDirectory = await FileSystem.getInfoAsync(
  //   FileSystem.documentDirectory + "AV/"
  // );
  // if (!documentDirectory.exists) {
  //   await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "AV/");
  // }

  // const newFile = FileSystem.documentDirectory + "AV/" + filename;
  // // Copy the file from the cache folder to documentDirectory folder. For some reason, cannot upload attachment from cache folder into email
  // try {
  //   copyAsyncOptions = {
  //     from: attachment,
  //     to: newFile
  //   };
  //   await FileSystem.copyAsync(copyAsyncOptions);
  // } catch (e) {
  //   console.log("There was an error trying to copy the file");
  //   console.log(e);
  // }

  // // Check that the new file is there
  // const readDirectoryResponse = await FileSystem.readDirectoryAsync(
  //   FileSystem.documentDirectory + "AV/"
  // );
  // console.log(readDirectoryResponse);

  options = {
    recipients: recipients,
    subject: "Testing sending mail and attachment from React Native",
    body: "This is a test body message",
    isHtml: true,
    attachments: [attachment]
  };
  const response = await MailComposer.composeAsync(options);

  console.log(response);
};
const deleteRecording = dispatch => () => {
  console.log("Deleting recording");
};
const playRecording = dispatch => () => {
  console.log("Playing recording");
};

const createTestFile = dispatch => {
  return async () => {
    console.log("Creating new test file");
    const uri = FileSystem.documentDirectory + "AV/test.txt";
    const writeResponse = await FileSystem.writeAsStringAsync(
      uri,
      "testing text"
    );
    console.log("Finished creating document");
    console.log(writeResponse);

    console.log("TEST uploading to S3 TEST");

    const result = await Storage.put("test.txt", "Hello");
    console.log(result);

    dispatch({ type: "createTestFile", payload: uri });
  };
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
    createTestFile
  },
  initialState
);
