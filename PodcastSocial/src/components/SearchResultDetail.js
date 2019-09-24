import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Context as PlaylistContext } from "../context/PlaylistContext";

const SearchResultDetail = ({ podcast_channel }) => {
  const { state, addSubscription, removeSubscription } = useContext(
    PlaylistContext
  );

  const subscription = state.filter(
    pod => pod.trackId == podcast_channel.trackId
  );
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: podcast_channel.artworkUrl100
        }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.collectionName} numberOfLines={2}>
          {podcast_channel.collectionName}
        </Text>
        <Text style={styles.artistName} numberOfLines={2}>
          {podcast_channel.artistName}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          console.log("Subscription is:");
          console.log(subscription);
          if (subscription.length > 0) {
            removeSubscription(subscription[0].id);
          } else {
            addSubscription(podcast_channel);
          }
        }}
      >
        {subscription.length > 0 ? (
          <Ionicons
            name="ios-checkmark-circle-outline"
            color="#866DCC"
            size={32}
          />
        ) : (
          <Ionicons name="ios-add-circle-outline" color="#866DCC" size={32} />
        )}
      </TouchableOpacity>
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
