import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import useResults from "../hooks/useResults";
import SearchResultDetail from "../components/SearchResultDetail";
import SearchBar from "../components/SearchBar";
import { Context as PlaylistContext } from "../context/PlaylistContext";
import axios from "axios";

const PodcastChannelScreen = ({ navigation }) => {
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();
  const { state, getSubscriptions } = useContext(PlaylistContext);
  const podcast = navigation.getParam("podcast_channel");
  console.log(podcast);

  axios.get(podcast.feedUrl).then(response => {
    console.log(response);
  });
  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title={podcast.trackName} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default PodcastChannelScreen;
