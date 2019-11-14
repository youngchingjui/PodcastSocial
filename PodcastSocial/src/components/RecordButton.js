import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { Context as RecorderContext } from "../context/RecorderContext";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";

import { FontAwesome } from "@expo/vector-icons";

const RecordButton = () => {
  const {
    state: { recordingPermissionStatus, isRecording, recordObject, recordings },
    startRecording,
    stopRecording,
    checkRecordingPermissions,
    requestRecordingPermission
  } = useContext(RecorderContext);

  const {
    state: { currentEpisode }
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    checkRecordingPermissions();
  }, []);

  return (
    <TouchableOpacity
      style={styles.recordButton}
      onPress={() => {
        console.log(recordingPermissionStatus);
        if (recordingPermissionStatus == "undetermined") {
          requestRecordingPermission();
        } else if (recordingPermissionStatus == "granted") {
          if (!isRecording) {
            startRecording();
          } else {
            stopRecording(recordObject, recordings, currentEpisode);
          }
        } else if (recordingPermissionStatus == "denied") {
          Alert.alert(
            "Require recording permissions",
            "Please go to Settings and Allow Recording for Social Podcast",
            [{ text: "OK", onPress: () => console.log("Pushed OK") }]
          );
          console.log("Please go to settings and allow recording");
        } else {
          console.log("Could not determine if recording permissions were set");
        }
      }}
    >
      <Svg height="100%" width="100%" style={styles.recordButtonBackground}>
        <Circle cx="50%" cy="50%" r="50%" fill="red" style={styles.oval1} />
      </Svg>
      {isRecording ? (
        <FontAwesome name="stop" size={50} style={styles.icon} color="white" />
      ) : (
        <FontAwesome
          name="microphone"
          size={50}
          color="white"
          style={styles.icon}
        />
      )}
      {recordingPermissionStatus == "granted" ? (
        <Text style={styles.recordText}>Record message</Text>
      ) : (
        <Text style={styles.recordText}>
          Tap to grant access to audio recording
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recordButton: {
    width: 100,
    height: 100
    // position: "absolute"
  },
  recordButtonBackground: {
    position: "absolute"
  },
  icon: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto"
  },
  recordText: {
    color: "white",
    // position: "absolute",
    textAlign: "center",
    width: "100%",
    fontSize: 12,
    paddingHorizontal: 7,
    paddingBottom: 6
  }
});

export default RecordButton;
