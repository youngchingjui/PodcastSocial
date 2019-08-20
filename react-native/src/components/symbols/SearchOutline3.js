import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class SearchOutline3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <Svg
          viewBox={"-0 -0 8.984273619533495 8.976890084427007"}
          style={styles.path24}
        >
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={"M7.04 8.98 L0.00 1.98 L2.01 0.00 L8.98 7.01 L7.04 8.98 Z"}
          />
        </Svg>
        <Svg viewBox={"-0 -0 19 19"} style={styles.oval18}>
          <Path
            strokeWidth={0}
            fill={"rgba(134,109,204,1)"}
            d={
              "M0.00 9.50 C0.00 4.25 4.25 0.00 9.50 0.00 C14.75 0.00 19.00 4.25 19.00 9.50 C19.00 14.75 14.75 19.00 9.50 19.00 C4.25 19.00 0.00 14.75 0.00 9.50 Z M9.50 17.00 C13.64 17.00 17.00 13.64 17.00 9.50 C17.00 5.36 13.64 2.00 9.50 2.00 C5.36 2.00 2.00 5.36 2.00 9.50 C2.00 13.64 5.36 17.00 9.50 17.00 Z"
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
  path24: {
    top: "62.60%",
    left: "62.57%",
    width: "37.43%",
    height: "37.40%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval18: {
    top: "0.00%",
    left: "0.00%",
    width: "79.17%",
    height: "79.17%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
