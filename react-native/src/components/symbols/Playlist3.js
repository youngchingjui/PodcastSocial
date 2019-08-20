import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class Playlist3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.rectangle10} />
        <View style={styles.rectangle11} />
        <View style={styles.rectangle12} />
        <Svg viewBox={"-0 -0 6 6"} style={styles.oval15}>
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={
              "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
            }
          />
        </Svg>
        <Svg viewBox={"-0 -0 6 6"} style={styles.oval16}>
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={
              "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
            }
          />
        </Svg>
        <Svg viewBox={"-0 -0 6 6"} style={styles.oval17}>
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={
              "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
            }
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  rectangle10: {
    top: "0.00%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  rectangle11: {
    top: "37.50%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  rectangle12: {
    top: "75.00%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  oval15: {
    top: "0.00%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval16: {
    top: "37.50%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval17: {
    top: "75.00%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
