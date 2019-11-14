import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Context as PlaylistContext } from "../context/PlaylistContext";

const SearchResultDetail = ({ podcast_channel }) => {
  const {
    state: { subscriptions },
    updateSubscriptions
  } = useContext(PlaylistContext);

  var isSubscribed = false;
  var subscription = null;
  if (subscriptions) {
    subscription = subscriptions.filter(pod => pod.id == podcast_channel.id);
    subscription.length > 0 ? (isSubscribed = true) : (isSubscribed = false);
  }
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: podcast_channel.thumbnail
        }}
        style={styles.image}
      />
      <View style={styles.text}>
        <Text style={styles.collectionName} numberOfLines={2}>
          {podcast_channel.title_original}
        </Text>
        <Text style={styles.artistName} numberOfLines={2}>
          {podcast_channel.publisher_original}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          if (isSubscribed) {
            updateSubscriptions(subscription[0], subscriptions, "remove");
          } else {
            updateSubscriptions(podcast_channel, subscriptions, "add");
          }
        }}
      >
        {isSubscribed ? (
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
