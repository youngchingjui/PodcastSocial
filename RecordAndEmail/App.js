import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as MailComposer from "expo-mail-composer";
import * as FileSystem from "expo-file-system";

export default function App() {
  const [fileURI, setFileURI] = useState("");

  const createTestFile = async () => {
    console.log("Creating new test file");
    const uri = FileSystem.documentDirectory + "test.txt";
    const writeResponse = await FileSystem.writeAsStringAsync(
      uri,
      "testing text"
    );
    console.log("Finished creating document");
    console.log(writeResponse);
    setFileURI(uri);
  };

  const sendEmail = async () => {
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
      attachments: [fileURI]
    };
    const response = await MailComposer.composeAsync(options);
    console.log(response);
  };

  useEffect(() => {
    createTestFile();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sendEmail} style={styles.sendEmail}>
        <Text>Push to send email</Text>
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
    height: 100,
    width: 100,
    backgroundColor: "red"
  },
  sendEmail: {
    height: 100,
    width: 100,
    backgroundColor: "blue"
  }
});
