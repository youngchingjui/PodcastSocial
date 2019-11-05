import React, { useContext, useEffect } from "react";

import { Feather } from "@expo/vector-icons";

import {
  Provider as MusicPlayerProvider,
  Context as MusicPlayerContext
} from "./src/context/MusicPlayerContext";
import {
  Provider as PlaylistProvider,
  Context as PlaylistContext
} from "./src/context/PlaylistContext";
import {
  Provider as RecorderProvider,
  Context as RecorderContext
} from "./src/context/RecorderContext";

import MyPlaylistScreen from "./src/screens/MyPlaylistScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PlayScreen from "./src/screens/PlayScreen";
import EpisodeScreen from "./src/screens/EpisodeScreen";
import RecordingsScreen from "./src/screens/RecordingsScreen";
import PlaygroundScreen from "./src/screens/PlaygroundScreen";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import NavigationService from "./NavigationService";

// Creating searchFlow Stack Navigation
const searchRouteConfig = {
  Search: SearchScreen,
  Episodes: EpisodeScreen
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
  Recordings: RecordingsScreen
};
const tabNavigatorConfig = {
  initialRouteName: "Recordings",
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
  const {
    state: { subscriptions },
    getSubscriptions,
    updateUpNextList,
    loadPlaylistState
  } = useContext(PlaylistContext);
  const { loadRecordings, loadRecorderState } = useContext(RecorderContext);
  const {
    state: { soundObject, currentEpisode },
    loadSoundObject,
    loadMusicPlayerState
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    loadPlaylistState();
    loadRecorderState();
    loadMusicPlayerState();
  }, []);

  useEffect(() => {
    loadSoundObject(currentEpisode, soundObject);
  }, [currentEpisode]);

  useEffect(() => {
    updateUpNextList(subscriptions);
  }, [subscriptions]);

  return (
    <AppContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};

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
