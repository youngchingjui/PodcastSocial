import React, { useContext, useEffect } from "react";
import { StyleSheet, ScrollView, FlatList, Text } from "react-native";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { Context as PlaylistContext } from "../context/PlaylistContext";

import EpisodeCard from "../components/EpisodeCard";

import { TouchableOpacity } from "react-native-gesture-handler";

import NavigationService from "../../NavigationService";

const UpNext = () => {
  const { updateCurrentEpisode } = useContext(MusicPlayerContext);

  const {
    state: { upNextList },
    getSubscriptions
  } = useContext(PlaylistContext);

  useEffect(() => {
    getSubscriptions();
  }, []);

  const onPress = episode => {
    console.log("Pressed upcoming podcast");
    updateCurrentEpisode(episode);
    NavigationService.navigate("Play");
  };

  return (
    <>
      <Text style={styles.upNextHeader}>Up Next</Text>
      <ScrollView style={styles.root}>
        <FlatList
          style={styles.list}
          data={upNextList}
          keyExtractor={episode => `${episode.id}`}
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
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  list: {},
  item: { height: 300, width: 300 },
  upNextHeader: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 10,
    marginLeft: 28
  }
});

export default UpNext;
