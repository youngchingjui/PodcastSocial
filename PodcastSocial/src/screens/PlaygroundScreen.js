import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Button
} from "react-native";

import PlayButton from "../components/PlayButton";
import PurpleBackdrop from "../components/PurpleBackdrop";
import RecordButton from "../components/RecordButton";
import ScreenTitle from "../components/ScreenTitle";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";

import * as FileSystem from "expo-file-system";

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Storage from "@aws-amplify/storage";
// import API from "@aws-amplify/api";
import { API } from "aws-amplify";

const PlaygroundScreen = () => {
  const { forward } = useContext(MusicPlayerContext);

  const buttonPush = async () => {
    console.log("Pushed the button");
    const path = "/recordings";
    try {
      const apiResponse = await API.get("apiResource", path);
      console.log(apiResponse);
    } catch (err) {
      console.log("There was an error");
      console.log(err);
    }
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
