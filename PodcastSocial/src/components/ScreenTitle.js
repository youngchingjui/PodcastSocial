import React from "react";
import { StyleSheet, Text } from "react-native";

const ScreenTitle = ({ title }) => {
  return <Text style={styles.MyPlaylist}>{title}</Text>;
};

const styles = StyleSheet.create({
  MyPlaylist: {
    top: "5.67%",
    left: "7.47%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 19
    // fontFamily: "sfprodisplay-semibold"
  }
});

export default ScreenTitle;
