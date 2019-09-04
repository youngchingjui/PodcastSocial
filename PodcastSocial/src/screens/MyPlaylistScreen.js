import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Svg, { Path } from "react-native-svg";
import PlaylistDetail from "../components/PlaylistDetail";
import PlayButton from "../components/PlayButton";
import PurpleBackdrop from "../components/PurpleBackdrop";

export default class MyPlaylistScreen extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.group1}>
          <PurpleBackdrop style={styles.group1} />
        </View>
        <View style={styles.style12}>
          <PlaylistDetail style={styles.playlistDetail34} />
          <PlayButton style={styles.playButton34} />
        </View>
        <View style={styles.style13}>
          <PlaylistDetail style={styles.playlistDetail35} />
          <PlayButton style={styles.playButton35} />
        </View>
        <View style={styles.style14}>
          <PlaylistDetail style={styles.playlistDetail36} />
          <PlayButton style={styles.playButton36} />
        </View>
        <View style={styles.style15}>
          <PlaylistDetail style={styles.playlistDetail37} />
          <PlayButton style={styles.playButton37} />
        </View>
        <View style={styles.title3}>
          <Text style={styles.upNext3}>UP NEXT</Text>
        </View>
        <Text style={styles.MyPlaylist}>My Playlist</Text>
        <Image
          source={require("../../assets/images/b8561a9c7528866f91c650f8c7cc6b8461b14149.png")}
          style={styles.x600Bb3}
        />
        <View style={styles.container3} />
        <View style={styles.playButton3}>
          <Svg viewBox={"-2.5 -2.5 125 125"} style={styles.oval19}>
            <Path
              strokeWidth={5}
              fill={"transparent"}
              stroke={"rgba(255,255,255,1)"}
              d={
                "M60.00 117.50 C91.76 117.50 117.50 91.76 117.50 60.00 C117.50 28.24 91.76 2.50 60.00 2.50 C28.24 2.50 2.50 28.24 2.50 60.00 C2.50 91.76 28.24 117.50 60.00 117.50 Z"
              }
            />
          </Svg>
          <Svg
            viewBox={"-0 -0 29.33333157333334 37.33333109333334"}
            style={styles.fill23}
          >
            <Path
              strokeWidth={0}
              fill={"rgba(255,255,255,1)"}
              d={"M0.00 0.00 L0.00 37.33 L29.33 18.67 L0.00 0.00 Z"}
            />
          </Svg>
        </View>
        <Text style={styles.continuePlaying3}>Continue playing</Text>
        <Text style={styles.theSmartWayToBuy3}>
          The Smart Way to Buy Property
        </Text>
        <Text style={styles.listenMoneyMattersC3}>
          ListenMoneyMatters.com | Andrew Fiebert and Matt Giovanisci
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
  group1: {
    top: "-2.34%",
    left: "-18.67%",
    width: "131.47%",
    height: "36.95%",
    position: "absolute"
  },
  style12: {
    top: "52.59%",
    left: "7.73%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail34: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "91.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton34: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style13: {
    top: "63.05%",
    left: "7.73%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail35: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "91.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton35: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style14: {
    top: "73.40%",
    left: "8.00%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail36: {
    top: "5.00%",
    left: "23.64%",
    width: "76.36%",
    height: "86.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton36: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  style15: {
    top: "83.87%",
    left: "8.00%",
    width: "88.00%",
    height: "7.39%",
    position: "absolute"
  },
  playlistDetail37: {
    top: "8.33%",
    left: "23.64%",
    width: "76.36%",
    height: "86.67%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  playButton37: {
    top: "0.00%",
    left: "0.00%",
    width: "18.18%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  title3: {
    top: "48.77%",
    left: "8.27%",
    width: "15.47%",
    height: "1.97%",
    position: "absolute"
  },
  upNext3: {
    top: "0.00%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(155,155,155,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-bold"
  },
  MyPlaylist: {
    top: "5.67%",
    left: "7.47%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 19
    // fontFamily: "sfprodisplay-semibold"
  },
  x600Bb3: {
    top: "12.93%",
    left: "17.60%",
    width: "71.73%",
    height: "33.13%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  container3: {
    top: "12.93%",
    left: "17.60%",
    width: "71.73%",
    height: "33.13%",
    backgroundColor: "rgba(0,0,0,0.77)",
    position: "absolute",
    overflow: "hidden"
  },
  playButton3: {
    top: "22.41%",
    left: "38.13%",
    width: "30.67%",
    height: "14.16%",
    position: "absolute"
  },
  oval19: {
    top: "-2.17%",
    left: "-2.17%",
    width: "108.70%",
    height: "108.70%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  fill23: {
    top: "34.20%",
    left: "41.16%",
    width: "25.51%",
    height: "32.46%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  continuePlaying3: {
    top: "37.44%",
    left: "40.27%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-regular"
  },
  theSmartWayToBuy3: {
    top: "15.15%",
    left: "22.40%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "sfprodisplay-regular"
  },
  listenMoneyMattersC3: {
    top: "17.12%",
    left: "22.40%",
    width: "41.33%",
    height: 24,
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 10
    // fontFamily: "sfprodisplay-light"
  }
});
