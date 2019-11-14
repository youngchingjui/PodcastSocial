import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import ContinuePlaying from "../components/ContinuePlaying";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import UpNext from "../components/UpNext";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { Context as PlaylistContext } from "../context/PlaylistContext";

const MyPlaylistScreen = () => {
  const {
    state: { currentEpisode }
  } = useContext(MusicPlayerContext);

  const {
    state: { upNextList }
  } = useContext(PlaylistContext);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="My Playlist" />
      {currentEpisode ? (
        <ContinuePlaying />
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome to Social Podcast!</Text>
        </>
      )}
      {upNextList && upNextList.length > 0 ? (
        <UpNext />
      ) : (
        <Text style={styles.noSubsText}>
          After you subscribe to some channels, your list of upcoming podcast
          episodes will be displayed here
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },

  welcomeText: {
    fontSize: 24,
    marginLeft: 28,
    marginTop: 150
  },
  noSubsText: {
    marginHorizontal: 28
  }
});

MyPlaylistScreen.navigationOptions = {
  title: "Playlist",
  tabBarIcon: <MaterialCommunityIcons name="playlist-play" size={30} />
};

export default MyPlaylistScreen;
