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
import NavigationService from "./NavigationService";

// Creating searchFlow Stack Navigation
const searchRouteConfig = {
  Search: SearchScreen,
  PodcastChannel: PodcastChannelScreen
};
const searchStackNavigatorConfig = {
  headerMode: "none"
};
const searchFlow = createStackNavigator(
  searchRouteConfig,
  searchStackNavigatorConfig
);
searchFlow.navigationOptions = {
  title: "Discover",
  tabBarIcon: <Feather name="search" size={25} />,
  headerMode: "none"
};

// Creating main bottomTabNavigator
const tabNavigatorRoute = {
  MyPlaylist: MyPlaylistScreen,
  Play: PlayScreen,
  searchFlow,
  Recordings: RecordingsScreen,
  Playground: PlaygroundScreen
};
const tabNavigatorConfig = {
  initialRouteName: "MyPlaylist",
  tabBarOptions: {
    activeTintColor: "tomato",
    inactiveTintColor: "gray",
    showIcon: true
  }
};
const tabNavigator = createBottomTabNavigator(
  tabNavigatorRoute,
  tabNavigatorConfig
);

// Creating main App Container
const AppContainer = createAppContainer(tabNavigator);
const App = () => {
  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

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
