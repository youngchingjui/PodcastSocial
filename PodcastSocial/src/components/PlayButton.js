import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import PlayArrow from "./PlayArrow";
import { Context } from "../context/MusicPlayerContext";
import { AntDesign } from "@expo/vector-icons";

const PlayButton = () => {
  const { state, changeIsPlaying } = useContext(Context);
  const { soundObject, isPlaying } = state;

  const onPress = async () => {
    console.log("Sound Object within onPress:");

    if (!isPlaying) {
      // Audio is currently not playing. Start playing podcast
      console.log("Playing audio");
      changeIsPlaying(true);
      try {
        await soundObject.playAsync();
      } catch (e) {
        console.log(`Could not play sound player`, e);
      }
    } else {
      // Audio is currently playing. Pause it
      console.log("Pausing audio");
      changeIsPlaying(false);
      try {
        await soundObject.pauseAsync();
      } catch (e) {
        console.log(`Could not pause sound player`, e);
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.touch}>
      {!isPlaying ? (
        <AntDesign name="playcircleo" size={100} color="white" />
      ) : (
        <AntDesign name="pausecircleo" size={100} color="white" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touch: { width: 100, height: 100 }
});

export default PlayButton;
