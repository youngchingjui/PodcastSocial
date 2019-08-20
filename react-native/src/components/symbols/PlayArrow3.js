import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class PlayArrow3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <Svg viewBox={"-0.75 -0.75 15 18"} style={styles.path2}>
          <Path
            strokeWidth={1.5}
            fill={"transparent"}
            stroke={"rgba(134,109,204,1)"}
            d={
              "M0.75 0.75 L12.75 8.25 L0.75 15.75 L0.75 11.75 L0.75 0.75 L0.75 0.75 Z"
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
  path2: {
    top: "-5.00%",
    left: "-6.25%",
    width: "125.00%",
    height: "120.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
