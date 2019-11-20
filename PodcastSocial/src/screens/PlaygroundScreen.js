import React, { useContext } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import { Context as RecorderContext } from "../context/RecorderContext";

import { AsyncStorage } from "react-native";
const PlaygroundScreen = () => {
  const { recordIntentToSend } = useContext(RecorderContext);

  const buttonPush = async () => {
    console.log("Pushed the button");
    AsyncStorage.clear();
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Playground Screen</Text>
      <Button onPress={buttonPush} title="Send test email"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default PlaygroundScreen;
