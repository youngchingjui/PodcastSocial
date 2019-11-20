import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState("");
  const [textURI, setTextURI] = useState("");
  const [recordObject, setRecordObject] = useState(null);

  const onPressRecording = async () => {
    if (isRecording) {
      // Stop recording
      try {
        setAudioURI(recordObject._uri);
        const response = await recordObject.stopAndUnloadAsync();
        console.log("Stopped recording, here's response:");
        console.log(response);
        setIsRecording(false);
      } catch (error) {
        console.log("There was an error with trying to stop recording");
        console.log(error);
      }
    } else {
      // Start recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true
      });
      const recObj = new Audio.Recording();
      try {
        await recObj.prepareToRecordAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        console.log(recObj);
        if (recObj._canRecord) {
          recObj.startAsync();
          setRecordObject(recObj);
          setIsRecording(true);
        } else {
          console.log("record Object is not prepared to record");
        }
      } catch (error) {
        console.log("There was an error with trying to record a message");
        console.log(error);
      }
    }
  };

  const checkRecordingPermissions = () => {
    Permissions.askAsync(Permissions.AUDIO_RECORDING).then(response => {
      console.log(response);
    });
  };

  useEffect(() => {
    checkRecordingPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPressRecording}
        style={styles.recorderButton}
      >
        {isRecording ? (
          <Text>Push to stop recording</Text>
        ) : (
          <Text>
            Push to start/stop recording. Tap me first to make an audio
            recording
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => sendEmail(audioURI)}
        style={styles.sendEmail}
      >
        <Text>
          Push to send email with audio recording. Make sure you made an audio
          recording first with the orange button above
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => sendEmail(textURI)}
        style={styles.sendEmail}
      >
        <Text>Push to send email with sample text file</Text>
      </TouchableOpacity>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  recorderButton: {
    height: 200,
    width: 200,
    backgroundColor: "orange"
  },
  sendEmail: {
    height: 200,
    width: 200,
    backgroundColor: "yellow"
  }
});
