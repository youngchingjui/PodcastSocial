import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList
} from "react-native";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { Context as PlaylistContext } from "../context/PlaylistContext";

import PlayButton from "../components/PlayButton";
import EpisodeCard from "../components/EpisodeCard";

import { TouchableOpacity } from "react-native-gesture-handler";

import NavigationService from "../../NavigationService";

const UpNext = () => {
  const {
    state: { currentPodcast, isPlaying, isCurrentPodcastLoaded, soundObject },
    loadSoundObject,
    changeIsPlaying,
    updatePodcast
  } = useContext(MusicPlayerContext);

  const {
    state: { upNextList },
    loadUpNextList,
    updateUpNextList
  } = useContext(PlaylistContext);

  useEffect(() => {
    updateUpNextList();
    loadUpNextList();
  }, []);

  const onPress = episode => {
    console.log("Pressed upcoming podcast");
    updatePodcast(episode);
    // NavigationService.navigate("Play");
  };

  return (
    <ScrollView style={styles.root}>
      <FlatList
        style={styles.list}
        data={upNextList}
        keyExtractor={episode => `${episode.guid[0]._}`}
        extraData={upNextList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => onPress(item)}>
              <EpisodeCard episode={item} />
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {},
  item: { height: 300, width: 300 }
});

export default UpNext;
