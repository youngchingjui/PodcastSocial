import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import PlayButton from "../components/PlayButton";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";

import { Feather } from "@expo/vector-icons";
import RecordButton from "../components/RecordButton";

const PlaygroundScreen = () => {
  const { forward } = useContext(MusicPlayerContext);

  return (
    <View style={styles.root}>
      <Text>Playground Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PlaygroundScreen;
