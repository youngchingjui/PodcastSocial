import React from "react";
import { Provider as MusicPlayerProvider } from "./src/context/MusicPlayerContext";
import { Provider as PlaylistProvider } from "./src/context/PlaylistContext";
import { createAppContainer } from "react-navigation";
import MyPlaylistScreen from "./src/screens/MyPlaylistScreen";
import SearchScreen from "./src/screens/SearchScreen";
import PlayScreen from "./src/screens/PlayScreen";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import PodcastChannelScreen from "./src/screens/PodcastChannelScreen";

const App = createAppContainer(
  createBottomTabNavigator(
    {
      MyPlaylist: MyPlaylistScreen,
      Play: PlayScreen,
      Search: SearchScreen,
      PodcastChannel: PodcastChannelScreen
    },
    // TODO: Make a stack navigator on top of the search tab
    {
      initialRouteName: "Play",
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let IconComponent = Ionicons;
          let iconName;
          if (routeName === "MyPlaylist") {
            iconName = `list${focused ? "-box" : ""}`;
          } else if (routeName === "Search") {
            iconName = `search`;
          } else {
            iconName = "list";
          }

          // TODO: Icons not showing up
          // return <IconComponent name={iconName} size={25} color={tintColor} />;
          return <Feather name="search" style={styles.iconStyle} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        showIcon: true
      }
    }
  )
);

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "red",
    height: 30,
    width: 30
  }
});

export default () => {
  return (
    <MusicPlayerProvider>
      <PlaylistProvider>
        <App />
      </PlaylistProvider>
    </MusicPlayerProvider>
  );
};
