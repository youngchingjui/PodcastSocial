import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchResultDetail = ({ artistName, collectionName, imageUrl }) => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: imageUrl
        }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.collectionName} numberOfLines={2}>
          {collectionName}
        </Text>
        <Text style={styles.artistName} numberOfLines={2}>
          {artistName}
        </Text>
      </View>
      <Ionicons
        name="ios-add-circle-outline"
        color="#866DCC"
        size={32}
        style={styles.icon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 112,
    backgroundColor: "white",
    marginHorizontal: 28,
    marginVertical: 10,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  image: {
    width: 112,
    height: 112,
    // TODO: Border radius not working
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    overflow: "hidden"
  },
  icon: { position: "absolute", right: 13, top: 45 },
  artistName: {
    fontSize: 14,
    //   fontFamily: "sfpro-display",
    fontWeight: "100"
  },
  collectionName: {
    fontSize: 16,
    //   fontFamily: "sfpro-display",
    fontWeight: "normal"
  },
  text: { position: "absolute", left: 123, top: 36, width: 146 }
});
export default SearchResultDetail;
