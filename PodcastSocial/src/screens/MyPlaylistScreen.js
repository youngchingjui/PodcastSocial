import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import PlaylistDetail from "../components/PlaylistDetail";
import PlayButton from "../components/PlayButton";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

import { Context } from "../context/MusicPlayerContext";

import { TouchableOpacity } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyPlaylistScreen = ({ navigation }) => {
  const { state, loadSoundObject, changeIsPlaying } = useContext(Context);
  const {
    currentPodcast,
    isPlaying,
    isCurrentPodcastLoaded,
    soundObject
  } = state;
  useEffect(() => {
    loadSoundObject();
    if (isCurrentPodcastLoaded) {
      console.log(currentPodcast["itunes:image"][0].$.href);
    }
  }, []);

  const onPress = async () => {
    if (!isPlaying) {
      // Audio is currently not playing. Start playing podcast
      console.log("Playing audio");
      changeIsPlaying(true);
      try {
        await soundObject.playAsync();
        navigation.navigate("Play");
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
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="My Playlist" />
      <View style={styles.style12}>
        <PlaylistDetail style={styles.playlistDetail34} />
        <PlayButton style={styles.playButton34} />
      </View>
      <View style={styles.style13}>
        <PlaylistDetail style={styles.playlistDetail35} />
        <PlayButton style={styles.playButton35} />
      </View>
      <View style={styles.style14}>
        <PlaylistDetail style={styles.playlistDetail36} />
        <PlayButton style={styles.playButton36} />
      </View>
      <View style={styles.style15}>
        <PlaylistDetail style={styles.playlistDetail37} />
        <PlayButton style={styles.playButton37} />
      </View>
      <View style={styles.title3}>
        <Text style={styles.upNext3}>UP NEXT</Text>
      </View>
      <TouchableOpacity style={styles.continuePlaying} onPress={onPress}>
        {isCurrentPodcastLoaded ? (
          <Image
            source={{
              uri: currentPodcast["itunes:image"][0].$.href
            }}
            style={styles.artwork}
          />
        ) : null}
        <View style={styles.darken}>
          {isCurrentPodcastLoaded ? (
            <View>
              <Text style={styles.title}>
                {(currentPodcast["itunes:title"] || currentPodcast["title"])[0]}
              </Text>
              <Text style={styles.podcastChannel}>
                {currentPodcast["collectionName"]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
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
  style12: {
    top: "52.59%",
    left: "7.73%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail34: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "91.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton34: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style13: {
    top: "63.05%",
    left: "7.73%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail35: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "91.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton35: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style14: {
    top: "73.40%",
    left: "8.00%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail36: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "86.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton36: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style15: {
    top: "83.87%",
    left: "8.00%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail37: {
    top: "8.33%",
    left: "23.64%",
    width: "76.36%",
    height: "86.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton37: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  title3: {
    top: "48.77%",
    left: "8.27%",
    width: "15.47%",
    height: "1.97%",
    position: "absolute"
  },
  upNext3: {
    top: "0.00%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(155,155,155,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-bold"
  },
  darken: {
    width: 300,
    height: 300,
    backgroundColor: "rgba(0,0,0,0.77)",
    padding: 10
  },
  playButton3: {
    top: "22.41%",
    left: "38.13%",
    width: "30.67%",
    height: "14.16%",
    position: "absolute"
  },
  oval19: {
    top: "-2.17%",
    left: "-2.17%",
    width: "108.70%",
    height: "108.70%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  fill23: {
    top: "34.20%",
    left: "41.16%",
    width: "25.51%",
    height: "32.46%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  continuePlaying3: {
    top: "37.44%",
    left: "40.27%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-regular"
  },
  theSmartWayToBuy3: {
    top: "15.15%",
    left: "22.40%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-regular"
  },
  listenMoneyMattersC3: {
    top: "17.12%",
    left: "22.40%",
    width: "41.33%",
    height: 24,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 10
    // fontFamily: "sfprodisplay-light"
  }
});

MyPlaylistScreen.navigationOptions = {
  title: "Playlist",
  tabBarIcon: <MaterialCommunityIcons name="playlist-play" size={30} />
};

export default MyPlaylistScreen;
