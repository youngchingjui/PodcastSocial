import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

import { Context as RecorderContext } from "../context/RecorderContext";

import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  FlatList,
  TouchableOpacity
} from "react-native-gesture-handler";

const RecordingsScreen = () => {
  const {
    state: { recordings },
    loadRecordings
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
              <TouchableOpacity style={styles.item}>
                <Text>{item.durationMillis}</Text>
              </TouchableOpacity>
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
  scrollView: { borderColor: "red", borderWidth: 5, marginHorizontal: 35 },
  flatList: { borderColor: "green", borderWidth: 5 },
  item: { borderColor: "blue", borderWidth: 5, height: 75, marginVertical: 10 }
});

export default RecordingsScreen;
