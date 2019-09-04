import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";

export default class SearchScreen extends Component {
  render() {
    return (
      <View>
        <Text>Hello</Text>
        <Feather name="search" style={styles.iconStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "red"
  }
});
