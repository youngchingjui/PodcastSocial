import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  AsyncStorage
} from "react-native";

import PlayButton from "../components/PlayButton";
import PurpleBackdrop from "../components/PurpleBackdrop";
import RecordButton from "../components/RecordButton";
import ScreenTitle from "../components/ScreenTitle";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { Context as RecorderContext } from "../context/RecorderContext";

import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Storage from "@aws-amplify/storage";
import { API } from "aws-amplify";

const LoadingScreen = ({ navigation }) => {
  const checkAuth = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    console.log("userToken: " + userToken);
    navigation.navigate(userToken ? "mainTabFlow" : "Authentication");
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <View style={styles.root}>
      <Text style={styles.title}>Welcome to Social Podcast</Text>
      <ActivityIndicator size="large" />
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

export default LoadingScreen;
