import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import Play3 from "./Play3";
import SearchIcon from "./SearchIcon";
import PlaylistIcon from "./PlaylistIcon";

export default class Navbar extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.shadow1} />
        <Svg viewBox={"-0 -0 107 107"} style={styles.oval14}>
          <Path
            strokeWidth={0}
            fill={"rgba(255,255,255,1)"}
            d={
              "M53.50 107.00 C83.05 107.00 107.00 83.05 107.00 53.50 C107.00 23.95 83.05 0.00 53.50 0.00 C23.95 0.00 0.00 23.95 0.00 53.50 C0.00 83.05 23.95 107.00 53.50 107.00 Z"
            }
          />
        </Svg>
        <Play3 style={styles.play3} />
        <SearchIcon 
          style={styles.searchIcon} 
          onPress={() => this.setState({tab: "Playlist"})}
        />
        <PlaylistIcon style={styles.playlist} />
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
  oval14: {
    top: "-48.78%",
    left: "37.07%",
    width: "28.53%",
    height: "130.49%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  play3: {
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
    position: "absolute"
  },
  playlist: {
    top: "32.93%",
    left: "17.60%",
    width: "6.40%",
    height: "29.27%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  uiBarsHomeIndicatorHomeIndicatorOnLight3: {
    top: "63.93%",
    left: "0.00%",
    width: "100.00%",
    height: "36.59%",
    backgroundColor: "transparent",
    position: "absolute"
  }
});
