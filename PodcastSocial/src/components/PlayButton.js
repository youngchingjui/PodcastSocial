import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Context as MusicPlayerContext } from "../context/MusicPlayerContext";
import { AntDesign } from "@expo/vector-icons";

const PlayButton = () => {
  const {
    state: { soundObject, isPlaying },
    changeIsPlaying
  } = useContext(MusicPlayerContext);

  const onPress = async () => {
    console.log("Sound Object within onPress:");

    if (!isPlaying) {
      // Audio is currently not playing. Start playing podcast
      console.log("Playing audio");
      try {
        await soundObject.playAsync();
        changeIsPlaying(true);
      } catch (e) {
        console.log(`Could not play sound player`, e);
      }
    } else {
      // Audio is currently playing. Pause it
      console.log("Pausing audio");
      try {
        await soundObject.pauseAsync();
        changeIsPlaying(false);
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
