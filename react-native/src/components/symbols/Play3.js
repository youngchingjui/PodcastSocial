import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class Play3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <Svg viewBox={"-0 -0 25 25"} style={styles.play3}>
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={
              "M13.41 0.15 L25.17 23.22 C25.62 24.11 25.07 25.00 24.07 25.00 L0.92 25.00 C-0.08 25.00 -0.62 24.11 -0.17 23.22 L11.59 0.15 C12.04 -0.74 12.95 -0.74 13.41 0.15 Z"
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
  play3: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute",
    transform: [
      {
        rotate: "90deg"
      }
    ],
    borderColor: "transparent"
  }
});
