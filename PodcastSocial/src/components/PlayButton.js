import React, { useEffect, useContext } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Audio } from "expo-av";
import PlayArrow from "./PlayArrow";
import { Context } from "../context/MusicPlayerContext";

const PlayButton = () => {
  // const [isPaused, setPause] = useState(true);
  const { state, changeIsPlaying } = useContext(Context);
  const { soundObject, isPlaying } = state;
  useEffect(() => {
    console.log("Starting to load sound object");
    soundObject
      .loadAsync({
        uri:
          "https://chtbl.com/track/78898/traffic.megaphone.fm/LMM3137604272.mp3"
      })
      .then(response => {
        // setSoundObjectLoaded(true);
        console.log("soundObject loaded");
      });
  }, []);

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
    <View style={styles.root}>
      <TouchableOpacity onPress={onPress} style={styles.touch}>
        <View style={styles.group}>
          <View style={styles.circle}>
            <Svg
              viewBox={
                "-0.44776119402985076 -0.44776119402985076 61.791044776119406 61.791044776119406"
              }
              style={styles.oval}
            >
              <Path
                strokeWidth={1.79}
                fill={"transparent"}
                stroke={"rgba(134,109,204,1)"}
                d={
                  "M30.90 60.90 C47.46 60.90 60.90 47.46 60.90 30.90 C60.90 14.33 47.46 0.90 30.90 0.90 C14.33 0.90 0.90 14.33 0.90 30.90 C0.90 47.46 14.33 60.90 30.90 60.90 Z"
                }
              />
            </Svg>
          </View>

          <View style={styles.playArrow}>
            {!isPlaying ? <PlayArrow /> : <Text>Pause</Text>}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 100,
    position: "absolute",
    bottom: "1%",
    left: 125
  },
  touch: { flex: 1 },
  circle: {
    flex: 1,
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  group: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    position: "absolute"
  },
  playArrow: {
    top: "38.33%",
    left: "41.67%",
    width: "20.00%",
    height: "25.00%",
    backgroundColor: "transparent",
    position: "absolute",
    flex: 1
  },
  oval: {
    top: "-0.75%",
    left: "-0.75%",
    width: "102.99%",
    height: "102.99%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  path: {
    top: "-5.00%",
    left: "-6.25%",
    width: "125.00%",
    height: "120.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  }
});

export default PlayButton;
