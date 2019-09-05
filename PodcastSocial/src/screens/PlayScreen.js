import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";

const PlayScreen = () => {
  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title={"Now Playing"} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

export default PlayScreen;
