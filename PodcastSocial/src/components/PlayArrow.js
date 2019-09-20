import React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const PlayArrow = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
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

export default PlayArrow;
