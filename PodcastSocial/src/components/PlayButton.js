import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class PlayButton extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.group}>
          {/* Drawing the circle */}
          <View style={[styles.circle, this.props.style]}>
            <Svg
              viewBox={
                "-0.44776119402985076 -0.44776119402985076 61.791044776119406 61.791044776119406"
              }
              style={styles.oval}
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
          {/* Drawing the arrow */}
          <View style={[styles.playArrow, this.props.style]}>
            <Svg viewBox={"-0.75 -0.75 15 18"} style={styles.path}>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  circle: {
    flex: 1,
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  group: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    position: "absolute"
  },
  playArrow: {
    top: "38.33%",
    left: "41.67%",
    width: "20.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1
  },
  oval: {
    top: "-0.75%",
    left: "-0.75%",
    width: "102.99%",
    height: "102.99%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  path: {
    top: "-5.00%",
    left: "-6.25%",
    width: "125.00%",
    height: "120.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
