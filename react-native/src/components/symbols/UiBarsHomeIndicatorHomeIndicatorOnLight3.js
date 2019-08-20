import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class UiBarsHomeIndicatorHomeIndicatorOnLight3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <View style={styles.rectangle9} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
  rectangle9: {
    left: "32.45%",
    width: 67,
    height: 3,
    backgroundColor: "rgba(232,232,232,1)",
    position: "absolute",
    bottom: 4,
    borderRadius: 50
  }
});
