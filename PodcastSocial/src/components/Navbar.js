import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class Navbar extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.shadow1} />
        <Svg viewBox={"-0 -0 107 107"} style={styles.oval2}>
          <Path
            strokeWidth={0}
            fill={"rgba(255,255,255,1)"}
            d={
              "M53.50 107.00 C83.05 107.00 107.00 83.05 107.00 53.50 C107.00 23.95 83.05 0.00 53.50 0.00 C23.95 0.00 0.00 23.95 0.00 53.50 C0.00 83.05 23.95 107.00 53.50 107.00 Z"
            }
          />
        </Svg>
        {/* Drawing the Playlist Icon */}
        <View style={styles.playlist}>
          <View style={styles.rectangle1} />
          <View style={styles.rectangle2} />
          <View style={styles.rectangle3} />
          <Svg viewBox={"-0 -0 6 6"} style={styles.oval3}>
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={
                "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
              }
            />
          </Svg>
          <Svg viewBox={"-0 -0 6 6"} style={styles.oval4}>
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={
                "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
              }
            />
          </Svg>
          <Svg viewBox={"-0 -0 6 6"} style={styles.oval5}>
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={
                "M3.00 6.00 C4.66 6.00 6.00 4.66 6.00 3.00 C6.00 1.34 4.66 0.00 3.00 0.00 C1.34 0.00 0.00 1.34 0.00 3.00 C0.00 4.66 1.34 6.00 3.00 6.00 Z"
              }
            />
          </Svg>
        </View>
        {/* Drawing the Play Button */}
        <View style={styles.play}>
          <Svg viewBox={"-0 -0 25 25"} style={styles.playsvg}>
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={
                "M13.41 0.15 L25.17 23.22 C25.62 24.11 25.07 25.00 24.07 25.00 L0.92 25.00 C-0.08 25.00 -0.62 24.11 -0.17 23.22 L11.59 0.15 C12.04 -0.74 12.95 -0.74 13.41 0.15 Z"
              }
            />
          </Svg>
        </View>
        {/* Drawing the Search Icon */}
        <View style={styles.searchIcon}>
          <Svg
            viewBox={"-0 -0 8.984273619533495 8.976890084427007"}
            style={styles.path}
          >
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={"M7.04 8.98 L0.00 1.98 L2.01 0.00 L8.98 7.01 L7.04 8.98 Z"}
            />
          </Svg>
          <Svg viewBox={"-0 -0 19 19"} style={styles.oval1}>
            <Path
              strokeWidth={0}
              fill={"rgba(134,109,204,1)"}
              d={
                "M0.00 9.50 C0.00 4.25 4.25 0.00 9.50 0.00 C14.75 0.00 19.00 4.25 19.00 9.50 C19.00 14.75 14.75 19.00 9.50 19.00 C4.25 19.00 0.00 14.75 0.00 9.50 Z M9.50 17.00 C13.64 17.00 17.00 13.64 17.00 9.50 C17.00 5.36 13.64 2.00 9.50 2.00 C5.36 2.00 2.00 5.36 2.00 9.50 C2.00 13.64 5.36 17.00 9.50 17.00 Z"
              }
            />
          </Svg>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  shadow1: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "rgba(255,255,255,1)",
    position: "absolute",
    shadowOffset: {
      height: -2,
      width: 0
    },
    shadowColor: "rgba(50,50,50,0.5)",
    shadowOpacity: 1,
    shadowRadius: 4
  },
  oval2: {
    top: "-48.78%",
    left: "37.07%",
    width: "28.53%",
    height: "130.49%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  play: {
    top: "2.44%",
    left: "49.33%",
    width: "6.67%",
    height: "30.49%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  searchIcon: {
    top: "32.93%",
    left: "78.13%",
    width: "6.40%",
    height: "29.27%",
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1
  },
  playlist: {
    top: "32.93%",
    left: "17.60%",
    width: "6.40%",
    height: "29.27%",
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1
  },
  uiBarsHomeIndicatorHomeIndicatorOnLight3: {
    top: "63.93%",
    left: "0.00%",
    width: "100.00%",
    height: "36.59%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playsvg: {
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
  },
  path: {
    top: "62.60%",
    left: "62.57%",
    width: "37.43%",
    height: "37.40%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval1: {
    top: "0.00%",
    left: "0.00%",
    width: "79.17%",
    height: "79.17%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  rectangle1: {
    top: "0.00%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  rectangle2: {
    top: "37.50%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  rectangle3: {
    top: "75.00%",
    left: "33.33%",
    width: "66.67%",
    height: "25.00%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  oval3: {
    top: "0.00%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval4: {
    top: "37.50%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval5: {
    top: "75.00%",
    left: "0.00%",
    width: "25.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
