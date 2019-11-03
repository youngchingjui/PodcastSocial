import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Context as PlaylistContext } from "../context/PlaylistContext";

const Content = ({ episode }) => {
  return (
    <>
      <Text style={styles.podcastTitle} numberOfLines={2}>
        {episode.podcast.title}
      </Text>
      <Text style={styles.episodeTitle} numberOfLines={2}>
        {episode.title}
      </Text>
    </>
  );
};

const EpisodeCard = ({ episode }) => {
  return (
    <View style={styles.root}>
      <Image
        source={{
          uri: episode.thumbnail
        }}
        style={styles.image}
      />
      <View style={styles.textSection}>
        <Content episode={episode} />
      </View>
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
    shadowRadius: 4,
    flexDirection: "row"
  },
  image: {
    width: 112,
    height: 112,
    // TODO: Border radius not working
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6
    // overflow: "hidden"
  },
  icon: { position: "absolute", right: 13, top: 45 },
  podcastTitle: {
    fontSize: 14,
    //   fontFamily: "sfpro-display",
    fontWeight: "100"
  },
  episodeTitle: {
    fontSize: 16,
    //   fontFamily: "sfpro-display",
    fontWeight: "normal"
  },
  textSection: { flex: 1, margin: 5 }
});
export default EpisodeCard;
