import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

export default class DeviceBezelsIPhoneXsDisplayShape3 extends Component {
  render() {
    return (
      <View style={[styles.root, this.props.style]}>
        <Image
          source={require("../assets/images/9b57f6a63dd2d30204ccfd952accf40041101ecd.png")}
          style={styles.forReferenceDisplayShape1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "transparent"
  },
  forReferenceDisplayShape1: {
    top: "0.00%",
    left: "0.00%",
    width: 375,
    height: 812,
    backgroundColor: "transparent",
    position: "absolute"
  }
});
