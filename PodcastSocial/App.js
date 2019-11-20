import React, { useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";

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
import LoadingScreen from "./src/screens/LoadingScreen";
import AuthenticatorScreen from "./src/screens/AuthenticatorScreen";
import AccountScreen from "./src/screens/AccountScreen";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import NavigationService from "./NavigationService";

import Amplify from "@aws-amplify/core";
import awsconfig from "./aws-exports";

const MEMORY_KEY_PREFIX = "@MyStorage:";
let dataMemory = {};

class MyStorage {
  static syncPromise = null;

  static setItem(key, value) {
    AsyncStorage.setItem(MEMORY_KEY_PREFIX + key, value);
    dataMemory[key] = value;
    return dataMemory[key];
  }

  static getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key)
      ? dataMemory[key]
      : undefined;
  }

  static removeItem(key) {
    AsyncStorage.removeItem(MEMORY_KEY_PREFIX + key);
    return delete dataMemory[key];
  }

  static clear() {
    dataMemory = {};
    return dataMemory;
  }

  static sync() {
    if (!MyStorage.syncPromise) {
      MyStorage.syncPromise = new Promise((res, rej) => {
        AsyncStorage.getAllKeys((errKeys, keys) => {
          if (errKeys) rej(errKeys);
          const memoryKeys = keys.filter(key =>
            key.startsWith(MEMORY_KEY_PREFIX)
          );
          AsyncStorage.multiGet(memoryKeys, (err, stores) => {
            if (err) rej(err);
            stores.map((result, index, store) => {
              const key = store[index][0];
              const value = store[index][1];
              const memoryKey = key.replace(MEMORY_KEY_PREFIX, "");
              dataMemory[memoryKey] = value;
            });
            res();
          });
        });
      });
    }
    return MyStorage.syncPromise;
  }
}

Amplify.configure({
  ...awsconfig,
  Analytics: { disabled: true },
  storage: MyStorage
});

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
  searchFlow,
  Play: PlayScreen,
  Recordings: RecordingsScreen,
  Account: AccountScreen
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

// Creating switch navigator
const switchNavigatorRoute = {
  Loading: LoadingScreen,
  Authentication: AuthenticatorScreen,
  mainTabFlow: tabNavigator
};
const switchNavigatorConfig = { initialRouteName: "Loading" };

const switchNavigator = createSwitchNavigator(
  switchNavigatorRoute,
  switchNavigatorConfig
);

// Creating main App Container
const AppContainer = createAppContainer(switchNavigator);

const App = () => {
  const {
    state: { subscriptions },
    updateUpNextList,
    loadPlaylistState
  } = useContext(PlaylistContext);
  const { loadRecorderState } = useContext(RecorderContext);
  const {
    state: { soundObject, currentEpisode },
    loadSoundObject,
    loadMusicPlayerState,
    unloadCurrentEpisodeSoundObject
  } = useContext(MusicPlayerContext);

  useEffect(() => {
    loadPlaylistState();
    loadRecorderState();
    loadMusicPlayerState();
  }, []);

  useEffect(() => {
    unloadCurrentEpisodeSoundObject(soundObject);
    loadSoundObject(currentEpisode);
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
