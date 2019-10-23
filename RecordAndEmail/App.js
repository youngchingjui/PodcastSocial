import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import * as Permissions from "expo-permissions";

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURI, setAudioURI] = useState("");
  const [textURI, setTextURI] = useState("");
  const [recordObject, setRecordObject] = useState(null);

  const createTestFile = async () => {
    console.log("Creating new test file");
    const uri = FileSystem.cacheDirectory + "test.txt";
    const writeResponse = await FileSystem.writeAsStringAsync(
      uri,
      "testing text"
    );
    console.log("Finished creating document");
    console.log(writeResponse);

    setTextURI(uri);
  };

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
  const sendEmail = async audioURI => {
    console.log("sendEmailPushed");

    // First check if the file is there
    const dirResponse = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    console.log(dirResponse);

    options = {
      recipients: ["testing@email.com"],
      subject: "Testing sending mail and attachment with Expo",
      body: "This is a test body message",
      isHtml: true,
      attachments: [audioURI]
    };
    const response = await MailComposer.composeAsync(options);
    console.log(response);
  };

  const checkRecordingPermissions = () => {
    Permissions.askAsync(Permissions.AUDIO_RECORDING).then(response => {
      console.log(response);
    });
  };

  useEffect(() => {
    createTestFile();
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
