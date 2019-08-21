import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MyPlaylist from "./symbols/MyPlaylist";

export default class Playlist extends Component {
  render() {
    return (
      <View style={styles.root}>
        <MyPlaylist style={styles.myPlaylist} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  myPlaylist: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute"
  }
});
