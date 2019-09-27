import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import PlayButton from "../components/PlayButton";
import { MaterialIcons } from "@expo/vector-icons";
import { Context } from "../context/MusicPlayerContext";
import * as Permissions from "expo-permissions";

const PlayScreen = () => {
  const {
    state,
    forward,
    rewind,
    loadSoundObject,
    startRecording,
    stopRecording,
    checkRecordingPermissions,
    requestRecordingPermission
  } = useContext(Context);

  var { recordingPermissionStatus } = state;

  useEffect(() => {
    loadSoundObject();
    checkRecordingPermissions();
  }, []);

  return (
    <View style={styles.root}>
      <PurpleBackdrop />
      <ScreenTitle title="Now Playing" />
      <Image
        source={require("../../assets/images/b8561a9c7528866f91c650f8c7cc6b8461b14149.png")}
        style={styles.podcastArtwork}
      />
      <PlayButton />
      <TouchableOpacity style={styles.forward} onPress={forward}>
        <MaterialIcons name="forward-10" size={60} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.replay} onPress={rewind}>
        <MaterialIcons name="replay-10" size={60} />
      </TouchableOpacity>
      <View style={styles.rectangle1} />
      <View style={styles.player}>
        <View style={styles.nameEpisode}>
          <Text style={styles.iHaventBeenThis}>
            I haven’t been this cautious in six years
          </Text>
          <Text style={styles.episode147}>EPISODE - 147</Text>
        </View>
        <View style={styles.moreIcon}>
          <Svg viewBox={"-0 -0 18.44000000000005 4.44"} style={styles.path}>
            <Path
              strokeWidth={0}
              fill={"rgba(255,255,255,1)"}
              d={
                "M9.22 4.44 C7.99 4.44 7.00 3.45 7.00 2.22 C7.00 0.99 7.99 0.00 9.22 0.00 C10.45 0.00 11.44 0.99 11.44 2.22 C11.44 3.45 10.45 4.44 9.22 4.44 Z M16.22 4.44 C14.99 4.44 14.00 3.45 14.00 2.22 C14.00 0.99 14.99 0.00 16.22 0.00 C17.45 0.00 18.44 0.99 18.44 2.22 C18.44 3.45 17.45 4.44 16.22 4.44 Z M2.22 4.44 C0.99 4.44 0.00 3.45 0.00 2.22 C0.00 0.99 0.99 0.00 2.22 0.00 C3.45 0.00 4.44 0.99 4.44 2.22 C4.44 3.45 3.45 4.44 2.22 4.44 Z"
              }
            />
          </Svg>
        </View>
        <View style={styles.scrollBar}>
          <Svg viewBox={"-1 -1 273 6"} style={styles.line2}>
            <Path
              strokeWidth={2}
              fill={"transparent"}
              stroke={"rgba(255,255,255,1)"}
              fillOpacity={0.2}
              strokeOpacity={0.2}
              d={"M1.46 2.00 L270.00 2.00 "}
            />
          </Svg>
          <Text style={styles.style}>1:02:52</Text>
          <Text style={styles.style1}>01:43:00</Text>
          <Svg viewBox={"-1 -1 157 6"} style={styles.line2Copy}>
            <Path
              strokeWidth={2}
              fill={"transparent"}
              stroke={"rgba(80,227,194,1)"}
              d={"M1.00 2.00 L153.85 2.00 "}
            />
          </Svg>
          <Svg viewBox={"-0 -0 10 10"} style={styles.oval}>
            <Path
              strokeWidth={0}
              fill={"rgba(255,255,255,1)"}
              d={
                "M5.00 10.00 C7.76 10.00 10.00 7.76 10.00 5.00 C10.00 2.24 7.76 0.00 5.00 0.00 C2.24 0.00 0.00 2.24 0.00 5.00 C0.00 7.76 2.24 10.00 5.00 10.00 Z"
              }
            />
          </Svg>
        </View>
        <View style={styles.controls}></View>
      </View>
      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => {
          console.log(recordingPermissionStatus);
          if (recordingPermissionStatus == "undetermined") {
            requestRecordingPermission();
          } else if (recordingPermissionStatus == "granted") {
            if (!state.isRecording) {
              console.log("start recording");
              startRecording();
            } else {
              console.log("stop recording");
              stopRecording();
            }
          } else if (recordingPermissionStatus == "denied") {
            console.log("Please go to settings and allow recording");
          } else {
            console.log(
              "Could not determine if recording permissions were set"
            );
          }
        }}
      >
        <Svg viewBox={"-0 -0 60 60"} style={styles.oval1}>
          <Path
            strokeWidth={0}
            fill={"rgba(217,45,45,1)"}
            d={
              "M30.00 60.00 C46.57 60.00 60.00 46.57 60.00 30.00 C60.00 13.43 46.57 0.00 30.00 0.00 C13.43 0.00 0.00 13.43 0.00 30.00 C0.00 46.57 13.43 60.00 30.00 60.00 Z"
            }
          />
        </Svg>
        {recordingPermissionStatus == "granted" ? (
          <Text>Tap to record message</Text>
        ) : (
          <Text>Tap to grant access to audio recording</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)"
  },
  forward: {
    position: "absolute",
    bottom: 5,
    right: 60
  },
  replay: {
    position: "absolute",
    bottom: 5,
    left: 60
  },
  rectangle: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute",
    overflow: "hidden"
  },
  path2: {
    top: "-7.34%",
    left: "-18.67%",
    width: "131.37%",
    height: "115.60%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  deviceBezelsIPhoneXsDisplayShape5: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  podcastArtwork: {
    top: "10.22%",
    left: "0.00%",
    width: "100.27%",
    height: "46.31%",
    backgroundColor: "transparent",
    position: "absolute"
  },
  rectangle1: {
    top: "56.53%",
    left: "0.00%",
    width: "100.27%",
    height: "33.25%",
    backgroundColor: "rgba(134,109,204,1)",
    position: "absolute"
  },
  player: {
    top: "60.59%",
    left: "7.47%",
    width: "85.33%",
    height: "17.73%",
    position: "absolute"
  },
  nameEpisode: {
    top: "0.00%",
    left: "0.00%",
    width: "93.75%",
    height: "21.53%",
    position: "absolute"
  },
  iHaventBeenThis: {
    top: "0.00%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 18,
    // TODO: Load in fonts
    // fontFamily: "sfprodisplay-medium",
    lineHeight: 2
  },
  episode147: {
    top: "35.48%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    opacity: 0.5,
    fontSize: 14
    // fontFamily: "poppins-regular"
  },
  moreIcon: {
    top: "3.47%",
    left: "92.97%",
    width: "5.94%",
    height: "3.47%",
    position: "absolute"
  },
  path: {
    top: "0.00%",
    left: "2.63%",
    width: "97.05%",
    height: "88.80%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  scrollBar: {
    top: "32.64%",
    left: "0.31%",
    width: "99.69%",
    height: "21.53%",
    position: "absolute"
  },
  line2: {
    top: "9.68%",
    left: "15.36%",
    width: "85.58%",
    height: "19.35%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  style: {
    top: "45.16%",
    left: "0.00%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 12
    // fontFamily: "poppins-600"
  },
  style1: {
    top: "45.16%",
    left: "84.95%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 12,
    // fontFamily: "poppins-600",
    textAlign: "right"
  },
  line2Copy: {
    top: "9.68%",
    left: "-0.31%",
    width: "49.22%",
    height: "19.35%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  oval: {
    top: "0.00%",
    left: "46.39%",
    width: "3.13%",
    height: "32.26%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  controls: {
    top: "75.69%",
    left: "19.38%",
    width: "55.00%",
    height: "24.31%",
    position: "absolute"
  },
  rewind: {
    top: "0.00%",
    left: "0.00%",
    width: "13.07%",
    height: "91.43%",
    position: "absolute"
  },
  arrow: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "84.38%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  style2: {
    top: "40.63%",
    left: "4.35%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "avenirnext-bold"
  },
  fastForward: {
    top: "8.57%",
    left: "86.93%",
    width: "13.07%",
    height: "91.43%",
    position: "absolute"
  },
  arrow1: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "84.38%",
    backgroundColor: "transparent",
    position: "absolute",
    transform: [
      {
        scaleX: -1
      }
    ],
    borderColor: "transparent"
  },
  style3: {
    top: "40.63%",
    left: "17.39%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 14
    // fontFamily: "avenirnext-bold"
  },

  recordButton: {
    top: "80.79%",
    left: "79.47%",
    width: "16.00%",
    height: "7.39%",
    position: "absolute"
  },
  oval1: {
    top: "0.00%",
    left: "0.00%",
    width: "100.00%",
    height: "100.00%",
    backgroundColor: "transparent",
    position: "absolute",
    borderColor: "transparent"
  },
  nowPlaying: {
    top: "5.67%",
    left: "7.47%",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,1)",
    position: "absolute",
    fontSize: 19
    // fontFamily: "sfprodisplay-semibold"
  }
});

export default PlayScreen;
