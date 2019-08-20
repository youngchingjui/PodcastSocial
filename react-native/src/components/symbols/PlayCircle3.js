import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class PlayCircle3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <Svg
          viewBox={
            "-0.44776119402985076 -0.44776119402985076 61.791044776119406 61.791044776119406"
          }
          style={styles.oval12}
        >
          <Path
            strokeWidth={1.79}
            fill={"transparent"}
            stroke={"rgba(134,109,204,1)"}
            d={
              "M30.90 60.90 C47.46 60.90 60.90 47.46 60.90 30.90 C60.90 14.33 47.46 0.90 30.90 0.90 C14.33 0.90 0.90 14.33 0.90 30.90 C0.90 47.46 14.33 60.90 30.90 60.90 Z"
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
  oval12: {
    top: "-0.75%",
    left: "-0.75%",
    width: "102.99%",
    height: "102.99%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
