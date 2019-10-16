import React, { useEffect, useContext } from "react";
import { Image, StyleSheet, View, Text, FlatList } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const PodcastChannelScreen = ({ navigation }) => {
  const { state, getEpisodeList, updateAudioURI, updatePodcast } = useContext(
    MusicPlayerContext
  );
  const { episodeList } = state;
  const podcast = navigation.getParam("podcast_channel");

  useEffect(() => {
    getEpisodeList(podcast.feedUrl);
  }, []);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title={podcast.trackName} />
      <Image
        source={{ uri: podcast.artworkUrl600 }}
        style={styles.podcastArtwork}
      />
      <FlatList
        data={episodeList.item}
        keyExtractor={result => `${result.guid[0]._}`}
        style={styles.episodeList}
        renderItem={({ episode }) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPressOut={() => {
                console.log("Pressed to play podcast episode");
                var {item, ...podcastChannelDetails} = episodeList
                updatePodcast({...podcastChannelDetails, ...episode});
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
    left: "7.47%",
    width: 358
  },
  podcastArtwork: {
    width: 300,
    height: 300,
    backgroundColor: "transparent",
    alignSelf: "center"
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
