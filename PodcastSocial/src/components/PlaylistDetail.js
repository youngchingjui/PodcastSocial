import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default class PlaylistDetail extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.moreHorizontal1}>
          <View style={styles.content1}>
            <Text style={styles.pocastTitle1}>ON THE TRAIL WITH JULIÁN…</Text>
            <Text style={styles.podcastChannel1}>Optimal Finance Daily</Text>
            <Text style={styles.podcastLength1}>39 min</Text>
          </View>
          <View style={styles.more1}>
            <Svg viewBox={"-1 -1 20 6"} style={styles.oval13}>
              <Path
                strokeWidth={4}
                fill={"transparent"}
                stroke={"rgba(204,204,204,1)"}
                d={
                  "M9.00 3.00 C9.00 2.45 9.45 2.00 10.00 2.00 C10.55 2.00 11.00 2.45 11.00 3.00 C11.00 3.55 10.55 4.00 10.00 4.00 C9.45 4.00 9.00 3.55 9.00 3.00 Z M16.00 3.00 C16.00 2.45 16.45 2.00 17.00 2.00 C17.55 2.00 18.00 2.45 18.00 3.00 C18.00 3.55 17.55 4.00 17.00 4.00 C16.45 4.00 16.00 3.55 16.00 3.00 Z M2.00 3.00 C2.00 2.45 2.45 2.00 3.00 2.00 C3.55 2.00 4.00 2.45 4.00 3.00 C4.00 3.55 3.55 4.00 3.00 4.00 C2.45 4.00 2.00 3.55 2.00 3.00 Z"
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
  moreHorizontal1: {
    top: "0.00%",
    left: "0.00%",
    width: "96.22%",
    height: "100.00%",
    position: "absolute"
  },
  content1: {
    top: "0.00%",
    left: "0.00%",
    width: "91.70%",
    height: "100.00%",
    position: "absolute"
  },
  pocastTitle1: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: 16,
    backgroundColor: "transparent",
    color: "rgba(158,158,158,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-bold"
  },
  podcastChannel1: {
    top: "40.38%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(204,204,204,1)",
    position: "absolute",
    fontSize: 12
    // fontFamily: "sfprodisplay-regular"
  },
  podcastLength1: {
    top: "73.08%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(204,204,204,1)",
    position: "absolute",
    fontSize: 12
    // fontFamily: "sfprodisplay-light"
  },
  more1: {
    top: "46.15%",
    left: "93.01%",
    width: "6.99%",
    height: "3.85%",
    position: "absolute"
  },
  oval13: {
    top: "-50.00%",
    left: "-6.25%",
    width: "125.00%",
    height: "300.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});
