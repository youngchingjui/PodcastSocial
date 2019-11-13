import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native-gesture-handler";

import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";

import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

import { Context as RecorderContext } from "../context/RecorderContext";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";

const RecordingsScreen = () => {
  const {
    state: { recordings },
    loadRecordings,
    deleteRecording,
    playRecording,
    msToTime,
    recordIntentToSend
  } = useContext(RecorderContext);

  const {
    state: { soundObject, isPlaying },
    changeIsPlaying
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    loadRecordings();
  }, []);

  const pressPlayRecording = async recording => {
    if (isPlaying) {
      console.log("Pausing audio");
      try {
        await soundObject.pauseAsync();
        changeIsPlaying(false);
      } catch (e) {
        console.log(`Could not pause sound player`, e);
      }
    }
    playRecording(recording, recordings);
  };
  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="Recordings" />
      <ScrollView style={styles.scrollView}>
        <FlatList
          style={styles.flatList}
          data={recordings}
          keyExtractor={result => `${result.uri}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <TouchableOpacity
                  style={styles.details}
                  onPress={() => pressPlayRecording(item)}
                >
                  <Feather name="play" size={40} />
                  <Text style={styles.duration}>
                    {msToTime(item.durationMillis, "time")}
                  </Text>
                  <View style={styles.textDetails}>
                    <Text>While playing</Text>
                    <Text numberOfLines={1} style={styles.episodeTitle}>
                      {item.episode.title}
                    </Text>
                    <Text numberOfLines={1} style={styles.podcastTitle}>
                      {item.episode.podcast.title}
                    </Text>
                    <Text>@ 2:13 </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => deleteRecording(item, recordings)}
                >
                  <MaterialIcons name="delete" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.email}
                  onPress={() => {
                    recordIntentToSend(item.uri, item.episode.podcast.email);
                  }}
                >
                  <FontAwesome name="send" size={30} />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

RecordingsScreen.navigationOptions = {
  title: "Recordings",
  tabBarIcon: <Ionicons name="ios-recording" size={25} />
};

const styles = StyleSheet.create({
  root: { flex: 1 },
  scrollView: {
    // marginHorizontal: 35,
    marginTop: 20
  },
  flatList: {},
  item: {
    height: 110,
    marginVertical: 10,
    marginHorizontal: 28,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  details: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  duration: {
    marginHorizontal: 5,
    fontSize: 24
  },
  episodeTitle: {
    width: 100
  },
  podcastTitle: {
    width: 100
  }
});

export default RecordingsScreen;
