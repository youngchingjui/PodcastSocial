import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import PurpleBackdrop from "../components/PurpleBackdrop";
import ScreenTitle from "../components/ScreenTitle";
import PlayButton from "../components/PlayButton";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Context } from "../context/MusicPlayerContext";
import { Feather } from "@expo/vector-icons";

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
      <View style={styles.playPodcastBottom}>
        <View style={styles.episodeDetails}>
          <Text style={styles.episodeTitle} numberOfLines={2}>
            I haven’t been this cautious in six years
          </Text>
          <Text style={styles.episodeDescription} numberOfLines={2}>
            EPISODE - 147
          </Text>
        </View>
        <View style={styles.playerControls}>
          <TouchableOpacity style={styles.replay} onPress={rewind}>
            <MaterialIcons name="replay-10" size={60} color="white" />
          </TouchableOpacity>
          <PlayButton />
          <TouchableOpacity style={styles.forward} onPress={forward}>
            <MaterialIcons name="forward-10" size={60} color="white" />
          </TouchableOpacity>
        </View>
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
        <Svg height="100%" width="100%" style={styles.recordButtonBackground}>
          <Circle cx="50%" cy="50%" r="50%" fill="red" style={styles.oval1} />
        </Svg>
        <FontAwesome
          name="microphone"
          size={50}
          style={styles.microphone}
          color="white"
        />
        {recordingPermissionStatus == "granted" ? (
          <Text style={styles.recordText}>Record message</Text>
        ) : (
          <Text style={styles.recordText}>
            Tap to grant access to audio recording
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  forward: {},
  replay: {},
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
  podcastArtwork: {
    width: "100%",
    flex: 1,
    backgroundColor: "transparent"
  },
  playPodcastBottom: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(134,109,204,1)"
  },
  episodeDetails: { flex: 0.5, padding: 30 },
  episodeTitle: {
    color: "white",
    fontSize: 22
    // TODO: Load in fonts
    // fontFamily: "sfprodisplay-medium",
  },
  episodeDescription: {
    color: "white",
    opacity: 0.5,
    fontSize: 14
    // fontFamily: "poppins-regular"
  },

  recordButton: {
    top: "75%",
    left: "71%",
    width: 100,
    height: 100,
    position: "absolute"
  },
  recordButtonBackground: {
    position: "absolute"
  },
  microphone: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "auto",
    marginRight: "auto"
  },
  recordText: {
    color: "white",
    // position: "absolute",
    textAlign: "center",
    width: "100%",
    fontSize: 12,
    paddingHorizontal: 7,
    paddingBottom: 6
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
    color: "white",
    position: "absolute",
    fontSize: 19
    // fontFamily: "sfprodisplay-semibold"
  },
  playerControls: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "flex-end",
    paddingBottom: 10
  }
});

PlayScreen.navigationOptions = {
  title: "Play",
  tabBarIcon: <Feather name="play" size={25} />
};

export default PlayScreen;
