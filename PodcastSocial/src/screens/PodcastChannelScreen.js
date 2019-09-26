import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const PodcastChannelScreen = ({ navigation }) => {
  const { state, getEpisodeList, updateAudioURI } = useContext(
    MusicPlayerContext
  );
  const podcast = navigation.getParam("podcast_channel");

  useEffect(() => {
    getEpisodeList(podcast.feedUrl);
  }, []);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title={podcast.trackName} />
      <FlatList
        data={state.episodeList}
        keyExtractor={result => `${result.guid[0]._}`}
        style={styles.episodeList}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPressOut={() => {
                console.log("Pressed to play podcast episode");
                updateAudioURI(item.enclosure[0].$.url);
                navigation.navigate("Play");
              }}
            >
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.pubDate}>{item.pubDate}</Text>
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
    position: "absolute",
    left: "7.47%",
    right: 10,
    top: 100,
    bottom: 10
  },
  item: {
    marginVertical: 10,
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

export default PodcastChannelScreen;
