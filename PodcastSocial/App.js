import React from "react";

import { Feather } from "@expo/vector-icons";

import Amplify from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

import { Provider as MusicPlayerProvider } from "./src/context/MusicPlayerContext";
import { Provider as PlaylistProvider } from "./src/context/PlaylistContext";
import { Provider as RecorderProvider } from "./src/context/RecorderContext";

import MyPlaylistScreen from "./src/screens/MyPlaylistScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PlayScreen from "./src/screens/PlayScreen";
import PodcastChannelScreen from "./src/screens/PodcastChannelScreen";
import RecordingsScreen from "./src/screens/RecordingsScreen";
import PlaygroundScreen from "./src/screens/PlaygroundScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

const searchFlow = createStackNavigator({
  Search: SearchScreen,
  PodcastChannel: PodcastChannelScreen
});

searchFlow.navigationOptions = {
  title: "Discover",
  tabBarIcon: <Feather name="search" size={25} />
};

const tabNavigator = createBottomTabNavigator(
  {
    MyPlaylist: MyPlaylistScreen,
    Play: PlayScreen,
    searchFlow,
    Recordings: RecordingsScreen,
    Playground: PlaygroundScreen
  },
  {
    initialRouteName: "Recordings",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showIcon: true
    }
  }
);

const App = createAppContainer(tabNavigator);
// const appContainer = createAppContainer(tabNavigator);
// const signUpConfig = { usernameAttributes: "email" };
// const App = withAuthenticator(appContainer, { signUpConfig });

export default () => {
  return (
    <RecorderProvider>
      <MusicPlayerProvider>
        <PlaylistProvider>
          <App />
        </PlaylistProvider>
      </MusicPlayerProvider>
    </RecorderProvider>
  );
};
