import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MyPlaylist3 from "./symbols/MyPlaylist3";

export default class Playlist extends Component {
  render() {
    return (
      <View style={styles.root}>
        <MyPlaylist3 style={styles.myPlaylist3} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  myPlaylist3: {
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute"
  }
});
