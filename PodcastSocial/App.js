import React from "react";

import { Provider as MusicPlayerProvider } from "./src/context/MusicPlayerContext";
import { Provider as PlaylistProvider } from "./src/context/PlaylistContext";

import MyPlaylistScreen from "./src/screens/MyPlaylistScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PlayScreen from "./src/screens/PlayScreen";
import PodcastChannelScreen from "./src/screens/PodcastChannelScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import { Feather } from "@expo/vector-icons";

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
    searchFlow
  },
  {
    initialRouteName: "MyPlaylist",
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
      showIcon: true
    }
  }
);

const App = createAppContainer(tabNavigator);

export default () => {
  return (
    <MusicPlayerProvider>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </MusicPlayerProvider>
  );
};
