import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native-gesture-handler";

import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

import { Context as RecorderContext } from "../context/RecorderContext";

import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons
} from "@expo/vector-icons";

const RecordingsScreen = () => {
  const {
    state: { recordings, uri },
    loadRecordings,
    sendRecording,
    deleteRecording,
    playRecording,
    msToTime
  } = useContext(RecorderContext);

  useEffect(() => {
    loadRecordings();
  }, []);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="Recordings" />
      <ScrollView style={styles.scrollView}>
        <FlatList
          style={styles.flatList}
          data={recordings}
          keyExtractor={result => `${result.id}`}
          renderItem={({ item }) => {
            return (
              <View style={styles.item}>
                <TouchableOpacity
                  style={styles.details}
                  onPress={playRecording}
                >
                  <Feather name="play" size={40} />
                  <Text style={styles.duration}>
                    {msToTime(item.durationMillis)}
                  </Text>
                  <View style={styles.textDetails}>
                    <Text>While playing</Text>
                    <Text>Title of podcast</Text>
                    <Text>@ 2:13 </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={deleteRecording}
                >
                  <MaterialIcons name="delete" size={30} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.email}
                  onPress={() => {
                    sendRecording(["young.chingjui@gmail.com"], item.uri);
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
  scrollView: { marginHorizontal: 35 },
  flatList: {},
  item: {
    height: 110,
    marginVertical: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
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
    flexDirection: "row",
    width: "100%",
    alignItems: "center"
  },
  duration: {
    marginHorizontal: 5,
    fontSize: 24
  }
});

export default RecordingsScreen;
