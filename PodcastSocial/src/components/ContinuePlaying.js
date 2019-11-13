import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";

import PlayButton from "../components/PlayButton";

import { TouchableOpacity } from "react-native-gesture-handler";

import NavigationService from "../../NavigationService";

const ContinuePlaying = () => {
  const {
    state: { currentEpisode, isPlaying, isCurrentEpisodeLoaded, soundObject },
    changeIsPlaying
  } = useContext(MusicPlayerContext);

  const onPress = async () => {
    if (!isPlaying) {
      // Audio is currently not playing. Start playing podcast
      console.log("Playing audio");
      changeIsPlaying(true);
      try {
        await soundObject.playAsync();
        NavigationService.navigate("Play");
      } catch (e) {
        console.log(`Could not play sound player`, e);
      }
    } else {
      // Audio is currently playing. Pause it
      console.log("Pausing audio");
      changeIsPlaying(false);
      try {
        await soundObject.pauseAsync();
      } catch (e) {
        console.log(`Could not pause sound player`, e);
      }
    }
  };

  return (
    <TouchableOpacity style={styles.continuePlaying} onPress={onPress}>
      {isCurrentEpisodeLoaded ? (
        <Image
          source={{
            uri: currentEpisode.image
          }}
          style={styles.artwork}
        />
      ) : null}
      <View style={styles.darken}>
        {isCurrentEpisodeLoaded ? (
          <View>
            <Text style={styles.title}>{currentEpisode.title}</Text>
            <Text style={styles.podcastChannel}>
              {currentEpisode.podcast.title}
            </Text>
          </View>
        ) : null}
        <View style={styles.playButton}>
          <PlayButton />
          {isPlaying ? (
            <Text style={styles.continuePlayingText}>Now playing</Text>
          ) : (
            <Text style={styles.continuePlayingText}>Continue playing</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  continuePlaying: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  artwork: {
    width: 300,
    height: 300,
    position: "absolute"
  },
  continuePlayingText: {
    marginTop: 7,
    color: "white"
  },
  title: {
    color: "white",
    fontWeight: "bold"
  },
  podcastChannel: {
    color: "white"
  },
  playButton: {
    paddingTop: 50,
    alignItems: "center",
    width: "100%"
  },
  darken: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(0,0,0,0.77)",
    padding: 10
  }
});

export default ContinuePlaying;
