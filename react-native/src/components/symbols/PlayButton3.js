import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PlayCircle3 from "./PlayCircle3";
import PlayArrow3 from "./PlayArrow3";

export default class PlayButton3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.group61}>
          <PlayCircle3 style={styles.playCircle3} />
          <PlayArrow3 style={styles.playArrow3} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  group61: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    position: "absolute"
  },
  playCircle3: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playArrow3: {
    top: "38.33%",
    left: "41.67%",
    width: "20.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute"
  }
});
