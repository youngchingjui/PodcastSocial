import React, { useEffect, useContext } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { Context as RecorderContext } from "../context/RecorderContext";

const EpisodeScreen = ({ navigation }) => {
  const {
    state: { episodeList },
    getEpisodeList,
    updateCurrentEpisode
  } = useContext(MusicPlayerContext);

  const { msToTime } = useContext(RecorderContext);

  const podcast = navigation.getParam("podcast_channel");

  useEffect(() => {
    getEpisodeList(podcast.id);
  }, []);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title={podcast.title} />
      <Image source={{ uri: podcast.image }} style={styles.podcastArtwork} />
      <FlatList
        data={episodeList.episodes}
        keyExtractor={episode => `${episode.id}`}
        style={styles.episodeList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                console.log("Pressed to play podcast episode");
                var { episodes, ...podcastChannelDetails } = episodeList;
                updateCurrentEpisode({
                  podcast: podcastChannelDetails,
                  ...item
                });
                navigation.navigate("Play");
              }}
            >
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.pubDate}>
                {msToTime(item.pub_date_ms, "date")}
              </Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  episodeList: {
    marginTop: 20
  },
  podcastArtwork: {
    width: 300,
    height: 300,
    backgroundColor: "transparent",
    alignSelf: "center"
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 6,
    backgroundColor: "white",
    padding: 5
  },
  title: { fontSize: 16, fontWeight: "normal" },
  pubDate: { fontSize: 12, fontWeight: "100" },
  description: { fontSize: 12, fontWeight: "100" }
});

export default EpisodeScreen;
