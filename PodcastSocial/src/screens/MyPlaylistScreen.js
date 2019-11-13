import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import ContinuePlaying from "../components/ContinuePlaying";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import UpNext from "../components/UpNext";

const MyPlaylistScreen = () => {
  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="My Playlist" />
      <ContinuePlaying />
      <Text style={styles.upNextHeader}>Up Next</Text>
      <UpNext />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
  upNextHeader: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 28
  }
});

MyPlaylistScreen.navigationOptions = {
  title: "Playlist",
  tabBarIcon: <MaterialCommunityIcons name="playlist-play" size={30} />
};

export default MyPlaylistScreen;
