import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ScreenTitle = ({ title }) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.MyPlaylist} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    width: "100%",
    paddingTop: 50,
    marginBottom: 15
  },
  MyPlaylist: {
    top: "5.67%",
    left: "7.47%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    fontSize: 26,
    width: 358
    // fontFamily: "sfprodisplay-semibold"
  }
});

export default ScreenTitle;
